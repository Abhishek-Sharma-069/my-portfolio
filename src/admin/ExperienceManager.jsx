import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlinePlusCircle } from "react-icons/ai"; // Import the icon

const ExperienceManager = () => {
    const [experience, setExperience] = useState({ sections: [] });
    const [formData, setFormData] = useState({ section: 'Work', company: '', role: '', duration: '', description: '' });
    const [editingExperience, setEditingExperience] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    useEffect(() => {
        fetchExperience();
    }, []);

    const fetchExperience = async () => {
        const res = await axios.get('http://localhost:5000/api/portfolio-data');
        setExperience(res.data.experience);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };

        if (editingExperience) {
            await axios.put(`http://localhost:5000/api/experience/${editingExperience._id}`, formData, config);
        } else {
            await axios.post('http://localhost:5000/api/experience', formData, config);
        }
        fetchExperience();
        setFormData({ section: 'Work', company: '', role: '', duration: '', description: '' });
        setEditingExperience(null);
        setShowForm(false); // Close form on successful submission
    };

    const handleEdit = (item, sectionType) => {
        setEditingExperience(item);
        setFormData({ section: sectionType, company: item.company || '', organization: item.organization || '', role: item.role, duration: item.duration, description: item.description });
        setShowForm(true); // Open form when editing
    };

    const handleDelete = async (id, sectionType) => {
        const config = {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            data: { section: sectionType }
        };
        await axios.delete(`http://localhost:5000/api/experience/${id}`, config);
        fetchExperience();
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-4 text-purple-600">Manage Experience</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded flex items-center space-x-2 hover:bg-green-700 transition-colors duration-300"
            >
                <AiOutlinePlusCircle />
                <span>{showForm ? 'Hide Form' : 'Add New Experience'}</span>
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 border border-purple-600 rounded-lg max-w-lg mx-auto bg-gray-800">
                    <h2 className="text-2xl mb-4 text-purple-600">{editingExperience ? 'Edit Experience' : 'Add Experience'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <select name="section" value={formData.section} onChange={handleInputChange} className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white">
                            <option value="Work">Work</option>
                            <option value="Internship">Internship</option>
                            <option value="Volunteership">Volunteership</option>
                        </select>
                        <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company/Organization" className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white" />
                        <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Role" className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white" />
                        <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration" className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white" />
                        <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white" />
                    </div>
                    <button type="submit" className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-300">{editingExperience ? 'Update' : 'Add'}</button>
                </form>
            )}

            <div>
                <h2 className="text-2xl mb-4 text-purple-600">Existing Experience</h2>
                {experience.sections.map(section => (
                    <div key={section.type} className="mb-6 p-4 border border-purple-600 rounded-lg bg-gray-800">
                        <h3 className="text-xl font-bold mb-2 text-purple-600">{section.type}</h3>
                        <div className="space-y-4">
                            {section.items.map(item => (
                                <div key={item._id} className="p-4 border border-purple-600 rounded-lg flex justify-between items-center bg-gray-700">
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{item.company || item.organization}</h4>
                                        <p className="text-gray-300">{item.role} ({item.duration})</p>
                                        <p className="text-gray-300">{item.description}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEdit(item, section.type)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-300">Edit</button>
                                        <button onClick={() => handleDelete(item._id, section.type)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceManager;