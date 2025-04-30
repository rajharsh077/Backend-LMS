import React from 'react';
import Navbar from './Navbar';
import { useEffect } from 'react';

const Home = () => {
  return (
    <div
      className="h-screen bg-cover bg-center text-white relative overflow-hidden"
      style={{
        backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/2016/08/Old-Library-Wallpaper.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Navbar (ensure it's inside relative container) */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Centered Hero Section */}
      <section className="relative z-10 flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl">
          <h2 className="text-4xl font-semibold mb-4 text-yellow-200">
            Welcome to the Library
          </h2>
          <p className="text-lg text-gray-200">
            Explore, Manage, and Discover Books Easily
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
