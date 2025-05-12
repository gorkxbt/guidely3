"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-40 right-10 w-64 h-64 rounded-full bg-primary opacity-5"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary opacity-5"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -10, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/4 w-48 h-48 rounded-full bg-accent opacity-5"
        animate={{ 
          scale: [1, 1.5, 1],
          x: [0, 40, 0],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shop Smarter. <br />Discover Faster.
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Guidely transforms online shopping with AI-guided experiences that understand your needs and deliver the perfect products—every time.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="#contact" className="btn-primary text-center group flex items-center justify-center">
              Get Started <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/demo" className="btn-secondary text-center flex items-center justify-center group">
              <FiPlay className="mr-2 group-hover:scale-110 transition-transform" /> Try Demo
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-sm text-gray-500 font-medium mr-4">Trusted by innovative brands:</p>
            <div className="flex flex-wrap justify-center gap-8">
              <span className="text-gray-400 font-bold text-lg">ACME</span>
              <span className="text-gray-400 font-bold text-lg">GLOBEX</span>
              <span className="text-gray-400 font-bold text-lg">STARK IND</span>
              <span className="text-gray-400 font-bold text-lg">WAYSTAR</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 