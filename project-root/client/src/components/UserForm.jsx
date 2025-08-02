import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5050/api/users';

function UserForm({ selectedUser, onFormSubmit, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user'
    });

    useEffect(() => {
        if (selectedUser) {
            setFormData(selectedUser);
        } else {
            setFormData({ name: '', email: '', role: 'user' });
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedUser) {
                // Yeniləmə (Update)
                await axios.put(`${API_URL}/${selectedUser.id}`, formData);
            } else {
                // Yaratma (Create)
                await axios.post(API_URL, formData);
            }
            onFormSubmit(); // Siyahını yenilə
            onClose(); // Formu bağla
        } catch (error) {
            console.error("Formu göndərərkən xəta:", error);
        }
    };

    return (
        // Modal Overlay
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal Content */}
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                    aria-label="Close form"
                >
                
                </button>
                
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {selectedUser ? 'Edit User' : 'Add New User'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select 
                            name="role" 
                            id="role"
                            value={formData.role} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition duration-300 mt-4"
                    >
                        {selectedUser ? 'Update User' : 'Create User'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;