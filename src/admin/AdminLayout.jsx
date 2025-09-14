import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-black">
            <aside className="w-64 bg-gray-900 text-white p-4 border-r border-purple-600">
                <h1 className="text-3xl font-bold mb-6 text-purple-600">Admin Panel</h1>
                <nav>
                    <ul>
                        <li className="mb-3"><Link to="/admin/dashboard" className="block py-2 px-3 rounded hover:bg-purple-700 transition-colors duration-200">Dashboard</Link></li>
                        <li className="mb-3"><Link to="/admin/projects" className="block py-2 px-3 rounded hover:bg-purple-700 transition-colors duration-200">Manage Projects</Link></li>
                        <li className="mb-3"><Link to="/admin/experience" className="block py-2 px-3 rounded hover:bg-purple-700 transition-colors duration-200">Manage Experience</Link></li>
                        <li className="mb-3"><Link to="/admin/resume" className="block py-2 px-3 rounded hover:bg-purple-700 transition-colors duration-200">Manage Resume</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-8 text-white">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
