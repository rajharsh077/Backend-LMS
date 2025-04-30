import React from 'react';
import { useLocation } from 'react-router-dom';

const BookPage = () => {
  const location = useLocation();
  const books = location.state?.books || []; // If no books are passed, default to an empty array

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-4xl text-center mb-8 font-bold text-gray-800">Books Collection</h1>

      {/* Display books in a responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={book.image || 'https://via.placeholder.com/150'}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-600 text-sm">{book.description}</p>
                <div className="mt-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                    {book.genre || 'Unknown Genre'}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
                    View Details
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookPage;
