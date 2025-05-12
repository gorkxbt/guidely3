"use client";

import React, { useState, KeyboardEvent } from 'react';
import { FiSend } from 'react-icons/fi';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

const Demo = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm Guidely's shopping assistant. What kind of product are you looking for today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");

  const demoResponses = [
    "I can help you find the perfect product! Could you tell me what features are most important to you?",
    "Based on your preferences, I'd recommend checking out our premium collection. They have exactly what you're looking for.",
    "Great choice! Would you like me to show you similar items that might also interest you?",
    "I've found some matching products in your preferred price range. Would you like to see them sorted by popularity or rating?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages: Message[] = [...messages, { text: input, sender: 'user' as const }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' as const }]);
    }, 1000);
  };

  return (
    <section id="demo" className="section bg-gray-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Try the Demo</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Experience how Guidely helps shoppers find exactly what they need
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-primary text-white">
            <h3 className="font-medium">Guidely Assistant</h3>
          </div>
          
          <div className="h-96 p-4 overflow-y-auto flex flex-col space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`max-w-3/4 p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-100 ml-auto' 
                    : 'bg-gray-100'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200 flex">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about a product..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              onClick={handleSend}
              className="bg-primary text-white p-2 rounded-r-lg hover:bg-secondary transition-colors"
            >
              <FiSend className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo; 