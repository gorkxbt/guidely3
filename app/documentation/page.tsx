"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiChevronDown, FiChevronRight, FiExternalLink, FiDownload } from 'react-icons/fi';

const Documentation = () => {
  const [openSection, setOpenSection] = useState<string | null>("introduction");

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guidely Whitepaper</h1>
            <p className="text-xl text-gray-700 mb-8">v1.0 · May 2025</p>
            <div className="flex justify-center gap-4">
              <button className="btn-primary inline-flex items-center">
                <FiDownload className="mr-2" />
                Download PDF
              </button>
              <Link href="/demo" className="btn-secondary inline-flex items-center">
                <FiExternalLink className="mr-2" />
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Sidebar */}
          <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24">
            <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => toggleSection("introduction")} 
                  className="flex items-center w-full text-left font-medium hover:text-primary transition-colors"
                >
                  {openSection === "introduction" ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
                  Introduction
                </button>
                {openSection === "introduction" && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li><a href="#vision" className="text-gray-600 hover:text-primary">Vision</a></li>
                    <li><a href="#market-opportunity" className="text-gray-600 hover:text-primary">Market Opportunity</a></li>
                    <li><a href="#solution-overview" className="text-gray-600 hover:text-primary">Solution Overview</a></li>
                  </ul>
                )}
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("market-analysis")} 
                  className="flex items-center w-full text-left font-medium hover:text-primary transition-colors"
                >
                  {openSection === "market-analysis" ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
                  Market Analysis
                </button>
                {openSection === "market-analysis" && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li><a href="#target-market" className="text-gray-600 hover:text-primary">Target Market</a></li>
                    <li><a href="#market-size" className="text-gray-600 hover:text-primary">Market Size</a></li>
                    <li><a href="#competitive-landscape" className="text-gray-600 hover:text-primary">Competitive Landscape</a></li>
                  </ul>
                )}
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("technical")} 
                  className="flex items-center w-full text-left font-medium hover:text-primary transition-colors"
                >
                  {openSection === "technical" ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
                  Technical Architecture
                </button>
                {openSection === "technical" && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li><a href="#ai-engine" className="text-gray-600 hover:text-primary">AI Engine</a></li>
                    <li><a href="#product-catalog" className="text-gray-600 hover:text-primary">Product Catalog Processor</a></li>
                    <li><a href="#conversational" className="text-gray-600 hover:text-primary">Conversational Interface</a></li>
                  </ul>
                )}
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("token")} 
                  className="flex items-center w-full text-left font-medium hover:text-primary transition-colors"
                >
                  {openSection === "token" ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
                  $GLY Token Economy
                </button>
                {openSection === "token" && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li><a href="#token-overview" className="text-gray-600 hover:text-primary">Token Overview</a></li>
                    <li><a href="#token-distribution" className="text-gray-600 hover:text-primary">Token Distribution</a></li>
                    <li><a href="#token-utility" className="text-gray-600 hover:text-primary">Token Utility</a></li>
                  </ul>
                )}
              </li>
              <li>
                <button 
                  onClick={() => toggleSection("roadmap")} 
                  className="flex items-center w-full text-left font-medium hover:text-primary transition-colors"
                >
                  {openSection === "roadmap" ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
                  Roadmap
                </button>
                {openSection === "roadmap" && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li><a href="#short-term" className="text-gray-600 hover:text-primary">Short-Term Goals</a></li>
                    <li><a href="#mid-term" className="text-gray-600 hover:text-primary">Mid-Term Goals</a></li>
                    <li><a href="#long-term" className="text-gray-600 hover:text-primary">Long-Term Goals</a></li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
          
          {/* Content */}
          <div className="md:col-span-9 bg-white p-8 rounded-xl shadow-sm">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Abstract</h2>
              <p className="mb-6">
                Guidely represents a paradigm shift in e-commerce, introducing an AI-powered platform that transforms traditional product browsing into intelligent, guided shopping experiences. By leveraging advanced machine learning algorithms and natural language processing, Guidely processes vast product catalogs to deliver hyper-personalized recommendations through a conversational interface.
              </p>
              <p className="mb-8">
                Our platform addresses the growing complexity of online shopping by understanding individual shopper intent, processing extensive product data, and delivering tailored recommendations in real-time. The integration of the $GLY token creates a sustainable ecosystem that rewards platform adoption while providing tangible benefits to subscribers.
              </p>
              
              <hr className="my-8" />
              
              <h2 id="introduction" className="text-3xl font-bold mb-6">Introduction</h2>
              
              <h3 id="vision" className="text-2xl font-bold mb-4">1.1 Vision</h3>
              <p className="mb-6">
                Guidely aims to revolutionize e-commerce by eliminating decision fatigue and creating personalized shopping journeys that convert browsers into confident buyers. Our platform leverages cutting-edge AI to understand both products and people, creating a bridge between intent and discovery.
              </p>
              
              <h3 id="market-opportunity" className="text-2xl font-bold mb-4">1.2 Market Opportunity</h3>
              <p className="mb-4">The global e-commerce market faces significant challenges:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>69% of shopping carts are abandoned</li>
                <li>42% of shoppers leave due to too many choices</li>
                <li>73% of consumers expect personalized experiences</li>
                <li>Retailers lose $18B annually to poor product discovery</li>
              </ul>
              
              <h3 id="solution-overview" className="text-2xl font-bold mb-4">1.3 Solution Overview</h3>
              <p className="mb-4">Guidely addresses these challenges through:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>AI-powered conversational shopping interfaces</li>
                <li>Real-time personalization engines</li>
                <li>Dynamic product catalog processing</li>
                <li>Intelligent recommendation systems</li>
                <li>Blockchain-based subscription model with $GLY token</li>
              </ul>
              
              <hr className="my-8" />
              
              <h2 id="market-analysis" className="text-3xl font-bold mb-6">Market Analysis</h2>
              
              <h3 id="target-market" className="text-2xl font-bold mb-4">2.1 Target Market</h3>
              <p className="mb-4">Primary segments:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>E-commerce retailers ($500K-$50M annual revenue)</li>
                <li>D2C brands seeking personalization</li>
                <li>Marketplace operators</li>
                <li>Specialty retailers with complex product catalogs</li>
              </ul>
              
              <h3 id="market-size" className="text-2xl font-bold mb-4">2.2 Market Size</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Total Addressable Market (TAM): $50B</li>
                <li>Serviceable Addressable Market (SAM): $15B</li>
                <li>Serviceable Obtainable Market (SOM): $3B</li>
              </ul>
              
              <h3 id="competitive-landscape" className="text-2xl font-bold mb-4">2.3 Competitive Landscape</h3>
              <p className="mb-4">Current solutions fall into three categories:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Traditional search/filter systems</li>
                <li>Basic recommendation engines</li>
                <li>Rule-based personalization tools</li>
              </ul>
              
              <p className="mb-4">Guidely's competitive advantages:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Advanced AI understanding of user intent</li>
                <li>Real-time catalog processing</li>
                <li>Conversational interface</li>
                <li>Token-based subscription model</li>
                <li>Seamless integration capabilities</li>
              </ul>
              
              <hr className="my-8" />
              
              <h2 id="technical" className="text-3xl font-bold mb-6">Technical Architecture</h2>
              
              <h3 id="ai-engine" className="text-2xl font-bold mb-4">4.1 AI Engine</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Natural Language Understanding (NLU):</strong> Processes shopper queries and intent using transformer-based models.</li>
                <li><strong>Machine Learning (ML):</strong> Employs collaborative filtering, content-based filtering, and deep learning for real-time personalization.</li>
                <li><strong>Knowledge Graph:</strong> Organizes product data and relationships for intelligent recommendations.</li>
              </ul>
              
              <h3 id="product-catalog" className="text-2xl font-bold mb-4">4.2 Product Catalog Processor</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Data Ingestion:</strong> Scalable ingestion of product data from various sources (APIs, CSV, XML).</li>
                <li><strong>Data Enrichment:</strong> Automated enrichment of product data with attributes, tags, and metadata.</li>
                <li><strong>Indexing:</strong> Real-time indexing of product data for fast, accurate search and recommendations.</li>
              </ul>
              
              <h3 id="conversational" className="text-2xl font-bold mb-4">4.3 Conversational Interface</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Multi-Platform Support:</strong> Web, mobile, chatbots, voice assistants.</li>
                <li><strong>Adaptive Dialogue Flows:</strong> Dynamic dialogue flows based on shopper intent and preferences.</li>
                <li><strong>Personalized Recommendations:</strong> Real-time recommendations displayed within the conversational interface.</li>
              </ul>
              
              <hr className="my-8" />
              
              <h2 id="token" className="text-3xl font-bold mb-6">$GLY Token Economy</h2>
              
              <h3 id="token-overview" className="text-2xl font-bold mb-4">6.1 Token Overview</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Token Name:</strong> Guidely Token</li>
                <li><strong>Token Symbol:</strong> $GLY</li>
                <li><strong>Token Type:</strong> Utility Token</li>
                <li><strong>Blockchain:</strong> Solana</li>
                <li><strong>Launch Platform:</strong> Pumpfun</li>
                <li><strong>Total Supply:</strong> 100,000,000 $GLY</li>
              </ul>
              
              <h3 id="token-distribution" className="text-2xl font-bold mb-4">6.2 Token Distribution</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Team & Advisors:</strong> 5%</li>
                <li><strong>Liquidity Pool / Bonding Curve (Pumpfun):</strong> 95%</li>
              </ul>
              
              <h3 id="token-utility" className="text-2xl font-bold mb-4">6.3 Token Utility</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Subscription Payments:</strong> Pay for Guidely subscriptions at a 20% discount.</li>
                <li><strong>Access to Premium Features:</strong> Unlock exclusive features and early product releases.</li>
                <li><strong>Future Governance:</strong> Potential future participation in the governance of the Guidely platform (subject to community vote).</li>
              </ul>
              
              <hr className="my-8" />
              
              <h2 id="roadmap" className="text-3xl font-bold mb-6">Roadmap</h2>
              
              <h3 id="short-term" className="text-2xl font-bold mb-4">9.1 Short-Term Goals (Q3-Q4 2025)</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Launch Guidely platform on Solana via Pumpfun.</li>
                <li>Onboard first 100 paying retailers.</li>
                <li>Achieve $100K in monthly recurring revenue.</li>
                <li>Expand marketing efforts and build brand awareness.</li>
              </ul>
              
              <h3 id="mid-term" className="text-2xl font-bold mb-4">9.2 Mid-Term Goals (2026)</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Reach 1,000 paying retailers.</li>
                <li>Achieve $1M in monthly recurring revenue.</li>
                <li>Expand platform features and functionality.</li>
                <li>Establish partnerships with key e-commerce platforms.</li>
              </ul>
              
              <h3 id="long-term" className="text-2xl font-bold mb-4">9.3 Long-Term Goals (2027+)</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Become the leading AI-powered shopping platform.</li>
                <li>Reach 10,000 paying retailers.</li>
                <li>Achieve $10M in monthly recurring revenue.</li>
                <li>Expand into new markets and verticals.</li>
              </ul>
              
              <hr className="my-8" />
              
              <h2 className="text-3xl font-bold mb-6">Conclusion</h2>
              <p className="mb-6">
                Guidely is poised to revolutionize the e-commerce industry by providing a personalized, AI-powered shopping experience that benefits both retailers and consumers. With a strong team, innovative technology, and a clear roadmap, Guidely is well-positioned to become the leading AI-powered shopping platform. The integration of the $GLY token creates a sustainable ecosystem that rewards platform adoption and drives long-term growth.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Documentation; 