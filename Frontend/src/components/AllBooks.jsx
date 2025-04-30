import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books when the component mounts
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/dashboard/Allbooks');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-500">{book.author}</p>
              {book.image && <img src={book.image} alt={book.title} className="mt-2 w-32 h-32 object-cover" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllBooks;
