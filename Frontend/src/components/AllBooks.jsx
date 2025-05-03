import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  // Fetch books when the component mounts
  useEffect(() => {
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

  // Handle delete operation for a book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete/book/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id)); // Remove book from state
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete the book.');
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-500">{book.author}</p>
                {book.image && <img src={book.image} alt={book.title} className="mt-2 w-32 h-32 object-cover" />}
              </div>

              {/* Delete button aligned to the right */}
              <button
                onClick={() => handleDelete(book.id)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllBooks;
