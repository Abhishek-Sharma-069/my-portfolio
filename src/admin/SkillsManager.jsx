import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import { motion } from "framer-motion";
import { AiOutlinePlusCircle, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

const SkillsManager = () => {
    const [skills, setSkills] = useState({
        "General": [],
        "Web Development": [],
        "Mobile Development": [],
        "Databases": [],
        "DevOps & Tools": []
    });
    const [formData, setFormData] = useState({ 
        category: 'General', 
        name: '', 
        icon: '', 
        color: 'text-blue-500' 
    });
    const [editingSkill, setEditingSkill] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const categories = [
        { key: 'General', label: 'General', color: 'text-yellow-400' },
        { key: 'Web Development', label: 'Web Development', color: 'text-green-400' },
        { key: 'Mobile Development', label: 'Mobile Development', color: 'text-blue-400' },
        { key: 'Databases', label: 'Databases', color: 'text-teal-400' },
        { key: 'DevOps & Tools', label: 'DevOps & Tools', color: 'text-purple-400' }
    ];

    // Common icon examples for reference
    const iconExamples = [
        'FaJava', 'FaPhp', 'FaJsSquare', 'FaPython', 'FaReact',
        'FaNodeJs', 'FaAndroid', 'FaGitAlt', 'FaDocker',
        'SiMysql', 'SiC', 'SiCplusplus', 'SiMongodb', 'SiNextdotjs',
        'FaHtml5', 'FaCss3Alt', 'FaBootstrap', 'FaSass', 'FaLess',
        'SiTypescript', 'SiJavascript', 'SiVuedotjs', 'SiAngular',
        'FaAws', 'FaGoogle', 'FaMicrosoft', 'FaUbuntu', 'FaLinux'
    ];

    // Common color examples for reference
    const colorExamples = [
        'text-red-500', 'text-blue-500', 'text-yellow-500', 'text-green-500',
        'text-purple-500', 'text-pink-500', 'text-indigo-500', 'text-teal-500',
        'text-orange-500', 'text-cyan-500', 'text-lime-500', 'text-white',
        'text-gray-500', 'text-slate-500', 'text-zinc-500', 'text-neutral-500',
        'text-emerald-500', 'text-violet-500', 'text-fuchsia-500', 'text-rose-500'
    ];

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await axiosInstance.get('/portfolio-data');
            setSkills(res.data.skills || {
                "General": [],
                "Web Development": [],
                "Mobile Development": [],
                "Databases": [],
                "DevOps & Tools": []
            });
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };

        try {
            const updatedSkills = { ...skills };
            
            if (editingSkill) {
                // Update existing skill
                const { category, index } = editingSkill;
                updatedSkills[category][index] = {
                    name: formData.name,
                    icon: formData.icon,
                    color: formData.color
                };
            } else {
                // Add new skill
                updatedSkills[formData.category].push({
                    name: formData.name,
                    icon: formData.icon,
                    color: formData.color
                });
            }

            await axiosInstance.put('/portfolio-data', 
                { skills: updatedSkills }, 
                config
            );
            
            fetchSkills();
            setFormData({ category: 'General', name: '', icon: '', color: 'text-blue-500' });
            setEditingSkill(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error saving skills:', error);
        }
    };

    const handleEdit = (category, skill, index) => {
        setEditingSkill({ category, index });
        setFormData({
            category: category,
            name: skill.name,
            icon: skill.icon,
            color: skill.color
        });
        setShowForm(true);
    };

    const handleDelete = async (category, index) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };
            
            try {
                const updatedSkills = { ...skills };
                updatedSkills[category].splice(index, 1);
                
                await axiosInstance.put('/portfolio-data', 
                    { skills: updatedSkills }, 
                    config
                );
                
                fetchSkills();
            } catch (error) {
                console.error('Error deleting skill:', error);
            }
        }
    };

    const renderSkillCard = (category, skillsList, categoryInfo) => (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${categoryInfo.color}`}>
                    {categoryInfo.label}
                </h3>
                <span className="text-sm text-gray-400">
                    {skillsList.length} skills
                </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
                {skillsList.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                        <div className="flex items-center space-x-2">
                            <span className={`${skill.color} text-lg`}>●</span>
                            <span className="text-white">{skill.name}</span>
                            <span className="text-xs text-gray-400">({skill.icon})</span>
                        </div>
                        <div className="flex space-x-1">
                            <button
                                onClick={() => handleEdit(category, skill, index)}
                                className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <AiOutlineEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(category, index)}
                                className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-4 text-purple-600">Manage Skills</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-6 px-4 py-2 bg-green-600 text-white rounded flex items-center space-x-2 hover:bg-green-700 transition-colors duration-300"
            >
                <AiOutlinePlusCircle />
                <span>{showForm ? 'Hide Form' : 'Add New Skill'}</span>
            </button>

            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700"
                >
                    <h2 className="text-xl font-bold mb-4 text-purple-400">
                        {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat.key} value={cat.key}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Skill Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                                placeholder="e.g., React, Python, Docker"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Icon</label>
                            <input
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                                placeholder="e.g., FaReact, SiNextdotjs, FaDocker"
                                required
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Enter React icon name (from react-icons/fa or react-icons/si)
                            </p>
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Common examples:</p>
                                <div className="flex flex-wrap gap-1">
                                    {iconExamples.slice(0, 8).map(icon => (
                                        <span
                                            key={icon}
                                            className="text-xs bg-gray-600 px-2 py-1 rounded cursor-pointer hover:bg-gray-500"
                                            onClick={() => setFormData({...formData, icon})}
                                        >
                                            {icon}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Color</label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                                placeholder="e.g., text-blue-500, text-red-600, text-green-400"
                                required
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Enter Tailwind CSS color class (text-{'{color}'}-{'{shade}'})
                            </p>
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Common examples:</p>
                                <div className="flex flex-wrap gap-1">
                                    {colorExamples.slice(0, 8).map(color => (
                                        <span
                                            key={color}
                                            className="text-xs bg-gray-600 px-2 py-1 rounded cursor-pointer hover:bg-gray-500"
                                            onClick={() => setFormData({...formData, color})}
                                        >
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-300"
                            >
                                {editingSkill ? 'Update Skill' : 'Add Skill'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingSkill(null);
                                    setFormData({ category: 'General', name: '', icon: '', color: 'text-blue-500' });
                                }}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categories.map(categoryInfo => 
                    <div key={categoryInfo.key}>
                        {renderSkillCard(categoryInfo.key, skills[categoryInfo.key] || [], categoryInfo)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillsManager;
