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
    
    if (!query && !category) {
      return NextResponse.json(
        { error: 'Query or category parameter is required' },
        { status: 400 }
      );
    }
    
    const searchTerm = query || category;
    
    // Use either environment variables or hardcoded API keys
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || GOOGLE_API_KEY;
    const googleCseId = process.env.NEXT_PUBLIC_GOOGLE_CSE_ID || GOOGLE_CSE_ID;
    
    // Check if we have Google API credentials
    if (googleApiKey && googleCseId) {
      try {
        console.log('Attempting to use Google Shopping API...');
        const googleProducts = await fetchFromGoogleShopping(searchTerm, googleApiKey, googleCseId);
        
        if (googleProducts.length > 0) {
          console.log('Successfully fetched Google Shopping products');
          return NextResponse.json({ products: googleProducts });
        } else {
          console.log('No Google Shopping products found, falling back to simulation');
        }
      } catch (error) {
        console.error('Error fetching from Google Shopping:', error);
        // Continue to fallback
      }
    }
    
    // Fallback to simulated data
    console.log('Using simulated product data');
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, we'll return simulated product data
    const products = simulateProductResults(searchTerm);
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error processing product search:', error);
    return NextResponse.json(
      { error: 'Failed to search for products' },
      { status: 500 }
    );
  }
}

// Function to fetch from Google Shopping via Custom Search API
async function fetchFromGoogleShopping(searchTerm: string, apiKey: string, cseId: string): Promise<Product[]> {
  // Use Google Custom Search API with shopping vertical
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${encodeURIComponent(searchTerm)}&searchType=shopping`;
  
  console.log('Fetching from Google Shopping:', url);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Google API error: ${response.status}`);
  }
  
  const data = await response.json();
  console.log('Google API response:', JSON.stringify(data, null, 2));
  
  if (!data.items || data.items.length === 0) {
    return [];
  }
  
  return data.items.slice(0, 3).map((item: any) => {
    // Extract price from snippet if possible
    const priceMatch = item.snippet?.match(/\$[\d,]+\.?\d*/);
    const price = priceMatch ? priceMatch[0] : 'Check price';
    
    // Get image from pagemap or use fallback
    let imageUrl = 'https://via.placeholder.com/150';
    if (item.pagemap?.cse_image?.[0]?.src) {
      imageUrl = item.pagemap.cse_image[0].src;
    } else if (item.pagemap?.cse_thumbnail?.[0]?.src) {
      imageUrl = item.pagemap.cse_thumbnail[0].src;
    }
    
    return {
      id: item.cacheId || `google-${Math.random().toString(36).substring(2, 9)}`,
      name: item.title,
      price: price,
      image: imageUrl,
      description: item.snippet || '',
      rating: 4.5, // Google doesn't usually provide ratings
      source: 'Google Shopping',
      url: item.link
    };
  });
}

// Function to simulate fetching from eBay API
// In a real implementation, this would use the eBay Finding API
async function fetchFromEbay(searchTerm: string): Promise<Product[]> {
  // Example of how the real implementation would look:
  // const response = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(searchTerm)}`, {
  //   headers: {
  //     'Authorization': `Bearer ${process.env.EBAY_API_KEY}`,
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const data = await response.json();
  // return data.itemSummaries.map(item => ({
  //   id: item.itemId,
  //   name: item.title,
  //   price: `$${item.price.value}`,
  //   image: item.image.imageUrl,
  //   description: item.shortDescription || '',
  //   rating: item.sellerRating || 4.5,
  //   source: 'eBay',
  //   url: item.itemWebUrl
  // }));
  
  return [];
}

// Function to simulate fetching from Amazon API
// In a real implementation, this would use the Amazon Product Advertising API
async function fetchFromAmazon(searchTerm: string): Promise<Product[]> {
  // In a real scenario, you might use a service like Rainforest API to access Amazon data
  // const response = await fetch(`https://api.rainforestapi.com/request?api_key=${process.env.RAINFOREST_API_KEY}&type=search&amazon_domain=amazon.com&search_term=${encodeURIComponent(searchTerm)}`);
  // const data = await response.json();
  // return data.search_results.map(item => ({
  //   id: item.asin,
  //   name: item.title,
  //   price: item.price.raw,
  //   image: item.image,
  //   description: item.title,
  //   rating: item.rating,
  //   source: 'Amazon',
  //   url: item.link
  // }));
  
  return [];
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
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Industry-leading noise cancellation with premium sound",
        rating: 4.7,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-1",
        name: "Bose QuietComfort 45 Wireless Headphones",
        price: "$279.00",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Legendary noise cancellation and premium comfort",
        rating: 4.6,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      },
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
    );
  }
  // Smartphone products
  else if (searchTermLower.includes('phone') || searchTermLower.includes('smartphone')) {
    products.push(
      {
        id: "amazon-phone-1",
        name: "iPhone 14 Pro Max - 256GB",
        price: "$1,099.00",
        image: "https://images.unsplash.com/photo-1678911820864-e5a3eb77f284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Apple's flagship smartphone with ProMotion display",
        rating: 4.8,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-phone-1",
        name: "Samsung Galaxy S23 Ultra",
        price: "$949.99",
        image: "https://images.unsplash.com/photo-1675512676527-1766949a17e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Samsung's premium smartphone with S Pen",
        rating: 4.7,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-phone-1",
        name: "Google Pixel 7 Pro",
        price: "$749.00",
        image: "https://images.unsplash.com/photo-1697644371824-41f54b3fa808?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Apple's professional laptop with M2 Pro chip",
        rating: 4.9,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-laptop-1",
        name: "Dell XPS 15 9520",
        price: "$1,749.99",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Premium Windows laptop with OLED display",
        rating: 4.7,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-laptop-1",
        name: "Lenovo ThinkPad X1 Carbon",
        price: "$1,349.00",
        image: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
        image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Full-frame mirrorless camera with 33MP sensor",
        rating: 4.9,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-camera-1",
        name: "Canon EOS R6 Mark II",
        price: "$2,299.99",
        image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "24MP mirrorless camera with 4K60p video",
        rating: 4.8,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-camera-1",
        name: "Fujifilm X-T5",
        price: "$1,699.00",
        image: "https://images.unsplash.com/photo-1542567455-cd733f23fbb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
        image: "https://images.unsplash.com/photo-1558002038-1055e2cf8a69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Smart display with motion tracking and Alexa",
        rating: 4.7,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-smarthome-1",
        name: "Google Nest Hub Max",
        price: "$179.99",
        image: "https://images.unsplash.com/photo-1558002038-1055e2cf8a69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: "Smart display with Google Assistant",
        rating: 4.6,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-smarthome-1",
        name: "Philips Hue Starter Kit",
        price: "$149.00",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: `Top-rated ${searchTerm} with excellent reviews`,
        rating: 4.8,
        source: "Amazon",
        url: "https://www.amazon.com"
      },
      {
        id: "ebay-default-1",
        name: `${searchTerm} Pro Edition`,
        price: "$149.99",
        image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: `Professional ${searchTerm} with premium features`,
        rating: 4.6,
        source: "eBay",
        url: "https://www.ebay.com"
      },
      {
        id: "google-default-1",
        name: `Budget-Friendly ${searchTerm}`,
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: `Affordable ${searchTerm} without compromising quality`,
        rating: 4.5,
        source: "Google Shopping",
        url: "https://shopping.google.com"
      }
    );
  }
  
  return products;
} 