"use client";

import React from 'react';
import { FiStar } from 'react-icons/fi';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Guidely changed the way our customers shop. Our sales and satisfaction scores have never been higher.",
      name: "Jamie L.",
      title: "E-commerce Director",
      stars: 5
    },
    {
      quote: "I found exactly what I wanted in minutes. Shopping online finally feels personal.",
      name: "Priya S.",
      title: "Shopper",
      stars: 5
    },
    {
      quote: "The integration was seamless and the results were immediate. Our conversion rate went up 37% in the first month.",
      name: "Mark T.",
      title: "CTO, Fashion Retailer",
      stars: 5
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Users Say</h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl">
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg mb-6">"{testimonial.quote}"</blockquote>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 