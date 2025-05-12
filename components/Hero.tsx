"use client";

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Shop Smarter. Discover Faster.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10">
            Guidely transforms online shopping with AI-guided experiences that understand your needs and deliver the perfect products—every time.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link href="#contact" className="btn-primary text-center">
              Get Started
            </Link>
            <Link href="#demo" className="btn-secondary text-center">
              Try Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 