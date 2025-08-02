import React from 'react';

function UserProfile({ user, onClose }) {
    if (!user) return null;

    return (
        <div className="profile-modal">
            <div className="profile-content">
                <button onClick={onClose} className="close-btn">✖</button>
                <h2>User Profile</h2>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
    );
}

export default UserProfile;