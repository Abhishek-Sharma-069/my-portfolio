import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai"; // Import the icon
import { useSelector, useDispatch } from 'react-redux';
import { setResumeUrl } from '../redux/slices/resumeSlice';
import axios from 'axios';

const ResumeManager = () => {
    const resumeUrl = useSelector((state) => state.resume.resumeUrl);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility
    const [showResume, setShowResume] = useState(false); // State to control resume iframe visibility

    useEffect(() => {
        fetchResumeUrl();
    }, []);

    const fetchResumeUrl = async () => {
        try {
            const response = await axiosInstance.get('/portfolio-data');
            dispatch(setResumeUrl(response.data.resumeUrl));
        } catch (error) {
            console.error('Error fetching resume URL:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axiosInstance.put('/resume', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            dispatch(setResumeUrl(response.data.resumeUrl));
            setFile(null);
            setShowForm(false); // Close form on successful submission
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-4 text-purple-600">Manage Resume</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded flex items-center space-x-2 hover:bg-green-700 transition-colors duration-300"
            >
                <AiOutlinePlusCircle />
                <span>{showForm ? 'Hide Form' : 'Upload New Resume'}</span>
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="p-4 border border-purple-600 rounded-lg max-w-lg mx-auto bg-gray-800">
                    <h2 className="text-2xl mb-4 text-purple-600">Upload New Resume</h2>
                    <input type="file" name="resume" onChange={handleFileChange} className="w-full p-1 border border-purple-600 rounded bg-gray-700 text-white" />
                    <button type="submit" className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-300" disabled={!file}>
                        Upload
                    </button>
                </form>
            )}

            <div className="mb-8 p-4 border border-purple-600 rounded-lg bg-gray-800 max-w-lg mx-auto">
                <h2 className="text-2xl mb-4 text-purple-600">Current Resume</h2>
                {resumeUrl ? (
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => setShowResume(!showResume)}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-300"
                            >
                                {showResume ? 'Hide Resume' : 'View Resume'}
                            </button>
                            <a 
                                href={resumeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                            >
                                Open in New Tab
                            </a>
                        </div>
                        {showResume && (
                            <div className="mt-4">
                                <iframe
                                    src={`${resumeUrl}#toolbar=0`}
                                    title="Resume Preview"
                                    className="w-full h-96 border border-purple-600 rounded-lg"
                                    style={{ minHeight: '500px' }}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-300">No resume uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default ResumeManager;