import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axios";
import { fetchPortfolioData } from "../redux/slices/portfolioSlice";
import { motion } from "framer-motion";
import { AiOutlinePlusCircle, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import AdminShell, { adminInputClass, adminLabelClass, adminPanelClass, adminListItemClass } from "./AdminShell";

const defaultSkillsShape = {
  General: [],
  "Web Development": [],
  "Mobile Development": [],
  Databases: [],
  "DevOps & Tools": [],
};

const cloneSkills = (source = {}) => ({
  General: [...(Array.isArray(source.General) ? source.General : [])],
  "Web Development": [
    ...(Array.isArray(source["Web Development"]) ? source["Web Development"] : []),
  ],
  "Mobile Development": [
    ...(Array.isArray(source["Mobile Development"]) ? source["Mobile Development"] : []),
  ],
  Databases: [...(Array.isArray(source.Databases) ? source.Databases : [])],
  "DevOps & Tools": [
    ...(Array.isArray(source["DevOps & Tools"]) ? source["DevOps & Tools"] : []),
  ],
});

const SkillsManager = () => {
  const dispatch = useDispatch();
  const portfolioSkills = useSelector((state) => state.portfolio.data?.skills);
  const [skills, setSkills] = useState(defaultSkillsShape);
  const [formData, setFormData] = useState({
    category: "General",
    name: "",
    icon: "",
    color: "text-blue-500",
  });
  const [editingSkill, setEditingSkill] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { key: "General", label: "General" },
    { key: "Web Development", label: "Web Development" },
    { key: "Mobile Development", label: "Mobile Development" },
    { key: "Databases", label: "Databases" },
    { key: "DevOps & Tools", label: "DevOps & Tools" },
  ];

  const iconExamples = [
    "FaJava",
    "DiJava",
    "SiSpring",
    "SiSpringboot",
    "FaPython",
    "SiDjango",
    "SiFastapi",
    "SiPytorch",
    "SiLangchain",
    "SiLanggraph",
    "SiDotnet",
    "TbBrandCSharp",
    "FaReact",
    "SiNextdotjs",
    "FaDocker",
    "SiRedis",
  ];

  const colorExamples = [
    "text-red-500",
    "text-blue-500",
    "text-yellow-500",
    "text-green-500",
    "text-cyan-500",
    "text-violet-500",
    "text-rose-500",
    "text-white",
  ];

  const totalSkills = useMemo(
    () => Object.values(skills).reduce((n, arr) => n + (arr?.length || 0), 0),
    [skills]
  );

  const refetchPortfolio = () => dispatch(fetchPortfolioData({ force: true }));

  useEffect(() => {
    if (!portfolioSkills) return;
    setSkills(cloneSkills(portfolioSkills));
  }, [portfolioSkills]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ category: "General", name: "", icon: "", color: "text-blue-500" });
    setEditingSkill(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    try {
      const updatedSkills = cloneSkills(skills);

      if (editingSkill) {
        const { category, index } = editingSkill;
        updatedSkills[category][index] = {
          name: formData.name,
          icon: formData.icon,
          color: formData.color,
        };
      } else {
        updatedSkills[formData.category].push({
          name: formData.name,
          icon: formData.icon,
          color: formData.color,
        });
      }

      await axiosInstance.put("/portfolio-data", { skills: updatedSkills }, config);
      refetchPortfolio();
      resetForm();
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  const handleEdit = (category, skill, index) => {
    setEditingSkill({ category, index });
    setFormData({
      category,
      name: skill.name,
      icon: skill.icon,
      color: skill.color,
    });
    setShowForm(true);
  };

  const handleDelete = async (category, index) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    try {
      const updatedSkills = cloneSkills(skills);
      updatedSkills[category].splice(index, 1);
      await axiosInstance.put("/portfolio-data", { skills: updatedSkills }, config);
      refetchPortfolio();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <AdminShell
      index="03 / Skills"
      title="Manage Skills"
      subtitle="Categories, icon names, and Tailwind color classes."
      action={
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="btn-solid inline-flex items-center gap-2 px-4 py-2.5 font-display text-sm font-semibold"
        >
          <AiOutlinePlusCircle />
          {showForm ? "Hide form" : "Add skill"}
        </button>
      }
    >
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${adminPanelClass} mb-10 max-w-2xl`}
        >
          <h2 className="mb-4 font-display text-xl font-semibold text-white">
            {editingSkill ? "Edit skill" : "Add skill"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={adminLabelClass}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={adminInputClass}
                required
              >
                {categories.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={adminLabelClass}>Skill name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={adminInputClass}
                placeholder="e.g., React, Python, Docker"
                required
              />
            </div>
            <div>
              <label className={adminLabelClass}>Icon</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className={adminInputClass}
                placeholder="e.g., FaReact, SiLangchain"
                required
              />
              <p className="mt-1 text-xs text-zinc-600">
                Must exist in Skills.jsx iconMap (fa / si / di / tb / bi).
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {iconExamples.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className="accent-chip border border-white/10 px-2 py-1 font-mono text-[10px] text-zinc-400"
                    onClick={() => setFormData({ ...formData, icon })}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={adminLabelClass}>Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className={adminInputClass}
                placeholder="e.g., text-blue-500"
                required
              />
              <div className="mt-2 flex flex-wrap gap-1">
                {colorExamples.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="accent-chip border border-white/10 px-2 py-1 font-mono text-[10px] text-zinc-400"
                    onClick={() => setFormData({ ...formData, color })}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="btn-solid px-5 py-2.5 font-display text-sm font-semibold">
                {editingSkill ? "Update" : "Add"}
              </button>
              <button type="button" onClick={resetForm} className="btn-ghost px-5 py-2.5 font-display text-sm">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="mb-6 flex items-center gap-4">
        <span className="section-rule" />
        <h3 className="font-display text-lg font-semibold">
          Nodes · {String(totalSkills).padStart(2, "0")}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {categories.map((categoryInfo) => {
          const list = skills[categoryInfo.key] || [];
          return (
            <div key={categoryInfo.key} className={adminPanelClass}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-white">
                  {categoryInfo.label}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  {list.length} skills
                </span>
              </div>
              <div className="space-y-2">
                {list.length === 0 && (
                  <p className="text-sm text-zinc-600">No skills in this category.</p>
                )}
                {list.map((skill, index) => (
                  <div
                    key={`${skill.name}-${index}`}
                    className={`flex items-center justify-between gap-3 ${adminListItemClass} bg-black/30 px-3 py-2.5`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`${skill.color} text-sm`}>●</span>
                        <span className="truncate text-sm text-white">{skill.name}</span>
                      </div>
                      <p className="mt-0.5 font-mono text-[10px] text-zinc-600">{skill.icon}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => handleEdit(categoryInfo.key, skill, index)}
                        className="p-2 text-zinc-400 transition hover:text-[var(--accent-a)]"
                        aria-label="Edit"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(categoryInfo.key, index)}
                        className="p-2 text-zinc-400 transition hover:text-[var(--accent-c)]"
                        aria-label="Delete"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
};

export default SkillsManager;
