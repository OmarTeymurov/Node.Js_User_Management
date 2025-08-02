import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';


// API-nin baza URL-i
const API_URL = 'http://localhost:5050/api/users';

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // İstifadəçiləri API-dən çəkmək üçün funksiya
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (error) {
            console.error("İstifadəçiləri çəkərkən xəta baş verdi:", error);
        }
    };

    // Komponent yüklənəndə istifadəçiləri çəkir
    useEffect(() => {
        fetchUsers();
    }, []);

    // Formu açmaq/bağlamaq
    const handleAddNewUser = () => {
        setSelectedUser(null);
        setIsFormVisible(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsFormVisible(true);
    };

    const handleFormClose = () => {
        setIsFormVisible(false);
        setSelectedUser(null);
    };
    
    // İstifadəçini silmək
    const handleDeleteUser = async (userId) => {
        if(window.confirm("Bu istifadəçini silmək istədiyinizə əminsinizmi?")) {
            try {
                await axios.delete(`${API_URL}/${userId}`);
                fetchUsers(); // Siyahını yenilə
            } catch (error) {
                console.error("İstifadəçini silərkən xəta:", error);
            }
        }
    };

    return (
        <div className="bg-slate-100 min-h-screen">
            <header className="bg-emerald-400 p-6 shadow-md">
                <h1 className="text-3xl font-bold text-white text-center">
                    User Management System
                </h1>
            </header>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6">
                        <button 
                            onClick={handleAddNewUser} 
                            className="bg-violet-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-600 transition duration-300"
                        >
                            New User
                        </button>
                    </div>

                    {isFormVisible && (
                        <UserForm
                            selectedUser={selectedUser}
                            onFormSubmit={fetchUsers} 
                            onClose={handleFormClose}
                        />
                    )}

                    <UserList 
                        users={users} 
                        onEdit={handleEditUser} 
                        onDelete={handleDeleteUser}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;