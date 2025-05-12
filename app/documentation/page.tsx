"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiChevronDown, FiChevronRight, FiExternalLink, FiDownload, FiArrowRight, FiBookOpen, FiTarget, FiCpu, FiDollarSign, FiMap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Documentation = () => {
  const [openSection, setOpenSection] = useState<string | null>("introduction");
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  // Detect which section is currently in view for scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Get all section elements
      const sections = document.querySelectorAll('section[id]');
      
      // Find the current section based on scroll position
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || "";
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
          // Auto-expand the current section in the sidebar
          const mainSection = sectionId.split('-')[0];
          if (openSection !== mainSection) {
            setOpenSection(mainSection);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openSection]);

  return (
    <>
      <Navbar />
      
      {/* Header section - with animations */}
      <motion.div 
        className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Technical Documentation
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-700 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Learn how Guidely transforms e-commerce through AI-powered guided shopping experiences
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button className="btn-primary inline-flex items-center group">
                <FiDownload className="mr-2 group-hover:scale-110 transition-transform" />
                Download PDF
              </button>
              <Link href="/demo" className="btn-secondary inline-flex items-center group">
                <FiExternalLink className="mr-2 group-hover:scale-110 transition-transform" />
                Try Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Sidebar - Navigation with animations */}
          <motion.div 
            className="md:col-span-3 bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold text-xl mb-6 text-primary">Contents</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => toggleSection("introduction")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("introduction") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiBookOpen className="mr-3" />
                  <span>Introduction</span>
                  {openSection === "introduction" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "introduction" ? "auto" : 0,
                    opacity: openSection === "introduction" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#introduction-vision" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "introduction-vision" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Vision
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#introduction-market-opportunity" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "introduction-market-opportunity" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Market Opportunity
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#introduction-solution-overview" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "introduction-solution-overview" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Solution Overview
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("market-analysis")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("market-analysis") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiTarget className="mr-3" />
                  <span>Market Analysis</span>
                  {openSection === "market-analysis" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "market-analysis" ? "auto" : 0,
                    opacity: openSection === "market-analysis" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#market-analysis-target-market" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "market-analysis-target-market" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Target Market
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#market-analysis-market-size" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "market-analysis-market-size" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Market Size
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#market-analysis-competitive-landscape" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "market-analysis-competitive-landscape" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Competitive Landscape
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("problem")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("problem") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiTarget className="mr-3" />
                  <span>Problem Statement</span>
                  {openSection === "problem" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "problem" ? "auto" : 0,
                    opacity: openSection === "problem" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#problem-shopper" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "problem-shopper" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Shopper Challenges
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#problem-retailer" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "problem-retailer" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Retailer Challenges
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#problem-solution" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "problem-solution" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        The Guidely Solution
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("technical")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("technical") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiCpu className="mr-3" />
                  <span>Technical Architecture</span>
                  {openSection === "technical" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "technical" ? "auto" : 0,
                    opacity: openSection === "technical" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#technical-ai-engine" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "technical-ai-engine" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        AI Engine
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#technical-product-catalog" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "technical-product-catalog" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Product Catalog Processor
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#technical-conversational" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "technical-conversational" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Conversational Interface
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#technical-analytics" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "technical-analytics" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Analytics Dashboard
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#technical-payment" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "technical-payment" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Payment Gateway
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("features")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("features") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiCpu className="mr-3" />
                  <span>Platform Features</span>
                  {openSection === "features" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "features" ? "auto" : 0,
                    opacity: openSection === "features" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#features-ai" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "features-ai" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        AI Shopping Assistant
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#features-personalization" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "features-personalization" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Real-Time Personalization
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#features-catalog" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "features-catalog" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Catalog Management
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#features-analytics" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "features-analytics" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Analytics
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#features-payment" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "features-payment" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Payment Options
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("token")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("token") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiDollarSign className="mr-3" />
                  <span>$GLY Token Economy</span>
                  {openSection === "token" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "token" ? "auto" : 0,
                    opacity: openSection === "token" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#token-overview" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "token-overview" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Token Overview
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#token-distribution" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "token-distribution" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Token Distribution
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#token-utility" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "token-utility" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Token Utility
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#token-tokenomics" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "token-tokenomics" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Tokenomics
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("business")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("business") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiDollarSign className="mr-3" />
                  <span>Business Model</span>
                  {openSection === "business" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "business" ? "auto" : 0,
                    opacity: openSection === "business" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#business-revenue" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "business-revenue" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Revenue Streams
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#business-pricing" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "business-pricing" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Pricing Strategy
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#business-projections" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "business-projections" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Financial Projections
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("implementation")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("implementation") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiMap className="mr-3" />
                  <span>Implementation Strategy</span>
                  {openSection === "implementation" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "implementation" ? "auto" : 0,
                    opacity: openSection === "implementation" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#implementation-roadmap" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "implementation-roadmap" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Development Roadmap
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#implementation-marketing" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "implementation-marketing" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Marketing Strategy
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#implementation-sales" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "implementation-sales" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Sales Strategy
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("roadmap")} 
                  className={`flex items-center w-full text-left font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg ${activeSection.startsWith("roadmap") ? 'bg-indigo-50 text-primary' : ''}`}
                >
                  <FiMap className="mr-3" />
                  <span>Roadmap</span>
                  {openSection === "roadmap" ? <FiChevronDown className="ml-auto" /> : <FiChevronRight className="ml-auto" />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openSection === "roadmap" ? "auto" : 0,
                    opacity: openSection === "roadmap" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    <li>
                      <a 
                        href="#roadmap-short-term" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "roadmap-short-term" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Short-Term Goals
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#roadmap-mid-term" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "roadmap-mid-term" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Mid-Term Goals
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#roadmap-long-term" 
                        className={`block py-1 px-3 rounded-md ${activeSection === "roadmap-long-term" ? 'bg-indigo-100 text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        Long-Term Goals
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-medium text-primary mb-2">Need help?</h4>
              <p className="text-sm text-gray-600 mb-3">Have questions about our technology or implementation details?</p>
              <a href="#contact" className="text-primary text-sm font-medium flex items-center hover:underline">
                Contact our team <FiArrowRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="md:col-span-9 bg-white p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-lg max-w-none">
              {/* Abstract Section */}
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-12">
                <h2 className="text-2xl font-bold mb-4 text-primary">Abstract</h2>
                <p className="mb-4">
                  Guidely represents a paradigm shift in e-commerce, introducing an AI-powered platform that transforms traditional product browsing into intelligent, guided shopping experiences. By leveraging advanced machine learning algorithms and natural language processing, Guidely processes vast product catalogs to deliver hyper-personalized recommendations through a conversational interface.
                </p>
                <p>
                  Our platform addresses the growing complexity of online shopping by understanding individual shopper intent, processing extensive product data, and delivering tailored recommendations in real-time. The integration of the $GLY token creates a sustainable ecosystem that rewards platform adoption while providing tangible benefits to subscribers.
                </p>
              </div>
              
              {/* Introduction Section */}
              <section id="introduction" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiBookOpen className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">1. Introduction</h2>
                </div>
                
                <section id="introduction-vision" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">1.1 Vision</h3>
                  <div className="pl-4 border-l-4 border-primary py-1">
                    <p className="mb-6">
                      Guidely aims to revolutionize e-commerce by eliminating decision fatigue and creating personalized shopping journeys that convert browsers into confident buyers. Our platform leverages cutting-edge AI to understand both products and people, creating a bridge between intent and discovery.
                    </p>
                  </div>
                </section>
                
                <section id="introduction-market-opportunity" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">1.2 Market Opportunity</h3>
                  <p className="mb-4">The global e-commerce market faces significant challenges:</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">69%</div>
                      <div className="text-gray-700">of shopping carts are abandoned</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">42%</div>
                      <div className="text-gray-700">of shoppers leave due to too many choices</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">73%</div>
                      <div className="text-gray-700">of consumers expect personalized experiences</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">$18B</div>
                      <div className="text-gray-700">lost annually to poor product discovery</div>
                    </div>
                  </div>
                </section>
                
                <section id="introduction-solution-overview" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">1.3 Solution Overview</h3>
                  <p className="mb-4">Guidely addresses these challenges through:</p>
                  <ul className="list-none pl-0 mb-6 space-y-3">
                    {[
                      "AI-powered conversational shopping interfaces",
                      "Real-time personalization engines",
                      "Dynamic product catalog processing",
                      "Intelligent recommendation systems",
                      "Blockchain-based subscription model with $GLY token"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                          <span>{index + 1}</span>
                        </div>
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </section>
              
              {/* Problem Statement Section */}
              <section id="problem" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiTarget className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">2. Problem Statement</h2>
                </div>
                
                <section id="problem-shopper" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">2.1 Shopper Challenges</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Information Overload:</strong> Too many choices lead to decision paralysis.</li>
                    <li><strong>Lack of Personalization:</strong> Generic recommendations fail to meet individual needs.</li>
                    <li><strong>Inefficient Discovery:</strong> Traditional search methods are time-consuming and often ineffective.</li>
                    <li><strong>Abandoned Carts:</strong> Frustration and indecision result in lost sales.</li>
                  </ul>
                </section>
                
                <section id="problem-retailer" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">2.2 Retailer Challenges</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Low Conversion Rates:</strong> Inability to convert browsers into buyers.</li>
                    <li><strong>Poor Product Visibility:</strong> Difficulty surfacing relevant products to the right customers.</li>
                    <li><strong>Limited Customer Insights:</strong> Lack of understanding of shopper behavior and preferences.</li>
                    <li><strong>High Customer Acquisition Costs:</strong> Inefficient marketing spend due to poor targeting.</li>
                  </ul>
                </section>
                
                <section id="problem-solution" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">2.3 The Guidely Solution</h3>
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <p className="mb-3">Guidely addresses these challenges by:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Reducing information overload through guided discovery.</li>
                      <li>Delivering hyper-personalized recommendations in real-time.</li>
                      <li>Creating an engaging, conversational shopping experience.</li>
                      <li>Providing retailers with actionable insights and seamless integration.</li>
                    </ul>
                  </div>
                </section>
              </section>
              
              {/* Market Analysis Section */}
              <section id="market-analysis" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiTarget className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">3. Market Analysis</h2>
                </div>
                
                <section id="market-analysis-target-market" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">3.1 Target Market</h3>
                  <p className="mb-4">Primary segments:</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                      <div className="text-gray-700">E-commerce retailers ($500K-$50M annual revenue)</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                      <div className="text-gray-700">D2C brands seeking personalization</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                      <div className="text-gray-700">Marketplace operators</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                      <div className="text-gray-700">Specialty retailers with complex product catalogs</div>
                    </div>
                  </div>
                </section>
                
                <section id="market-analysis-market-size" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">3.2 Market Size</h3>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 bg-gradient-to-r from-indigo-500 to-primary text-white p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">$50B</div>
                      <div>Total Addressable Market (TAM)</div>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-primary to-indigo-500 text-white p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">$15B</div>
                      <div>Serviceable Addressable Market (SAM)</div>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-indigo-400 to-primary text-white p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">$3B</div>
                      <div>Serviceable Obtainable Market (SOM)</div>
                    </div>
                  </div>
                </section>
                
                <section id="market-analysis-competitive-landscape" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">3.3 Competitive Landscape</h3>
                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Current Solutions</h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Traditional search/filter systems</li>
                        <li>Basic recommendation engines</li>
                        <li>Rule-based personalization tools</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Guidely's Advantages</h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Advanced AI understanding of user intent</li>
                        <li>Real-time catalog processing</li>
                        <li>Conversational interface</li>
                        <li>Token-based subscription model</li>
                        <li>Seamless integration capabilities</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Differentiator</h4>
                    <p>Unlike competitors who focus solely on product recommendations, Guidely creates a complete guided shopping journey that leads users from initial interest to confident purchase decisions through intelligent conversation.</p>
                  </div>
                </section>
              </section>
              
              {/* Technical Architecture Section */}
              <section id="technical" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiCpu className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">4. Technical Architecture</h2>
                </div>
                
                <p className="mb-6 text-lg">
                  Guidely's platform is built on three core technology pillars that work together to deliver personalized shopping experiences:
                </p>
                
                <section id="technical-ai-engine" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">4.1 AI Engine</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <h4 className="font-semibold mb-3">Natural Language Understanding (NLU)</h4>
                      <p className="text-gray-700 mb-4">Processes shopper queries and intent using transformer-based models.</p>
                      
                      <h4 className="font-semibold mb-3">Machine Learning (ML)</h4>
                      <p className="text-gray-700 mb-4">Employs collaborative filtering, content-based filtering, and deep learning for real-time personalization.</p>
                      
                      <h4 className="font-semibold mb-3">Knowledge Graph</h4>
                      <p className="text-gray-700">Organizes product data and relationships for intelligent recommendations.</p>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 text-sm">
                      <p><strong>Tech Stack:</strong> PyTorch, TensorFlow, BERT, GPT, SpaCy, Neo4j</p>
                    </div>
                  </div>
                </section>
                
                <section id="technical-product-catalog" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">4.2 Product Catalog Processor</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <h4 className="font-semibold mb-3">Data Ingestion</h4>
                      <p className="text-gray-700 mb-4">Scalable ingestion of product data from various sources (APIs, CSV, XML).</p>
                      
                      <h4 className="font-semibold mb-3">Data Enrichment</h4>
                      <p className="text-gray-700 mb-4">Automated enrichment of product data with attributes, tags, and metadata.</p>
                      
                      <h4 className="font-semibold mb-3">Indexing</h4>
                      <p className="text-gray-700">Real-time indexing of product data for fast, accurate search and recommendations.</p>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 text-sm">
                      <p><strong>Tech Stack:</strong> Elasticsearch, MongoDB, Apache Kafka, AWS S3, Google BigQuery</p>
                    </div>
                  </div>
                </section>
                
                <section id="technical-conversational" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">4.3 Conversational Interface</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <h4 className="font-semibold mb-3">Multi-Platform Support</h4>
                      <p className="text-gray-700 mb-4">Web, mobile, chatbots, voice assistants.</p>
                      
                      <h4 className="font-semibold mb-3">Adaptive Dialogue Flows</h4>
                      <p className="text-gray-700 mb-4">Dynamic dialogue flows based on shopper intent and preferences.</p>
                      
                      <h4 className="font-semibold mb-3">Personalized Recommendations</h4>
                      <p className="text-gray-700">Real-time recommendations displayed within the conversational interface.</p>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 text-sm">
                      <p><strong>Tech Stack:</strong> React, Next.js, TypeScript, WebSockets, Dialogflow, Amazon Lex</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">Implementation Note</h4>
                    <p>Our architecture is designed for horizontal scaling, allowing for rapid expansion as user demand grows. The system can handle millions of concurrent users while maintaining sub-second response times.</p>
                  </div>
                </section>
                
                <section id="technical-analytics" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">4.4 Analytics Dashboard</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <h4 className="font-semibold mb-3">Real-Time Tracking</h4>
                      <p className="text-gray-700 mb-4">Engagement, conversion, product trends, and $GLY token usage.</p>
                      
                      <h4 className="font-semibold mb-3">Actionable Insights</h4>
                      <p className="text-gray-700 mb-4">Shopper behavior, product performance, and marketing effectiveness.</p>
                      
                      <h4 className="font-semibold mb-3">Customizable Reports</h4>
                      <p className="text-gray-700">Tailored reports for retailers to optimize their strategies.</p>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 text-sm">
                      <p><strong>Tech Stack:</strong> Grafana, Tableau, Google Analytics, BigQuery</p>
                    </div>
                  </div>
                </section>
                
                <section id="technical-payment" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">4.5 Payment Gateway</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <h4 className="font-semibold mb-3">Credit Card Processing</h4>
                      <p className="text-gray-700 mb-4">Integration with leading payment processors (Stripe, PayPal).</p>
                      
                      <h4 className="font-semibold mb-3">$GLY Token Integration</h4>
                      <p className="text-gray-700 mb-4">Secure, seamless transactions using blockchain technology.</p>
                      
                      <h4 className="font-semibold mb-3">Automated Conversion</h4>
                      <p className="text-gray-700">Real-time conversion of $GLY to USD with discount application.</p>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 text-sm">
                      <p><strong>Tech Stack:</strong> Stripe API, PayPal API, Solana SDK, Web3.js</p>
                    </div>
                  </div>
                </section>
              </section>
              
              {/* Add Platform Features Section */}
              <section id="features" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiCpu className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">5. Platform Features</h2>
                </div>
                
                <section id="features-ai" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">5.1 Conversational AI Shopping Assistant</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold mb-2">Natural Language Processing (NLP)</h4>
                      <p className="text-gray-700">Understands shopper queries and intent with advanced NLP models.</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold mb-2">Personalized Recommendations</h4>
                      <p className="text-gray-700">Delivers tailored product recommendations based on individual preferences.</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold mb-2">Guided Discovery</h4>
                      <p className="text-gray-700">Leads shoppers through a conversational journey to find perfect products.</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h4 className="font-semibold mb-2">Multi-Language Support</h4>
                      <p className="text-gray-700">Available in multiple languages to cater to a global audience.</p>
                    </div>
                  </div>
                </section>
                
                <section id="features-personalization" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">5.2 Real-Time Personalization</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Behavioral Analysis</h4>
                          <p className="text-gray-700 mb-4">Tracks shopper behavior to understand preferences and intent.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Collaborative Filtering</h4>
                          <p className="text-gray-700 mb-4">Recommends products based on the behavior of similar shoppers.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Content-Based Filtering</h4>
                          <p className="text-gray-700 mb-4">Recommends products based on product attributes and shopper preferences.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Dynamic Pricing</h4>
                          <p className="text-gray-700">Adapts pricing based on shopper behavior and market conditions.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="features-catalog" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">5.3 Scalable Catalog Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Automated Data Ingestion</h4>
                      <p className="text-gray-700">Ingests product data from various sources.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Data Enrichment</h4>
                      <p className="text-gray-700">Enriches product data with attributes, tags, and metadata.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Real-Time Indexing</h4>
                      <p className="text-gray-700">Indexes product data for fast search and recommendations.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Product Categorization</h4>
                      <p className="text-gray-700">Automatically categorizes products for easy navigation.</p>
                    </div>
                  </div>
                </section>
                
                <section id="features-analytics" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">5.4 Insightful Analytics</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Real-Time Tracking</h4>
                          <p className="text-gray-700">Tracks engagement, conversion, product trends, and token usage.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Actionable Insights</h4>
                          <p className="text-gray-700">Provides insights into shopper behavior and product performance.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Customizable Reports</h4>
                          <p className="text-gray-700">Allows creation of tailored reports to optimize strategies.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">A/B Testing</h4>
                          <p className="text-gray-700">Enables testing different strategies to improve performance.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="features-payment" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">5.5 Flexible Payment Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Credit Card Processing</h4>
                      <p className="text-gray-700">Integrates with leading payment processors.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">$GLY Token Integration</h4>
                      <p className="text-gray-700">Supports secure transactions using blockchain technology.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Automated Conversion</h4>
                      <p className="text-gray-700">Converts $GLY to USD in real-time with discount.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Subscription Management</h4>
                      <p className="text-gray-700">Manages subscriptions and payments for retailers.</p>
                    </div>
                  </div>
                </section>
              </section>
              
              {/* Token Economy Section - updated with 6.4 */}
              <section id="token" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiDollarSign className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">6. $GLY Token Economy</h2>
                </div>
                
                <section id="token-overview" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">6.1 Token Overview</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-600 mb-1">Token Name</div>
                      <div className="font-bold">Guidely Token</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-600 mb-1">Token Symbol</div>
                      <div className="font-bold">$GLY</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-600 mb-1">Token Type</div>
                      <div className="font-bold">Utility Token</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-600 mb-1">Blockchain</div>
                      <div className="font-bold">Solana</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-600 mb-1">Launch Platform</div>
                      <div className="font-bold">Pumpfun</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-600 mb-1">Total Supply</div>
                      <div className="font-bold">100,000,000 $GLY</div>
                    </div>
                  </div>
                </section>
                
                <section id="token-distribution" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">6.2 Token Distribution</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center">
                      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mr-4">
                        5%
                      </div>
                      <div>
                        <h4 className="font-semibold">Team & Advisors</h4>
                        <p className="text-gray-600">Reserved for team members and strategic advisors</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mr-4">
                        95%
                      </div>
                      <div>
                        <h4 className="font-semibold">Liquidity Pool / Bonding Curve</h4>
                        <p className="text-gray-600">Available on Pumpfun for public trading</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="token-utility" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">6.3 Token Utility</h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-5">
                      <div className="text-primary text-xl font-bold mb-2">20% Discount</div>
                      <h4 className="font-semibold mb-2">Subscription Payments</h4>
                      <p className="text-gray-600">Pay for Guidely subscriptions at a 20% discount compared to fiat payments.</p>
                    </div>
                    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-5">
                      <div className="text-primary text-xl font-bold mb-2">Premium Access</div>
                      <h4 className="font-semibold mb-2">Exclusive Features</h4>
                      <p className="text-gray-600">Unlock exclusive features and early product releases before they're widely available.</p>
                    </div>
                    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-5">
                      <div className="text-primary text-xl font-bold mb-2">Future Governance</div>
                      <h4 className="font-semibold mb-2">Platform Direction</h4>
                      <p className="text-gray-600">Potential future participation in platform governance (subject to community vote).</p>
                    </div>
                  </div>
                  <div className="p-5 border border-primary rounded-lg bg-indigo-50">
                    <h4 className="font-semibold mb-2">Deflationary Mechanism</h4>
                    <p>$GLY tokens used to pay for subscriptions on the Guidely platform are burned, reducing the total supply and creating deflationary pressure over time.</p>
                  </div>
                </section>
                
                <section id="token-tokenomics" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">6.4 Tokenomics</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Inflation Rate</h4>
                          <p className="text-gray-700">0% (Deflationary)</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Burning Mechanism</h4>
                          <p className="text-gray-700">$GLY tokens used for subscriptions are burned, reducing total supply and creating deflationary pressure.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
              
              {/* Business Model Section */}
              <section id="business" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiDollarSign className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">7. Business Model</h2>
                </div>
                
                <section id="business-revenue" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">7.1 Revenue Streams</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Subscription Fees</h4>
                      <p className="text-gray-700">Recurring revenue from retailers using Guidely's platform.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">$GLY Token Sales</h4>
                      <p className="text-gray-700">Initial token sales to fund development and marketing.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Premium Features</h4>
                      <p className="text-gray-700">Additional revenue from premium features and add-ons.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Marketplace Partnerships</h4>
                      <p className="text-gray-700">Revenue sharing from marketplace partnerships.</p>
                    </div>
                  </div>
                </section>
                
                <section id="business-pricing" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">7.2 Pricing Strategy</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Tiered Pricing</h4>
                          <p className="text-gray-700">Different pricing tiers based on usage and features.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">$GLY Discount</h4>
                          <p className="text-gray-700">20% discount for paying with $GLY tokens.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Custom Pricing</h4>
                          <p className="text-gray-700">Custom pricing for enterprise clients with specific needs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="business-projections" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">7.3 Financial Projections</h3>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 bg-gradient-to-r from-indigo-500 to-primary text-white p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">$1M</div>
                      <div>Year 1 Revenue</div>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-primary to-indigo-500 text-white p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">$10M</div>
                      <div>Year 3 Revenue</div>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-indigo-400 to-primary text-white p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">$50M</div>
                      <div>Year 5 Revenue</div>
                    </div>
                  </div>
                </section>
              </section>
              
              {/* Implementation Strategy Section */}
              <section id="implementation" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiMap className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">8. Implementation Strategy</h2>
                </div>
                
                <section id="implementation-roadmap" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">8.1 Development Roadmap</h3>
                  <div className="relative border-l-4 border-primary pl-8 pb-8">
                    <div className="absolute left-0 top-0 w-4 h-4 -ml-[10px] bg-primary rounded-full"></div>
                    <h4 className="font-semibold mb-3">Phase 1</h4>
                    <p className="mb-4">Platform launch, $GLY token integration, core analytics.</p>
                    
                    <div className="absolute left-0 top-[100px] w-4 h-4 -ml-[10px] bg-primary rounded-full"></div>
                    <h4 className="font-semibold mb-3 mt-8">Phase 2</h4>
                    <p className="mb-4">Multi-language support, advanced personalization, mobile SDK.</p>
                    
                    <div className="absolute left-0 top-[200px] w-4 h-4 -ml-[10px] bg-primary rounded-full"></div>
                    <h4 className="font-semibold mb-3 mt-8">Phase 3</h4>
                    <p className="mb-4">Marketplace partnerships, loyalty rewards, API for third-party integrations.</p>
                  </div>
                </section>
                
                <section id="implementation-marketing" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">8.2 Marketing Strategy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Content Marketing</h4>
                      <p className="text-gray-700">Creating valuable content to attract and engage retailers.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Social Media Marketing</h4>
                      <p className="text-gray-700">Building a strong presence on social media platforms.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Influencer Marketing</h4>
                      <p className="text-gray-700">Partnering with influencers to promote Guidely.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Partnerships</h4>
                      <p className="text-gray-700">Collaborating with e-commerce platforms and agencies.</p>
                    </div>
                  </div>
                </section>
                
                <section id="implementation-sales" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">8.3 Sales Strategy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Direct Sales</h4>
                      <p className="text-gray-700">Reaching out to retailers directly to sell Guidely's platform.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Channel Sales</h4>
                      <p className="text-gray-700">Partnering with channel partners to expand reach.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Online Sales</h4>
                      <p className="text-gray-700">Selling Guidely's platform through online channels.</p>
                    </div>
                  </div>
                </section>
              </section>
              
              {/* Roadmap Section */}
              <section id="roadmap" className="mb-16">
                <div className="flex items-center mb-6">
                  <FiMap className="text-primary w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">9. Roadmap</h2>
                </div>
                
                <section id="roadmap-short-term" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">9.1 Short-Term Goals</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">MVP Launch</h4>
                          <p className="text-gray-700">Release core AI shopping assistant functionality.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Early Adopters</h4>
                          <p className="text-gray-700">Onboard initial set of retailers for beta testing.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">First Token Sale</h4>
                          <p className="text-gray-700">Initial $GLY token distribution to early supporters.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Basic Analytics</h4>
                          <p className="text-gray-700">Implement core analytics dashboard.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 text-sm">
                      <p><strong>Timeline:</strong> Q3-Q4 2023</p>
                    </div>
                  </div>
                </section>
                
                <section id="roadmap-mid-term" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">9.2 Mid-Term Goals</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Enhanced AI Models</h4>
                          <p className="text-gray-700">Improve personalization and product understanding.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Mobile SDK</h4>
                          <p className="text-gray-700">Launch iOS and Android SDK for native app integration.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Partnerships</h4>
                          <p className="text-gray-700">Establish key integrations with major e-commerce platforms.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Advanced Analytics</h4>
                          <p className="text-gray-700">Implement predictive analytics and deeper insights.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 text-sm">
                      <p><strong>Timeline:</strong> Q1-Q4 2024</p>
                    </div>
                  </div>
                </section>
                
                <section id="roadmap-long-term" className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 text-primary">9.3 Long-Term Goals</h3>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Global Expansion</h4>
                          <p className="text-gray-700">Scale to international markets and support multiple languages.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Enterprise Solutions</h4>
                          <p className="text-gray-700">Custom enterprise implementations for major retailers.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Ecosystem Growth</h4>
                          <p className="text-gray-700">Develop a complete ecosystem around the $GLY token.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">AI Innovations</h4>
                          <p className="text-gray-700">Pioneer next-generation shopping AI technologies.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 text-sm">
                      <p><strong>Timeline:</strong> 2025 and beyond</p>
                    </div>
                  </div>
                </section>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion</h2>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                  <p className="mb-6 text-lg leading-relaxed">
                    Guidely is poised to revolutionize the e-commerce industry by providing a personalized, AI-powered shopping experience that benefits both retailers and consumers. With a strong team, innovative technology, and a clear roadmap, Guidely is well-positioned to become the leading AI-powered shopping platform. The integration of the $GLY token creates a sustainable ecosystem that rewards platform adoption and drives long-term growth.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/demo" className="btn-primary inline-flex items-center group">
                      Experience the Demo <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Documentation; 