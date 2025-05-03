import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Params = () => {
  const { name } = useParams();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/books');
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };

    fetchBooks();
  }, []);

  const handleLend = async (bookId) => {
    const confirmLend = window.confirm("Do you want to lend this book?");
    if (!confirmLend) return;

    try {
      const res = await axios.post(`http://localhost:3000/lend/${name}`, {
        bookId: bookId,
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to lend book");
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <nav className="bg-purple-700 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">📚 Welcome to Our Library</h1>
        <a href={`/${name}/profile`} className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold">
          Profile
        </a>
      </nav>

      {/* Greeting */}
      <div className="text-center mt-6 text-xl font-semibold text-gray-800">
        Hi, {name}!
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search books here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <img src={book.image || 'https://via.placeholder.com/150x200'} alt={book.title} className="h-48 w-full object-cover rounded" />
              <h3 className="mt-2 font-bold text-lg">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              <button
                onClick={() => handleLend(book.id)}
                className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Lend
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No books found matching your search.</p>
        )}
      </div>

      {/* Bottom Content */}
      <div className="text-center mt-16 mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">More Books Available Soon!</h2>
        <p className="text-lg text-gray-600 mb-6">
          We're constantly expanding our library. Check back often or subscribe to get updates about new arrivals!
        </p>
        <a
          href="#"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-full transition duration-200 shadow-md"
        >
          Subscribe for Updates
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 mt-16">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 BookVerse. All Rights Reserved.</p>
          <p className="mt-2 text-sm">Created with ❤️ for book lovers.</p>
          <div className="mt-4">
            <a href="#" className="text-yellow-500 hover:text-yellow-600 mx-3">Privacy Policy</a>
            <a href="#" className="text-yellow-500 hover:text-yellow-600 mx-3">Terms of Service</a>
            <a href="#" className="text-yellow-500 hover:text-yellow-600 mx-3">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Params;
