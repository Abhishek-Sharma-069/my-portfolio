import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axios";
import { fetchPortfolioData } from "../redux/slices/portfolioSlice";
import { motion } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AdminShell, { adminInputClass, adminLabelClass, adminPanelClass, adminListItemClass } from "./AdminShell";

const ProjectsManager = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.portfolio.data?.projects ?? []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    image: null,
    currentImage: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refetchPortfolio = () => dispatch(fetchPortfolioData({ force: true }));

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      image: null,
      currentImage: "",
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("buttonText", formData.buttonText);
    data.append("buttonLink", formData.buttonLink);
    if (formData.image) data.append("image", formData.image);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (editingProject) {
        await axiosInstance.put(`/projects/${editingProject._id}`, data, config);
      } else {
        await axiosInstance.post("/projects", data, config);
      }
      refetchPortfolio();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      buttonText: project.buttonText,
      buttonLink: project.buttonLink,
      image: null,
      currentImage: project.image,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    await axiosInstance.delete(`/projects/${id}`, config);
    refetchPortfolio();
  };

  return (
    <AdminShell
      index="01 / Projects"
      title="Manage Projects"
      subtitle="Create and update featured portfolio projects."
      action={
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="btn-solid inline-flex items-center gap-2 px-4 py-2.5 font-display text-sm font-semibold"
        >
          <AiOutlinePlusCircle />
          {showForm ? "Hide form" : "Add project"}
        </button>
      }
    >
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className={`${adminPanelClass} mb-10 max-w-2xl space-y-4`}
        >
          <h2 className="font-display text-xl font-semibold text-white">
            {editingProject ? "Edit project" : "Add project"}
          </h2>

          {editingProject && formData.currentImage && (
            <div>
              <label className={adminLabelClass}>Current image</label>
              <img
                src={formData.currentImage}
                alt="Current project"
                className="h-32 w-full border border-white/10 object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={adminLabelClass}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={adminInputClass}
                required
              />
            </div>
            <div>
              <label className={adminLabelClass}>Button text</label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleInputChange}
                className={adminInputClass}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className={adminLabelClass}>Button link</label>
              <input
                type="text"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleInputChange}
                className={adminInputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={adminLabelClass}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`${adminInputClass} resize-y`}
              required
            />
          </div>

          <div>
            <label className={adminLabelClass}>
              {editingProject ? "New image (optional)" : "Project image"}
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className={`${adminInputClass} file:mr-4 file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-black`}
            />
            {formData.image && (
              <p className="mt-1 font-mono text-xs text-emerald-400">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className="btn-solid px-5 py-2.5 font-display text-sm font-semibold">
              {editingProject ? "Update" : "Add"}
            </button>
            <button type="button" onClick={resetForm} className="btn-ghost px-5 py-2.5 font-display text-sm">
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="mb-6 flex items-center gap-4">
        <span className="section-rule" />
        <h3 className="font-display text-lg font-semibold">
          Catalog · {String(projects.length).padStart(2, "0")}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article
            key={project._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col overflow-hidden ${adminListItemClass} bg-white/[0.02]`}
          >
            <img src={project.image} alt={project.title} className="h-36 w-full object-cover grayscale" />
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-display text-base font-semibold text-white">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm text-zinc-500 line-clamp-3">{project.description}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(project)}
                  className="btn-ghost flex-1 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project._id)}
                  className="flex-1 border border-[color-mix(in_srgb,var(--accent-c)_35%,transparent)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-c)] transition hover:bg-[color-mix(in_srgb,var(--accent-c)_10%,transparent)]"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </AdminShell>
  );
};

export default ProjectsManager;
