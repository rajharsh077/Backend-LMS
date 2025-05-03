import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { name } = useParams();
  const [lentBooks, setLentBooks] = useState([]);

  useEffect(() => {
    const fetchLentBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/lent/${name}`);
        setLentBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch lent books", err);
      }
    };

    fetchLentBooks();
  }, [name]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-purple-700 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">📚 Your Lent Books</h1>
        <a
          href={`/${name}`}
          className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold"
        >
          Back
        </a>
      </nav>

      {/* Greeting */}
      <div className="text-center mt-6 text-xl font-semibold">
        Hello, {name}! Here are your lent books:
      </div>

      {/* Lent Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {lentBooks.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No books lent yet.</p>
        ) : (
          lentBooks.map(book => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <img src={book.image} alt={book.title} className="h-48 w-full object-cover rounded" />
              <h3 className="mt-2 font-bold text-lg">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserProfile;
