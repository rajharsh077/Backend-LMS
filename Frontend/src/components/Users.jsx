import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allusers = await axios.get("http://localhost:3000/admin/dashboard/users");
        console.log("API Response:", allusers.data);

        if (Array.isArray(allusers.data)) {
          setUser(allusers.data);
        } else {
          setUser([]);
          setError("Received data is not in the expected format.");
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    try {
      // Ensure you're using DELETE method
      await axios.delete(`http://localhost:3000/admin/delete/${id}`);
      setUser((prevUsers) => prevUsers.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Axios error details:", err.response ? err.response : err);
      alert("Failed to delete user.");
    }
  };
  
  

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {user.length === 0 ? (
        <p className="text-gray-500 col-span-full">No users found.</p>
      ) : (
        user.map((u, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-1">{u.name}</h2>
            <p className="text-sm text-gray-600 mb-1">ID: {u.id}</p>
            <p className="text-sm text-gray-600 mb-1">Email: {u.email}</p>
            <p className="text-sm text-gray-600 mb-3">Role: {u.role}</p>

            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Lent Books:</h4>
              {Array.isArray(u.books) && u.books.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {u.books.map((book, i) => (
  <li key={i}>{book.title}</li>
))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm italic">No books lent</p>
              )}
            </div>

            <button
              onClick={() => handleDelete(u.id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded shadow transition"
            >
              Delete User
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
