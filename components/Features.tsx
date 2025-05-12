import React from 'react';
import { FiMessageSquare, FiRefreshCw, FiDatabase, FiBarChart2 } from 'react-icons/fi';

const Features = () => {
  const featuresList = [
    {
      icon: <FiMessageSquare className="w-8 h-8 text-primary" />,
      title: "Conversational AI Shopping Assistant",
      description: "Engage with a smart, friendly guide that makes shopping intuitive and fun."
    },
    {
      icon: <FiRefreshCw className="w-8 h-8 text-primary" />,
      title: "Real-Time Personalization",
      description: "Every interaction refines recommendations, ensuring relevance and delight."
    },
    {
      icon: <FiDatabase className="w-8 h-8 text-primary" />,
      title: "Scalable for Any Catalog",
      description: "From boutique shops to mega-retailers, Guidely handles catalogs of any size with ease."
    },
    {
      icon: <FiBarChart2 className="w-8 h-8 text-primary" />,
      title: "Insightful Analytics Dashboard",
      description: "Track engagement, conversion, and product trends to drive smarter business decisions."
    }
  ];

  return (
    <section id="features" className="section bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Features</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuresList.map((feature, index) => (
            <div key={index} className="bg-light p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 