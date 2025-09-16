import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import { motion } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai"; // Import the icon

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', buttonText: '', buttonLink: '', image: null, currentImage: '' });
    const [editingProject, setEditingProject] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await axiosInstance.get('/portfolio-data');
        setProjects(res.data.projects);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        // Only append the actual form fields, not internal state like currentImage
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('buttonText', formData.buttonText);
        data.append('buttonLink', formData.buttonLink);
        
        // Only append image if a file is selected
        if (formData.image) {
            data.append('image', formData.image);
            console.log('📁 Frontend: Image file being sent:', formData.image.name);
        } else {
            console.log('📁 Frontend: No image file selected');
        }

        console.log('📝 Frontend: Form data being sent:');
        for (let [key, value] of data.entries()) {
            console.log(`  ${key}:`, value);
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        try {
            if (editingProject) {
                console.log('🔄 Frontend: Updating project with ID:', editingProject._id);
                await axiosInstance.put(`/projects/${editingProject._id}`, data, config);
            } else {
                console.log('➕ Frontend: Creating new project');
                await axiosInstance.post('/projects', data, config);
            }
            fetchProjects();
            setFormData({ title: '', description: '', buttonText: '', buttonLink: '', image: null, currentImage: '' });
            setEditingProject(null);
            setShowForm(false); // Close form on successful submission
        } catch (error) {
            console.error('❌ Frontend: Error submitting form:', error.response?.data || error.message);
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
            currentImage: project.image // Store current image URL for display
        });
        setShowForm(true); // Open form when editing
    };

    const handleDelete = async (id) => {
        const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };
        await axiosInstance.delete(`/projects/${id}`, config);
        fetchProjects();
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-4 text-purple-600">Manage Projects</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded flex items-center space-x-2 hover:bg-green-700 transition-colors duration-300"
            >
                <AiOutlinePlusCircle />
                <span>{showForm ? 'Hide Form' : 'Add New Project'}</span>
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 border border-purple-600 rounded-lg max-w-lg mx-auto bg-gray-800">
                    <h2 className="text-2xl mb-4 text-purple-600">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
                    
                    {/* Show current image when editing */}
                    {editingProject && formData.currentImage && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white mb-2">Current Image:</label>
                            <img 
                                src={formData.currentImage} 
                                alt="Current project" 
                                className="w-full h-32 object-cover rounded border border-purple-600"
                            />
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white" required />
                        <input type="text" name="buttonText" value={formData.buttonText} onChange={handleInputChange} placeholder="Button Text" className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white" required />
                        <input type="text" name="buttonLink" value={formData.buttonLink} onChange={handleInputChange} placeholder="Button Link" className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white" required />
                    </div>
                    
                    {/* Description as textarea */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-white mb-2">Description</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleInputChange} 
                            placeholder="Enter project description..."
                            rows={4}
                            className="w-full p-3 border border-purple-600 rounded bg-gray-700 text-white resize-vertical"
                            required 
                        />
                    </div>
                        
                    {/* File input with better styling */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-white mb-2">
                            {editingProject ? 'New Image (optional - leave empty to keep current)' : 'Project Image'}
                        </label>
                        <input 
                            type="file" 
                            name="image" 
                            onChange={handleFileChange} 
                            accept="image/*"
                            className="w-full p-2 border border-purple-600 rounded bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                        />
                        {formData.image && (
                            <p className="text-sm text-green-400 mt-1">✓ New image selected: {formData.image.name}</p>
                        )}
                    </div>
                    <button type="submit" className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-300">{editingProject ? 'Update' : 'Add'}</button>
                </form>
            )}

            <div>
                <h2 className="text-2xl mb-4 text-purple-600">Existing Projects</h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {projects.map(project => (
                        <motion.div
                            key={project._id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            className="bg-gray-800 border border-purple-600 rounded-lg overflow-hidden shadow-lg flex flex-col max-w-[320px] mx-auto w-full"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-purple-600 mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-300 mb-3 flex-grow">
                                    {project.description}
                                </p>
                                <a
                                    href={project.buttonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-purple-500 py-1.5 px-3 rounded-md hover:bg-red-500 transition duration-300 text-center text-sm w-full sm:w-auto"
                                >
                                    {project.buttonText}
                                </a>
                                <div className="flex space-x-2 mt-4">
                                    <button onClick={() => handleEdit(project)} className="px-4 py-2 bg-yellow-500 text-white rounded w-full hover:bg-yellow-600 transition-colors duration-300">Edit</button>
                                    <button onClick={() => handleDelete(project._id)} className="px-4 py-2 bg-red-600 text-white rounded w-full hover:bg-red-700 transition-colors duration-300">Delete</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsManager;