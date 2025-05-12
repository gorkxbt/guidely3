"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiSend, FiShoppingBag, FiRefreshCw, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  products?: Product[];
};

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  rating: number;
};

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Noise-Cancelling Headphones",
    price: "$249.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Immersive sound with industry-leading noise cancellation",
    rating: 4.8
  },
  {
    id: "2",
    name: "Wireless Earbuds Pro",
    price: "$179.99",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Superior sound quality with active noise cancellation",
    rating: 4.6
  },
  {
    id: "3",
    name: "Over-Ear Studio Headphones",
    price: "$299.99",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Professional studio quality for audiophiles",
    rating: 4.9
  }
];

const productCategories = [
  "Headphones & Audio",
  "Smartphones & Accessories",
  "Laptops & Computers",
  "Cameras & Photography",
  "Gaming Equipment",
  "Smart Home Devices"
];

const DemoPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi there! I'm Guidely's shopping assistant. What kind of product are you looking for today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages: Message[] = [...messages, { text: input, sender: 'user' as const }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse: Message;
      
      // Simple pattern matching for demo purposes
      const userInput = input.toLowerCase();
      
      if (userInput.includes("headphone") || userInput.includes("earphone") || userInput.includes("audio")) {
        botResponse = { 
          text: "I found some great headphone options that match your needs. Here are my top recommendations:", 
          sender: 'bot',
          products: sampleProducts
        };
      } else if (userInput.includes("price") || userInput.includes("cost") || userInput.includes("budget")) {
        botResponse = { 
          text: "Our headphones range from $79.99 for basic models to $349.99 for premium noise-cancelling options. What's your budget range?", 
          sender: 'bot' 
        };
      } else if (userInput.includes("feature") || userInput.includes("best") || userInput.includes("recommend")) {
        botResponse = { 
          text: "When looking for the best headphones, consider factors like sound quality, noise cancellation, battery life, and comfort. What features are most important to you?", 
          sender: 'bot' 
        };
      } else {
        botResponse = { 
          text: "I'd be happy to help you find the perfect product. Could you tell me more about what you're looking for? Or you can select from popular categories below.", 
          sender: 'bot' 
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    // Add user message
    const newMessages: Message[] = [...messages, { text: `I'm looking for ${category}`, sender: 'user' as const }];
    setMessages(newMessages);
    setIsLoading(true);
    
    // Simulate bot response for headphones category
    setTimeout(() => {
      if (category === "Headphones & Audio") {
        setMessages(prev => [...prev, { 
          text: "Great choice! I found some excellent headphone options that our customers love. Here are my top recommendations:", 
          sender: 'bot',
          products: sampleProducts
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: `I'd be happy to help you find the perfect ${category} products. For this demo, let's focus on headphones. Here are some top options:`, 
          sender: 'bot',
          products: sampleProducts
        }]);
      }
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Scroll to the bottom of the chat when messages update
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Navbar />
      
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Guidely Demo</h1>
            <p className="text-xl text-gray-700">
              Interact with our AI shopping assistant to see how Guidely transforms product discovery
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="bg-primary text-white p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Guidely Assistant</h2>
                <span className="px-3 py-1 bg-white text-primary text-sm rounded-full">Demo Mode</span>
              </div>
              
              <motion.div 
                className="h-[500px] overflow-y-auto p-6 flex flex-col space-y-4"
                id="chat-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {messages.map((message, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
                  >
                    <div 
                      className={`p-4 rounded-xl ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-gray-100 rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                    
                    {/* Product recommendations */}
                    {message.products && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {message.products.map((product) => (
                          <motion.div 
                            key={product.id}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                          >
                            <div className="h-36 mb-3 rounded-lg overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-primary font-bold mt-1">{product.price}</p>
                            <div className="flex items-center mt-2">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                              ))}
                              <span className="text-xs ml-1 text-gray-600">{product.rating}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex items-center space-x-2 text-gray-500 max-w-[80%]">
                    <FiRefreshCw className="animate-spin" />
                    <span>Guidely is thinking...</span>
                  </div>
                )}
                
                {/* Category selection - shown after initial message */}
                {messages.length === 1 && !isLoading && (
                  <div className="mt-6">
                    <p className="text-gray-600 mb-3">Or select a category:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {productCategories.map((category) => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCategorySelect(category)}
                          className={`p-3 rounded-lg border flex items-center justify-center text-sm font-medium
                            ${selectedCategory === category 
                              ? 'bg-primary text-white border-primary' 
                              : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary transition-colors'
                            }`}
                        >
                          <FiShoppingBag className="mr-2" />
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              
              <div className="border-t border-gray-200 p-4">
                <div className="flex">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about products..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="bg-primary text-white p-3 rounded-r-lg hover:bg-secondary transition-colors disabled:opacity-70"
                  >
                    <FiSend className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Demo mode: Try asking about headphones, features, or pricing
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">About This Demo</h3>
              <p className="text-gray-700 mb-4">
                This is a simplified demonstration of Guidely's AI shopping assistant. In a real implementation, the system would:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process vast product catalogs from multiple retailers</li>
                <li>Provide personalized recommendations based on user preferences</li>
                <li>Understand complex natural language queries</li>
                <li>Learn from user interactions to improve future recommendations</li>
                <li>Integrate with e-commerce platforms for seamless purchasing</li>
              </ul>
              <div className="mt-6">
                <Link 
                  href="/documentation" 
                  className="text-primary font-medium hover:underline inline-flex items-center"
                >
                  Learn more about our technology <FiExternalLink className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default DemoPage; 