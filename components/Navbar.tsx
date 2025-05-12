"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Guidely
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="#features" className="font-medium text-gray-600 hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="font-medium text-gray-600 hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="font-medium text-gray-600 hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/documentation" className="font-medium text-gray-600 hover:text-primary transition-colors">
            Documentation
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-4">
          <Link href="/demo" className="btn-secondary">
            Try Demo
          </Link>
          <Link href="#contact" className="btn-primary">
            Get Started
          </Link>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4">
            <Link href="#features" className="font-medium text-gray-600 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="font-medium text-gray-600 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="font-medium text-gray-600 hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/documentation" className="font-medium text-gray-600 hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link href="/demo" className="btn-secondary text-center">
              Try Demo
            </Link>
            <Link href="#contact" className="btn-primary text-center">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 