import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=3270&auto=format&fit=crop"
        alt="Football boots"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Elite Performance Boots</h1>
        <p className="text-xl md:text-2xl mb-8">Dominate the game with premium football boots</p>
        <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  );
}