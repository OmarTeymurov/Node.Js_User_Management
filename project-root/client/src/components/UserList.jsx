import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  return (

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-slate-800 text-xs text-white uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">@Email</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`${index === 0 ? 'bg-emerald-50' : 'bg-white'} border-b hover:bg-gray-100 transition duration-150`}
            >
              <td className="px-6 py-4 font-medium">{user.id}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4 capitalize">{user.role}</td>
              <td className="px-6 py-4 flex justify-center items-center gap-x-3">
                <button
                  onClick={() => onEdit(user)}
                  className="p-2 w-8 h-8 flex items-center justify-center bg-violet-100 text-violet-600 rounded-md hover:bg-violet-200 transition"
                  aria-label="Edit User"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="p-2 w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                  aria-label="Delete User"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;