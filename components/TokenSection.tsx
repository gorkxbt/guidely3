"use client";

import React from 'react';
import { FiCreditCard, FiPercent, FiShield } from 'react-icons/fi';

const TokenSection = () => {
  const tokenFeatures = [
    {
      icon: <FiCreditCard className="w-8 h-8 text-primary" />,
      title: "Flexible Payment Options",
      description: "Pay for your Guidely subscription with a credit card or with our native $GLY token."
    },
    {
      icon: <FiPercent className="w-8 h-8 text-primary" />,
      title: "Save 20% with GLY",
      description: "Choose $GLY at checkout and enjoy a 20% discount on your subscription—rewarding you for being part of our ecosystem."
    },
    {
      icon: <FiShield className="w-8 h-8 text-primary" />,
      title: "Secure & Seamless",
      description: "All transactions are fast, secure, and easy to manage from your Guidely dashboard."
    }
  ];

  return (
    <section className="section bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Payments & $GLY Token</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Save on your subscription by using our native token
        </p>
        
        <div className="grid md:grid-cols-3 gap-10">
          {tokenFeatures.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="px-6 py-3 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            Learn more about $GLY
          </a>
        </div>
      </div>
    </section>
  );
};

export default TokenSection; 