"use client";

import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Understands Every Shopper",
      description: "Guidely's AI learns each customer's preferences, style, and intent in real time."
    },
    {
      number: "2",
      title: "Processes Vast Catalogs Instantly",
      description: "Our technology scans and organizes your entire product range, surfacing the most relevant options for every visitor."
    },
    {
      number: "3",
      title: "Delivers Guided Experiences",
      description: "Shoppers interact with a conversational AI that asks the right questions and recommends the right products—no more guesswork."
    }
  ];

  return (
    <section id="how-it-works" className="section bg-gray-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How Guidely Works</h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="absolute left-0 top-0 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {step.number}
              </div>
              <div className="pl-20">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 