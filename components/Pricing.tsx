import React from 'react';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small shops",
      price: "$20",
      discountNote: "or equivalent in $GLY (20% off)",
      features: [
        "Up to 1,000 guided sessions/month",
        "Basic analytics",
        "Email support",
        "Pay with credit card or $GLY"
      ],
      buttonText: "Get Started",
      highlight: false
    },
    {
      name: "Growth",
      description: "For growing retailers",
      price: "$50",
      discountNote: "or equivalent in $GLY (20% off)",
      features: [
        "Up to 10,000 guided sessions/month",
        "Advanced analytics",
        "Priority support",
        "Pay with credit card or $GLY"
      ],
      buttonText: "Get Started",
      highlight: true
    },
    {
      name: "Enterprise",
      description: "Custom solutions",
      price: "$100",
      discountNote: "or equivalent in $GLY (20% off)",
      features: [
        "Unlimited sessions",
        "Dedicated account manager",
        "Custom integrations",
        "Pay with credit card or $GLY"
      ],
      buttonText: "Contact Us",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="section bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Pricing</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Choose the plan that's right for your business
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl p-8 ${plan.highlight ? 'ring-2 ring-primary shadow-lg' : 'border border-gray-200 shadow-sm'}`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm block text-gray-500">{plan.discountNote}</span>
              </div>
              
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FiCheck className="text-primary w-5 h-5 mr-2 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="#contact" 
                className={`block text-center py-3 px-4 rounded-lg font-medium w-full ${
                  plan.highlight 
                    ? 'bg-primary text-white hover:bg-secondary'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition-colors`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 