import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axios";
import { fetchPortfolioData } from "../redux/slices/portfolioSlice";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AdminShell, { adminInputClass, adminLabelClass, adminPanelClass, adminListItemClass } from "./AdminShell";

const SECTION_ORDER = ["Volunteership", "Internship", "Work"];

const ExperienceManager = () => {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.portfolio.data?.experience ?? { sections: [] });
  const [formData, setFormData] = useState({
    section: "Work",
    company: "",
    role: "",
    duration: "",
    description: "",
  });
  const [editingExperience, setEditingExperience] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refetchPortfolio = () => dispatch(fetchPortfolioData({ force: true }));

  const orderedSections = useMemo(() => {
    const sections = experience?.sections ?? [];
    return [...sections].sort((a, b) => {
      const ai = SECTION_ORDER.indexOf(a.type);
      const bi = SECTION_ORDER.indexOf(b.type);
      return (ai === -1 ? SECTION_ORDER.length : ai) - (bi === -1 ? SECTION_ORDER.length : bi);
    });
  }, [experience]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ section: "Work", company: "", role: "", duration: "", description: "" });
    setEditingExperience(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    if (editingExperience) {
      await axiosInstance.put(`/experience/${editingExperience._id}`, formData, config);
    } else {
      await axiosInstance.post("/experience", formData, config);
    }
    refetchPortfolio();
    resetForm();
  };

  const handleEdit = (item, sectionType) => {
    setEditingExperience(item);
    setFormData({
      section: sectionType,
      company: item.company || "",
      organization: item.organization || "",
      role: item.role,
      duration: item.duration,
      description: item.description,
    });
    setShowForm(true);
  };

  const handleDelete = async (id, sectionType) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { section: sectionType },
    };
    await axiosInstance.delete(`/experience/${id}`, config);
    refetchPortfolio();
  };

  return (
    <AdminShell
      index="02 / Experience"
      title="Manage Experience"
      subtitle="Volunteership, internships, and work roles."
      action={
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="btn-solid inline-flex items-center gap-2 px-4 py-2.5 font-display text-sm font-semibold"
        >
          <AiOutlinePlusCircle />
          {showForm ? "Hide form" : "Add experience"}
        </button>
      }
    >
      {showForm && (
        <form onSubmit={handleSubmit} className={`${adminPanelClass} mb-10 max-w-2xl space-y-4`}>
          <h2 className="font-display text-xl font-semibold text-white">
            {editingExperience ? "Edit experience" : "Add experience"}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={adminLabelClass}>Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className={adminInputClass}
              >
                <option value="Volunteership">Volunteership</option>
                <option value="Internship">Internship</option>
                <option value="Work">Work</option>
              </select>
            </div>
            <div>
              <label className={adminLabelClass}>Company / Organization</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={adminInputClass}
              />
            </div>
            <div>
              <label className={adminLabelClass}>Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={adminInputClass}
              />
            </div>
            <div>
              <label className={adminLabelClass}>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={adminInputClass}
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
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-solid px-5 py-2.5 font-display text-sm font-semibold">
              {editingExperience ? "Update" : "Add"}
            </button>
            <button type="button" onClick={resetForm} className="btn-ghost px-5 py-2.5 font-display text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mb-6 flex items-center gap-4">
        <span className="section-rule" />
        <h3 className="font-display text-lg font-semibold">Timeline</h3>
      </div>

      <div className="space-y-4">
        {orderedSections.map((section, i) => (
          <div key={section.type} className={adminPanelClass}>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[10px] text-[var(--accent-a)]/60">0{i + 1}</span>
              <h3 className="font-display text-lg font-semibold text-white">{section.type}</h3>
              <span className="font-mono text-[10px] text-zinc-600">
                {section.items?.length || 0} roles
              </span>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={item._id}
                  className={`flex flex-col gap-3 ${adminListItemClass} bg-black/30 p-4 sm:flex-row sm:items-start sm:justify-between`}
                >
                  <div>
                    <h4 className="font-display text-base font-semibold text-white">
                      {item.company || item.organization}
                    </h4>
                    <p className="mt-1 text-sm text-zinc-300">
                      {item.role}{" "}
                      <span className="font-mono text-xs text-zinc-600">({item.duration})</span>
                    </p>
                    <p className="mt-2 text-sm text-zinc-500">{item.description}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item, section.type)}
                      className="btn-ghost px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id, section.type)}
                      className="border border-[color-mix(in_srgb,var(--accent-c)_35%,transparent)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-c)] transition hover:bg-[color-mix(in_srgb,var(--accent-c)_10%,transparent)]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
};

export default ExperienceManager;
