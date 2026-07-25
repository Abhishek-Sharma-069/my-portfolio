import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axios";
import { fetchPortfolioData } from "../redux/slices/portfolioSlice";
import { motion } from "framer-motion";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";
import AdminShell, { adminInputClass, adminLabelClass, adminPanelClass } from "./AdminShell";
import { githubProfile } from "../data/githubData";

const emptyFocus = () => ({ title: "", icon: "FaReact", pointsText: "" });
const emptyEdu = () => ({ qualification: "", institute: "", years: "", score: "" });
const emptyPlatform = () => ({ name: "", url: "" });

const defaultForm = () => ({
  heroHeadline: "",
  heroSubtitle: "",
  aboutHeadline: "",
  aboutIntro: "",
  tagline: "",
  email: "",
  handle: "",
  pronouns: "",
  codeTagsText: "",
  highlightsText: "",
  focusAreas: [emptyFocus()],
  education: [emptyEdu()],
  platforms: [emptyPlatform()],
});

const fromAbout = (about) => {
  if (!about) return defaultForm();
  return {
    heroHeadline: about.heroHeadline || "",
    heroSubtitle: about.heroSubtitle || "",
    aboutHeadline: about.aboutHeadline || "",
    aboutIntro: about.aboutIntro || "",
    tagline: about.tagline || "",
    email: about.email || "",
    handle: about.handle || "",
    pronouns: about.pronouns || "",
    codeTagsText: Array.isArray(about.codeTags) ? about.codeTags.join(", ") : "",
    highlightsText: Array.isArray(about.highlights) ? about.highlights.join("\n") : "",
    focusAreas:
      Array.isArray(about.focusAreas) && about.focusAreas.length
        ? about.focusAreas.map((f) => ({
            title: f.title || "",
            icon: f.icon || "FaReact",
            pointsText: Array.isArray(f.points) ? f.points.join("\n") : "",
          }))
        : [emptyFocus()],
    education:
      Array.isArray(about.education) && about.education.length
        ? about.education.map((e) => ({
            qualification: e.qualification || "",
            institute: e.institute || "",
            years: e.years || "",
            score: e.score || "",
          }))
        : [emptyEdu()],
    platforms:
      Array.isArray(about.platforms) && about.platforms.length
        ? about.platforms.map((p) => ({ name: p.name || "", url: p.url || "" }))
        : [emptyPlatform()],
  };
};

const toPayload = (form) => ({
  heroHeadline: form.heroHeadline.trim(),
  heroSubtitle: form.heroSubtitle.trim(),
  aboutHeadline: form.aboutHeadline.trim(),
  aboutIntro: form.aboutIntro.trim(),
  tagline: form.tagline.trim(),
  email: form.email.trim(),
  handle: form.handle.trim(),
  pronouns: form.pronouns.trim(),
  codeTags: form.codeTagsText
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  highlights: form.highlightsText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean),
  focusAreas: form.focusAreas
    .map((f) => ({
      title: f.title.trim(),
      icon: f.icon.trim() || "FaReact",
      points: f.pointsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    }))
    .filter((f) => f.title),
  education: form.education
    .map((e) => ({
      qualification: e.qualification.trim(),
      institute: e.institute.trim(),
      years: e.years.trim(),
      score: e.score.trim(),
    }))
    .filter((e) => e.qualification || e.institute),
  platforms: form.platforms
    .map((p) => ({ name: p.name.trim(), url: p.url.trim() }))
    .filter((p) => p.name && p.url),
});

const AboutManager = () => {
  const dispatch = useDispatch();
  const about = useSelector((state) => state.portfolio.data?.about);
  const [formData, setFormData] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setFormData(fromAbout(about));
  }, [about]);

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus(null);
  };

  const handleInputChange = (e) => {
    setField(e.target.name, e.target.value);
  };

  const updateFocus = (index, key, value) => {
    setFormData((prev) => {
      const focusAreas = prev.focusAreas.map((f, i) =>
        i === index ? { ...f, [key]: value } : f
      );
      return { ...prev, focusAreas };
    });
    setStatus(null);
  };

  const updateEdu = (index, key, value) => {
    setFormData((prev) => {
      const education = prev.education.map((e, i) =>
        i === index ? { ...e, [key]: value } : e
      );
      return { ...prev, education };
    });
    setStatus(null);
  };

  const updatePlatform = (index, key, value) => {
    setFormData((prev) => {
      const platforms = prev.platforms.map((p, i) =>
        i === index ? { ...p, [key]: value } : p
      );
      return { ...prev, platforms };
    });
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    try {
      setSaving(true);
      await axiosInstance.put("/portfolio-data", { about: toPayload(formData) }, config);
      dispatch(fetchPortfolioData({ force: true }));
      setStatus({ type: "success", text: "Saved. About + home pages now use these values." });
    } catch (error) {
      console.error("Error saving about data:", error);
      setStatus({ type: "error", text: error.response?.data?.message || "Failed to save." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell
      index="05 / About"
      title="Manage About"
      subtitle="Edit home hero copy and the full About page: identity, highlights, focus, education, platforms."
    >
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Home hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={adminPanelClass}
        >
          <h2 className="mb-1 font-display text-xl font-semibold text-white">Home hero</h2>
          <p className="mb-5 text-sm text-zinc-500">Leave empty to keep built-in defaults.</p>
          <div className="space-y-4">
            <div>
              <label className={adminLabelClass}>Hero headline</label>
              <textarea
                name="heroHeadline"
                value={formData.heroHeadline}
                onChange={handleInputChange}
                rows={3}
                className={adminInputClass}
                placeholder={"Engineering _scalable_\nproducts with *AI‑first*\n_experiences_."}
              />
              <p className="mt-1 text-xs text-zinc-600">
                One line per row.{" "}
                <span className="font-mono text-zinc-400">_outline_</span> ·{" "}
                <span className="font-mono text-zinc-400">*chroma*</span>
              </p>
            </div>
            <div>
              <label className={adminLabelClass}>Hero subtitle</label>
              <textarea
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleInputChange}
                rows={3}
                className={adminInputClass}
                placeholder="I build full-stack products…"
              />
            </div>
          </div>
        </motion.div>

        {/* About intro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className={adminPanelClass}
        >
          <h2 className="mb-5 font-display text-xl font-semibold text-white">About intro</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={adminLabelClass}>Handle</label>
                <input
                  type="text"
                  name="handle"
                  value={formData.handle}
                  onChange={handleInputChange}
                  className={adminInputClass}
                  placeholder={githubProfile.handle}
                />
              </div>
              <div>
                <label className={adminLabelClass}>Pronouns</label>
                <input
                  type="text"
                  name="pronouns"
                  value={formData.pronouns}
                  onChange={handleInputChange}
                  className={adminInputClass}
                  placeholder={githubProfile.identity.pronouns}
                />
              </div>
            </div>
            <div>
              <label className={adminLabelClass}>About headline</label>
              <input
                type="text"
                name="aboutHeadline"
                value={formData.aboutHeadline}
                onChange={handleInputChange}
                className={adminInputClass}
                placeholder="Building systems that ship."
              />
            </div>
            <div>
              <label className={adminLabelClass}>About intro</label>
              <textarea
                name="aboutIntro"
                value={formData.aboutIntro}
                onChange={handleInputChange}
                rows={4}
                className={adminInputClass}
                placeholder="I'm Abhishek Sharma — B.Tech CSE…"
              />
            </div>
            <div>
              <label className={adminLabelClass}>Tagline (page subtitle)</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                className={adminInputClass}
                placeholder={githubProfile.tagline}
              />
            </div>
            <div>
              <label className={adminLabelClass}>Contact email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={adminInputClass}
                placeholder={githubProfile.email}
              />
            </div>
            <div>
              <label className={adminLabelClass}>Code tags</label>
              <input
                type="text"
                name="codeTagsText"
                value={formData.codeTagsText}
                onChange={handleInputChange}
                className={adminInputClass}
                placeholder="C++, Python, Java, JavaScript, React, MySQL"
              />
              <p className="mt-1 text-xs text-zinc-600">Comma-separated.</p>
            </div>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className={adminPanelClass}
        >
          <h2 className="mb-1 font-display text-xl font-semibold text-white">Highlights</h2>
          <p className="mb-4 text-sm text-zinc-500">One highlight per line (shown as 01 / 02 / 03 cards).</p>
          <textarea
            name="highlightsText"
            value={formData.highlightsText}
            onChange={handleInputChange}
            rows={4}
            className={adminInputClass}
            placeholder={"GSSoC 2024 Extended contributor\nFull-stack & AI systems\nBuilding in public"}
          />
        </motion.div>

        {/* Focus areas */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className={adminPanelClass}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-white">Focus areas</h2>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  focusAreas: [...prev.focusAreas, emptyFocus()],
                }))
              }
              className="btn-ghost inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
            >
              <AiOutlinePlusCircle /> Add
            </button>
          </div>
          <div className="space-y-5">
            {formData.focusAreas.map((area, index) => (
              <div key={index} className="border border-white/10 bg-black/30 p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    Focus 0{index + 1}
                  </span>
                  {formData.focusAreas.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          focusAreas: prev.focusAreas.filter((_, i) => i !== index),
                        }))
                      }
                      className="p-1 text-zinc-500 transition hover:text-[var(--accent-c)]"
                      aria-label="Remove focus"
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={adminLabelClass}>Title</label>
                    <input
                      type="text"
                      value={area.title}
                      onChange={(e) => updateFocus(index, "title", e.target.value)}
                      className={adminInputClass}
                      placeholder="AI systems"
                    />
                  </div>
                  <div>
                    <label className={adminLabelClass}>Icon</label>
                    <input
                      type="text"
                      value={area.icon}
                      onChange={(e) => updateFocus(index, "icon", e.target.value)}
                      className={adminInputClass}
                      placeholder="SiLangchain / FaReact / FaPython"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className={adminLabelClass}>Points (one per line)</label>
                  <textarea
                    value={area.pointsText}
                    onChange={(e) => updateFocus(index, "pointsText", e.target.value)}
                    rows={3}
                    className={adminInputClass}
                    placeholder={"LangChain / LangGraph workflows\nModel APIs & retrieval"}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={adminPanelClass}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-white">Education</h2>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  education: [...prev.education, emptyEdu()],
                }))
              }
              className="btn-ghost inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
            >
              <AiOutlinePlusCircle /> Add
            </button>
          </div>
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="border border-white/10 bg-black/30 p-4">
                <div className="mb-3 flex justify-end">
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          education: prev.education.filter((_, i) => i !== index),
                        }))
                      }
                      className="p-1 text-zinc-500 transition hover:text-[var(--accent-c)]"
                      aria-label="Remove education"
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={adminLabelClass}>Qualification</label>
                    <input
                      type="text"
                      value={edu.qualification}
                      onChange={(e) => updateEdu(index, "qualification", e.target.value)}
                      className={adminInputClass}
                      placeholder="B.Tech CSE"
                    />
                  </div>
                  <div>
                    <label className={adminLabelClass}>Institute</label>
                    <input
                      type="text"
                      value={edu.institute}
                      onChange={(e) => updateEdu(index, "institute", e.target.value)}
                      className={adminInputClass}
                      placeholder="United Institute of Technology"
                    />
                  </div>
                  <div>
                    <label className={adminLabelClass}>Years</label>
                    <input
                      type="text"
                      value={edu.years}
                      onChange={(e) => updateEdu(index, "years", e.target.value)}
                      className={adminInputClass}
                      placeholder="2022 – Present"
                    />
                  </div>
                  <div>
                    <label className={adminLabelClass}>Score</label>
                    <input
                      type="text"
                      value={edu.score}
                      onChange={(e) => updateEdu(index, "score", e.target.value)}
                      className={adminInputClass}
                      placeholder="8 CGPA"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className={adminPanelClass}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-white">Platforms</h2>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  platforms: [...prev.platforms, emptyPlatform()],
                }))
              }
              className="btn-ghost inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
            >
              <AiOutlinePlusCircle /> Add
            </button>
          </div>
          <div className="space-y-3">
            {formData.platforms.map((p, index) => (
              <div key={index} className="flex flex-wrap items-end gap-3">
                <div className="min-w-[8rem] flex-1">
                  <label className={adminLabelClass}>Name</label>
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => updatePlatform(index, "name", e.target.value)}
                    className={adminInputClass}
                    placeholder="LeetCode"
                  />
                </div>
                <div className="min-w-[12rem] flex-[2]">
                  <label className={adminLabelClass}>URL</label>
                  <input
                    type="url"
                    value={p.url}
                    onChange={(e) => updatePlatform(index, "url", e.target.value)}
                    className={adminInputClass}
                    placeholder="https://…"
                  />
                </div>
                {formData.platforms.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        platforms: prev.platforms.filter((_, i) => i !== index),
                      }))
                    }
                    className="mb-1 p-2 text-zinc-500 transition hover:text-[var(--accent-c)]"
                    aria-label="Remove platform"
                  >
                    <AiOutlineDelete />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4 pb-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-solid px-6 py-2.5 font-display text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {status && (
            <p
              className={`font-mono text-xs ${
                status.type === "success" ? "text-[var(--accent-a)]" : "text-[var(--accent-c)]"
              }`}
            >
              {status.text}
            </p>
          )}
        </div>
      </form>
    </AdminShell>
  );
};

export default AboutManager;
