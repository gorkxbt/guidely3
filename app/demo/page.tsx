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
  isLoading?: boolean;
};

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  rating: number;
  source?: string;
  url?: string;
};

// API configuration
const API_CONFIGS = {
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  EBAY_API_KEY: process.env.NEXT_PUBLIC_EBAY_API_KEY || '',
  GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  GOOGLE_CSE_ID: process.env.NEXT_PUBLIC_GOOGLE_CSE_ID || '',
  RAPID_API_KEY: process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
}

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

// Added more product categories
const productCategories = [
  "Headphones & Audio",
  "Smartphones & Accessories",
  "Laptops & Computers",
  "Cameras & Photography",
  "Gaming Equipment",
  "Smart Home Devices",
  "Wearable Technology",
  "Fashion & Apparel",
  "Beauty & Personal Care"
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
  // Added state for product search results
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Function to send user message to LLM to generate response
  const processWithLLM = async (userMessage: string) => {
    try {
      // In a real implementation, this would use the OpenAI API key
      // For demo purposes, we'll simulate the LLM response
      
      // Simulate sending to OpenAI API
      console.log("Sending to LLM:", userMessage);
      
      // Detect product intent in user message
      const productKeywords = extractProductKeywords(userMessage);
      
      if (productKeywords) {
        // Search for products if keywords were found
        return searchProducts(productKeywords);
      } else {
        // Generic LLM response if no specific product intent
        return simulateLLMResponse(userMessage);
      }
    } catch (error) {
      console.error("Error processing with LLM:", error);
      return {
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'bot' as const
      };
    }
  };
  
  // Function to extract product keywords from user input
  const extractProductKeywords = (input: string): string | null => {
    const userInput = input.toLowerCase();
    
    // Basic keyword detection
    if (userInput.includes("headphone") || userInput.includes("earphone") || userInput.includes("audio")) {
      return "headphones";
    } else if (userInput.includes("smartphone") || userInput.includes("phone") || userInput.includes("iphone") || userInput.includes("samsung")) {
      return "smartphone";
    } else if (userInput.includes("laptop") || userInput.includes("computer") || userInput.includes("pc")) {
      return "laptop";
    } else if (userInput.includes("camera") || userInput.includes("photo") || userInput.includes("photography")) {
      return "camera";
    } else if (userInput.includes("gaming") || userInput.includes("game") || userInput.includes("console")) {
      return "gaming";
    } else if (userInput.includes("smart home") || userInput.includes("alexa") || userInput.includes("google home")) {
      return "smart home";
    }
    
    return null;
  };
  
  // Function to search for products using APIs
  const searchProducts = async (keyword: string): Promise<Message> => {
    // For the demo, we'll simulate API responses
    // In a real application, we would make actual API calls to eBay, Google Shopping, etc.
    try {
      // Simulate API calls to multiple sources
      const [ebayProducts, googleProducts, amazonProducts] = await Promise.all([
        simulateEbaySearch(keyword),
        simulateGoogleSearch(keyword),
        simulateAmazonSearch(keyword),
      ]);
      
      // Combine and sort products
      const allProducts = [...ebayProducts, ...googleProducts, ...amazonProducts]
        .sort(() => Math.random() - 0.5) // Random sort for demo purposes
        .slice(0, 3); // Limit to 3 products
      
      setSearchResults(allProducts);
      
      return {
        text: `I found some great ${keyword} options across different marketplaces. Here are my top recommendations:`,
        sender: 'bot',
        products: allProducts
      };
    } catch (error) {
      console.error("Error searching products:", error);
      return {
        text: "I'm sorry, I had trouble finding products matching your request. Could you try a different search?",
        sender: 'bot'
      };
    }
  };
  
  // Simulated API calls to different marketplaces
  const simulateEbaySearch = async (keyword: string): Promise<Product[]> => {
    // In a real implementation, this would use the eBay Finding API
    console.log("Searching eBay for:", keyword);
    
    // Simulate eBay response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (keyword === "headphones") {
      return [
        {
          id: "ebay-1",
          name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
          price: "$248.00",
          image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Industry-leading noise cancellation with premium sound",
          rating: 4.7,
          source: "eBay",
          url: "https://www.ebay.com"
        }
      ];
    }
    
    // Default response for other keywords
    return [
      {
        id: "ebay-default",
        name: `Premium ${keyword} on eBay`,
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: `Top-rated ${keyword} with fast shipping`,
        rating: 4.5,
        source: "eBay",
        url: "https://www.ebay.com"
      }
    ];
  };
  
  const simulateGoogleSearch = async (keyword: string): Promise<Product[]> => {
    // In a real implementation, this would use the Google Shopping API or Custom Search API
    console.log("Searching Google for:", keyword);
    
    // Simulate Google response delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (keyword === "headphones") {
      return [
        {
          id: "google-1",
          name: "Bose QuietComfort 45 Wireless Headphones",
          price: "$279.00",
          image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Legendary noise cancellation and premium comfort",
          rating: 4.6,
          source: "Google Shopping",
          url: "https://shopping.google.com"
        }
      ];
    }
    
    // Default response for other keywords
    return [
      {
        id: "google-default",
        name: `Best-selling ${keyword}`,
        price: "$249.99",
        image: "https://images.unsplash.com/photo-1628815113969-0487917fc601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: `Popular ${keyword} with excellent reviews`,
        rating: 4.8,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      }
    ];
  };
  
  const simulateAmazonSearch = async (keyword: string): Promise<Product[]> => {
    // In a real implementation, this would use Amazon Product Advertising API
    console.log("Searching Amazon for:", keyword);
    
    // Simulate Amazon response delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (keyword === "headphones") {
      return [
        {
          id: "amazon-1",
          name: "Apple AirPods Max",
          price: "$449.00",
          image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "High-fidelity audio with active noise cancellation",
          rating: 4.9,
          source: "Amazon",
          url: "https://www.amazon.com"
        }
      ];
    }
    
    // Default response for other keywords
    return [
      {
        id: "amazon-default",
        name: `Amazon Choice ${keyword}`,
        price: "$179.99",
        image: "https://images.unsplash.com/photo-1606318313496-46d5f224fd42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: `Amazon's choice for ${keyword}`,
        rating: 4.7,
        source: "Amazon",
        url: "https://www.amazon.com"
      }
    ];
  };
  
  // Simulate LLM response for non-product queries
  const simulateLLMResponse = async (userMessage: string): Promise<Message> => {
    const userInput = userMessage.toLowerCase();
    
    if (userInput.includes("price") || userInput.includes("cost") || userInput.includes("budget")) {
      return { 
        text: "I can help you find products in your price range. Our database includes options from budget-friendly to premium. What's your budget and what type of product are you looking for?", 
        sender: 'bot' 
      };
    } else if (userInput.includes("feature") || userInput.includes("best") || userInput.includes("recommend")) {
      return { 
        text: "I'd be happy to recommend products based on specific features. Some key considerations might include quality, durability, performance, and user reviews. What features are most important to you?", 
        sender: 'bot' 
      };
    } else if (userInput.includes("compare") || userInput.includes("difference") || userInput.includes("versus") || userInput.includes("vs")) {
      return { 
        text: "I can help you compare different products or brands. To provide the most helpful comparison, could you tell me which specific products or brands you're interested in?", 
        sender: 'bot' 
      };
    } else {
      return { 
        text: "I'd be happy to help you find the perfect product. Could you tell me more about what you're looking for? Or you can select from popular categories below.", 
        sender: 'bot' 
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' as const };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    
    // Add loading indicator
    setIsLoading(true);
    setMessages(prev => [...prev, { text: "", sender: 'bot', isLoading: true }]);
    
    try {
      // First, try to use our API routes if available
      let botResponse: Message;
      let productResults: Product[] = [];
      
      try {
        // Check for product intent
        const productKeywords = extractProductKeywords(input);
        
        if (productKeywords) {
          // Use the product search API
          const productResponse = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: productKeywords })
          });
          
          if (productResponse.ok) {
            const productData = await productResponse.json();
            productResults = productData.products;
          }
        }
        
        // Get LLM response
        const llmResponse = await fetch('/api/llm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input })
        });
        
        if (llmResponse.ok) {
          const llmData = await llmResponse.json();
          
          botResponse = {
            text: llmData.text,
            sender: 'bot'
          };
          
          // Add products if we found any
          if (productResults.length > 0) {
            botResponse.products = productResults;
          }
        } else {
          throw new Error('API response not ok');
        }
      } catch (apiError) {
        console.log("API error, using fallback:", apiError);
        // Fallback to simulated response
        botResponse = await simulateBotResponse(input);
      }
      
      // Remove loading message and add response
      setMessages(prev => prev.filter(msg => !msg.isLoading).concat(botResponse));
    } catch (error) {
      console.error("Error in handleSend:", error);
      // Handle error case
      setMessages(prev => prev.filter(msg => !msg.isLoading).concat({
        text: "I'm sorry, something went wrong. Please try again.",
        sender: 'bot'
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fallback function for simulated responses when API is not available
  const simulateBotResponse = async (userInput: string): Promise<Message> => {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const input = userInput.toLowerCase();
    
    // Check for product intent
    const productKeywords = extractProductKeywords(input);
    
    if (productKeywords) {
      // Return with simulated product data
      return {
        text: `I found some great ${productKeywords} options across different marketplaces. Here are my top recommendations:`,
        sender: 'bot',
        products: sampleProducts
      };
    } else if (input.includes("price") || input.includes("cost") || input.includes("budget")) {
      return { 
        text: "I can help you find products in your price range. Our database includes options from budget-friendly to premium. What's your budget and what type of product are you looking for?", 
        sender: 'bot' 
      };
    } else if (input.includes("feature") || input.includes("best") || input.includes("recommend")) {
      return { 
        text: "I'd be happy to recommend products based on specific features. Some key considerations might include quality, durability, performance, and user reviews. What features are most important to you?", 
        sender: 'bot' 
      };
    } else {
      return { 
        text: "I'd be happy to help you find the perfect product. Could you tell me more about what you're looking for? Or you can select from popular categories below.", 
        sender: 'bot' 
      };
    }
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    
    // Add user message
    const userMessage = { text: `I'm looking for ${category}`, sender: 'user' as const };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    
    // Add loading indicator
    setIsLoading(true);
    setMessages(prev => [...prev, { text: "", sender: 'bot', isLoading: true }]);
    
    try {
      // Simple category to keyword mapping
      const keywordMap: {[key: string]: string} = {
        "Headphones & Audio": "headphones",
        "Smartphones & Accessories": "smartphone",
        "Laptops & Computers": "laptop",
        "Cameras & Photography": "camera",
        "Gaming Equipment": "gaming console",
        "Smart Home Devices": "smart home",
        "Wearable Technology": "smartwatch",
        "Fashion & Apparel": "fashion",
        "Beauty & Personal Care": "beauty"
      };
      
      const keyword = keywordMap[category] || category.split(' ')[0].toLowerCase();
      
      // Try to use API first
      try {
        const productResponse = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: keyword })
        });
        
        if (productResponse.ok) {
          const productData = await productResponse.json();
          
          // Remove loading message and add response with products
          setMessages(prev => prev.filter(msg => !msg.isLoading).concat({
            text: `Great choice! I found some excellent ${category} options. Here are my top recommendations:`,
            sender: 'bot',
            products: productData.products
          }));
        } else {
          throw new Error('Product API error');
        }
      } catch (apiError) {
        console.log("API error, using fallback:", apiError);
        // Fallback to simulated product response
        if (keyword === "headphones") {
          setMessages(prev => prev.filter(msg => !msg.isLoading).concat({ 
            text: `Great choice! I found some excellent ${category} options. Here are my top recommendations:`, 
            sender: 'bot',
            products: sampleProducts
          }));
        } else {
          setMessages(prev => prev.filter(msg => !msg.isLoading).concat({ 
            text: `I'd be happy to help you find the perfect ${category} products. For this demo, let's focus on headphones since they're our most popular category. Here are some top options:`, 
            sender: 'bot',
            products: sampleProducts
          }));
        }
      }
    } catch (error) {
      console.error("Error in handleCategorySelect:", error);
      // Handle error case
      setMessages(prev => prev.filter(msg => !msg.isLoading).concat({
        text: "I'm sorry, something went wrong. Please try again.",
        sender: 'bot'
      }));
    } finally {
      setIsLoading(false);
    }
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
                            <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                            <p className="text-primary font-bold mt-1">{product.price}</p>
                            
                            {/* Source badge */}
                            {product.source && (
                              <div className="mt-2 inline-block bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600">
                                From {product.source}
                              </div>
                            )}
                            
                            <div className="flex items-center mt-2">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                              ))}
                              <span className="text-xs ml-1 text-gray-600">{product.rating}</span>
                            </div>
                            
                            {/* View product link */}
                            {product.url && (
                              <a 
                                href={product.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-3 text-primary text-sm font-medium flex items-center hover:underline"
                              >
                                View product <FiExternalLink className="ml-1 h-3 w-3" />
                              </a>
                            )}
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
                
                {/* Category selection with expanded categories */}
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
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex flex-col md:flex-row gap-4 mb-3">
                  <p className="text-sm text-gray-500">
                    Powered by AI with real-time product data from 
                    <span className="font-medium"> Google Shopping</span>, 
                    <span className="font-medium"> eBay</span>, and 
                    <span className="font-medium"> Amazon</span>
                  </p>
                  <div className="text-xs text-gray-400 md:ml-auto">Demo Mode</div>
                </div>
                <div className="flex">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me about products you're looking for..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className={`bg-primary text-white px-6 rounded-r-lg hover:bg-opacity-90 transition-colors flex items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
                  >
                    {isLoading ? <FiRefreshCw className="animate-spin w-5 h-5" /> : <FiSend className="w-5 h-5" />}
                  </button>
                </div>
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