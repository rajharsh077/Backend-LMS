import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookData, setBookData] = useState({
    id: '',
    title: '',
    image: '',
    author: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending form data to the backend
      const res = await axios.post('http://localhost:3000/admin/submitBook', bookData);
      
      if (res.data.status === 'success') {
        setMessage(res.data.message); // Success message
        setBookData({ id: '', title: '', image: '', author: '' }); // Clear form
      } else {
        setMessage(res.data.message); // Error message
      }
    } catch (error) {
      console.error('Error submitting book:', error);
      setMessage('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <div className="mb-4">
          <label className="block font-medium">ID</label>
          <input
            type="text"
            name="id"
            value={bookData.id}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Book Title</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={bookData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <input
          type="submit"
          value="Add Book"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        />
      </form>

      {/* Displaying the message */}
      {message && (
        <div className="mt-4 text-center text-lg font-semibold">
          {message}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <a
          href="/books"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View All Books
        </a>
        <a
          href="/"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Home
        </a>
        <a
          href="/admin/dashboard/users"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Users
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
