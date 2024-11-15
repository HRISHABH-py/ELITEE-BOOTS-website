import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import { ShoppingCart } from 'lucide-react';

const products = [
  // Football Boots
  {
    id: 1,
    name: 'Nike Phantom GX Elite',
    price: 275,
    brand: 'Nike',
    category: 'boots',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2970&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Adidas X Speedportal',
    price: 250,
    brand: 'Adidas',
    category: 'boots',
    image: 'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?q=80&w=3270&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Puma Future Ultimate',
    price: 230,
    brand: 'Puma',
    category: 'boots',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=3270&auto=format&fit=crop'
  },
  // Jerseys
  {
    id: 4,
    name: 'Manchester United Home Jersey 23/24',
    price: 89,
    brand: 'Adidas',
    category: 'jersey',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=3270&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Real Madrid Away Jersey 23/24',
    price: 89,
    brand: 'Adidas',
    category: 'jersey',
    image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?q=80&w=3270&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Barcelona Home Jersey 23/24',
    price: 89,
    brand: 'Nike',
    category: 'jersey',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=3270&auto=format&fit=crop'
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            All Products
          </button>
          <button 
            onClick={() => setActiveCategory('boots')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'boots' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Football Boots
          </button>
          <button 
            onClick={() => setActiveCategory('jersey')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'jersey' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Jerseys
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onSuccess={() => {
          setCartItems([]);
          setIsCheckoutOpen(false);
        }}
      />

      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}

export default App;