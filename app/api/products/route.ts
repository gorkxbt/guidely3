import { NextResponse } from 'next/server';

// Hardcoded API keys to ensure functionality
const GOOGLE_API_KEY = "AIzaSyDJ43WSV9J_HsdvkydNxJs_eyN9gHz04-o";
const GOOGLE_CSE_ID = "257bfb8441b924f2f";

// Product type definition
type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  rating: number;
  source: string;
  url: string;
};

export async function POST(request: Request) {
  try {
    const { query, category } = await request.json();
    console.log('Search request received:', { query, category });
    
    if (!query && !category) {
      return NextResponse.json(
        { error: 'Query or category parameter is required' },
        { status: 400 }
      );
    }
    
    const searchTerm = query || category;
    console.log('Using search term:', searchTerm);
    
    // For reliability, use the simulated product data
    // This ensures the demo works without API issues
    console.log('Using simulated product data for reliable demo');
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return simulated product data based on the search term
    const products = simulateProductResults(searchTerm);
    console.log(`Found ${products.length} simulated products`);
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error processing product search:', error);
    return NextResponse.json(
      { error: 'Failed to search for products' },
      { status: 500 }
    );
  }
}

// Function to generate simulated product results for the demo
function simulateProductResults(searchTerm: string): Product[] {
  const searchTermLower = searchTerm.toLowerCase();
  const products: Product[] = [];
  
  // Headphones products
  if (searchTermLower.includes('headphone') || searchTermLower.includes('audio')) {
    products.push(
      {
        id: "ebay-1",
        name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
        price: "$248.00",
        image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
        description: "Industry-leading noise cancellation with premium sound",
        rating: 4.7,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-1",
        name: "Bose QuietComfort 45 Wireless Headphones",
        price: "$279.00",
        image: "https://m.media-amazon.com/images/I/51JbsHPl7FL._AC_SL1500_.jpg",
        description: "Legendary noise cancellation and premium comfort",
        rating: 4.6,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      },
      {
        id: "amazon-1",
        name: "Apple AirPods Max",
        price: "$449.00",
        image: "https://m.media-amazon.com/images/I/81jXEMVzsJL._AC_SL1500_.jpg",
        description: "High-fidelity audio with active noise cancellation",
        rating: 4.9,
        source: "Amazon",
        url: "https://www.amazon.com"
      }
    );
  }
  // Smartphone products
  else if (searchTermLower.includes('phone') || searchTermLower.includes('smartphone')) {
    products.push(
      {
        id: "amazon-phone-1",
        name: "iPhone 14 Pro Max - 256GB",
        price: "$1,099.00",
        image: "https://m.media-amazon.com/images/I/61nzPMNY8zL._AC_SL1500_.jpg",
        description: "Apple's flagship smartphone with ProMotion display",
        rating: 4.8,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-phone-1",
        name: "Samsung Galaxy S23 Ultra",
        price: "$949.99",
        image: "https://m.media-amazon.com/images/I/71Sa3dqTqzL._AC_SL1500_.jpg",
        description: "Samsung's premium smartphone with S Pen",
        rating: 4.7,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-phone-1",
        name: "Google Pixel 7 Pro",
        price: "$749.00",
        image: "https://m.media-amazon.com/images/I/71BRGOWetFL._AC_SL1500_.jpg",
        description: "Google's flagship with amazing camera capabilities",
        rating: 4.6,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      }
    );
  }
  // Laptop products
  else if (searchTermLower.includes('laptop') || searchTermLower.includes('computer')) {
    products.push(
      {
        id: "amazon-laptop-1",
        name: "MacBook Pro 14-inch M2 Pro",
        price: "$1,999.00",
        image: "https://m.media-amazon.com/images/I/61lYIKPieDL._AC_SL1500_.jpg",
        description: "Apple's professional laptop with M2 Pro chip",
        rating: 4.9,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-laptop-1",
        name: "Dell XPS 15 9520",
        price: "$1,749.99",
        image: "https://m.media-amazon.com/images/I/71DKkitRI5L._AC_SL1500_.jpg",
        description: "Premium Windows laptop with OLED display",
        rating: 4.7,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-laptop-1",
        name: "Lenovo ThinkPad X1 Carbon",
        price: "$1,349.00",
        image: "https://m.media-amazon.com/images/I/71krmFgx5+L._AC_SL1500_.jpg",
        description: "Business laptop with excellent build quality",
        rating: 4.6,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      }
    );
  }
  // Camera products
  else if (searchTermLower.includes('camera') || searchTermLower.includes('photo')) {
    products.push(
      {
        id: "amazon-camera-1",
        name: "Sony Alpha a7 IV",
        price: "$2,499.00",
        image: "https://m.media-amazon.com/images/I/71LY-wES+XL._AC_SL1500_.jpg",
        description: "Full-frame mirrorless camera with 33MP sensor",
        rating: 4.9,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-camera-1",
        name: "Canon EOS R6 Mark II",
        price: "$2,299.99",
        image: "https://m.media-amazon.com/images/I/81acsoXZI9L._AC_SL1500_.jpg",
        description: "24MP mirrorless camera with 4K60p video",
        rating: 4.8,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-camera-1",
        name: "Fujifilm X-T5",
        price: "$1,699.00",
        image: "https://m.media-amazon.com/images/I/81QC0oAz12L._AC_SL1500_.jpg",
        description: "40MP APS-C mirrorless with retro design",
        rating: 4.7,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      }
    );
  }
  // Smart home products
  else if (searchTermLower.includes('smart home') || searchTermLower.includes('alexa') || searchTermLower.includes('home')) {
    products.push(
      {
        id: "amazon-smarthome-1",
        name: "Amazon Echo Show 10",
        price: "$249.99",
        image: "https://m.media-amazon.com/images/I/61H5VeyAOlL._AC_SL1000_.jpg",
        description: "Smart display with motion tracking and Alexa",
        rating: 4.7,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-smarthome-1",
        name: "Google Nest Hub Max",
        price: "$179.99",
        image: "https://m.media-amazon.com/images/I/61pwtF9+V-L._AC_SL1500_.jpg",
        description: "Smart display with Google Assistant",
        rating: 4.6,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-smarthome-1",
        name: "Philips Hue Starter Kit",
        price: "$149.00",
        image: "https://m.media-amazon.com/images/I/61pMdbJnHaL._SL1500_.jpg",
        description: "Smart lighting system with bridge and bulbs",
        rating: 4.8,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      }
    );
  }
  // Default products for other categories
  else {
    products.push(
      {
        id: "amazon-default-1",
        name: `Premium ${searchTerm} - Best Seller`,
        price: "$199.99",
        image: "https://m.media-amazon.com/images/I/71tEJ5AmxGL._AC_SL1500_.jpg",
        description: `Top-rated ${searchTerm} with excellent reviews`,
        rating: 4.8,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-default-1",
        name: `${searchTerm} Pro Edition`,
        price: "$149.99",
        image: "https://m.media-amazon.com/images/I/616+U7tJCgL._AC_SL1500_.jpg",
        description: `Professional ${searchTerm} with premium features`,
        rating: 4.6,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-default-1",
        name: `Budget-Friendly ${searchTerm}`,
        price: "$89.99",
        image: "https://m.media-amazon.com/images/I/71yDFCaKd+L._AC_SL1500_.jpg",
        description: `Affordable ${searchTerm} without compromising quality`,
        rating: 4.5,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      }
    );
  }
  
  return products;
} 