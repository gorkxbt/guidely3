"use client";

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Guidely
        </Link>
        
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
        </div>
        
        <div className="flex space-x-4">
          <Link href="#demo" className="btn-secondary hidden md:inline-block">
            Try Demo
          </Link>
          <Link href="#contact" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 