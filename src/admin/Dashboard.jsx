import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const adminSections = [
        { name: 'Projects', path: '/admin/projects', description: 'Manage your portfolio projects', color: 'bg-blue-600' },
        { name: 'Experience', path: '/admin/experience', description: 'Manage work experience and internships', color: 'bg-green-600' },
        { name: 'Skills', path: '/admin/skills', description: 'Manage your technical skills', color: 'bg-purple-600' },
        { name: 'Resume', path: '/admin/resume', description: 'Upload and manage your resume', color: 'bg-orange-600' }
    ];

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-4 text-purple-600">Admin Dashboard</h1>
            <p className="text-gray-300 mb-8">Welcome to the admin panel. Here you can manage your portfolio content.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminSections.map((section, index) => (
                    <Link
                        key={index}
                        to={section.path}
                        className={`${section.color} p-6 rounded-lg hover:opacity-90 transition-opacity duration-200`}
                    >
                        <h3 className="text-xl font-bold mb-2">{section.name}</h3>
                        <p className="text-sm opacity-90">{section.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
