import React, { useState } from 'react';
import { X, CreditCard, Calendar, Lock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, total, onSuccess }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    email: '',
    address: ''
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    email: '',
    address: ''
  });

  const validateForm = () => {
    const newErrors = {
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
      email: '',
      address: ''
    };

    // Card number validation (16 digits)
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Expiry validation (MM/YY format)
    const [month, year] = formData.expiry.split('/');
    if (!month || !year || parseInt(month) > 12 || parseInt(month) < 1) {
      newErrors.expiry = 'Invalid expiry date';
    }

    // CVV validation (3 digits)
    if (formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    // Name validation
    if (formData.name.length < 3) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Address validation
    if (formData.address.length < 10) {
      newErrors.address = 'Please enter a complete address';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSuccess();
      alert('Payment successful! Thank you for your purchase.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }
    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Secure Checkout
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Complete your purchase securely
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CreditCard className="h-4 w-4" />
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="4242 4242 4242 4242"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-black focus:ring-black`}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4" />
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={`mt-1 block w-full rounded-lg border ${
                    errors.expiry ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-2 focus:border-black focus:ring-black`}
                />
                {errors.expiry && (
                  <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Lock className="h-4 w-4" />
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className={`mt-1 block w-full rounded-lg border ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-2 focus:border-black focus:ring-black`}
                />
                {errors.cvv && (
                  <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-black focus:ring-black`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-black focus:ring-black`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Shipping Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-black focus:ring-black`}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-t pt-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-black py-3 text-white font-semibold hover:bg-gray-800 transition-colors"
              >
                Pay ${total.toFixed(2)}
              </button>
              <p className="text-center text-xs text-gray-500">
                Your payment information is encrypted and secure
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}