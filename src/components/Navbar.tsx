import React from 'react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ cartCount }: { cartCount: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">ELITE BOOTS</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="hover:text-gray-300 px-3 py-2">Home</a>
              <a href="#" className="hover:text-gray-300 px-3 py-2">New Arrivals</a>
              <a href="#" className="hover:text-gray-300 px-3 py-2">Sale</a>
              <a href="#" className="hover:text-gray-300 px-3 py-2">Brands</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 cursor-pointer hover:text-gray-300" />
            <div className="relative">
              <ShoppingCart className="h-5 w-5 cursor-pointer hover:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 hover:bg-gray-800">Home</a>
            <a href="#" className="block px-3 py-2 hover:bg-gray-800">New Arrivals</a>
            <a href="#" className="block px-3 py-2 hover:bg-gray-800">Sale</a>
            <a href="#" className="block px-3 py-2 hover:bg-gray-800">Brands</a>
          </div>
        </div>
      )}
    </nav>
  );
}