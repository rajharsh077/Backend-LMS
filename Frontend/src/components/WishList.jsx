import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WishList = () => {
  const { name } = useParams();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:3000/wishlist", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWishlist(response.data.wishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };
  
    fetchWishlist();
  }, []); // no [name] dependency needed if JWT handles user
  

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      const response = await axios.delete("http://localhost:3000/wishlist/remove", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { bookId },
      });
  
      alert(response.data.message);
      setWishlist((prevWishlist) => prevWishlist.filter(book => book.id !== bookId));
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      alert("Error removing book from wishlist");
    }
  };
  

  const handleLend = async (bookId) => {
    const confirmLend = window.confirm("Do you want to lend this book?");
    if (!confirmLend) return;
  
    try {
      const res = await axios.post(
        "http://localhost:3000/lend",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      alert(res.data.message);
  
      // Optionally remove from wishlist after lending
      setWishlist((prevWishlist) => prevWishlist.filter(book => book.id !== bookId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to lend book");
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-6">{name}'s Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {wishlist.length > 0 ? (
          wishlist.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <img src={book.image || 'https://via.placeholder.com/150x200'} alt={book.title} className="h-48 w-full object-cover rounded" />
              <h3 className="mt-2 font-bold text-lg">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleLend(book.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded"
                >
                  Lend
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(book.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">Your wishlist is empty!</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
