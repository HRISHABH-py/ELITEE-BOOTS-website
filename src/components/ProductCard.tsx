import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  onAddToCart: (id: number) => void;
}

export default function ProductCard({ id, name, price, image, brand, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase tracking-wider">{brand}</p>
        <h3 className="text-lg font-semibold mt-1">{name}</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${price}</span>
          <button
            onClick={() => onAddToCart(id)}
            className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}