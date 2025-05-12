# Guidely API Integration Guide

This document provides instructions for integrating real API services with the Guidely demo to replace the simulated responses.

## Required API Keys

To fully implement the Guidely demo with real data, you'll need to obtain the following API keys:

1. **OpenAI API Key** - For LLM integration
2. **Google Custom Search API Key** - For Google Shopping product search
3. **eBay API Key** - For eBay product search
4. **RapidAPI Key** - For accessing Amazon product data

## Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_GOOGLE_CSE_ID=your_google_custom_search_engine_id
NEXT_PUBLIC_EBAY_API_KEY=your_ebay_api_key
NEXT_PUBLIC_RAPID_API_KEY=your_rapid_api_key
```

## API Integration Instructions

### 1. OpenAI Integration

The demo currently simulates LLM responses. To integrate with OpenAI:

1. Update `app/api/llm/route.ts` to use the actual OpenAI API:

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: 'You are Guidely, an AI shopping assistant that helps users find products. Provide helpful, concise recommendations and ask clarifying questions when needed. Your responses should focus on understanding user preferences and guiding them to the right product.' 
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json({ text: data.choices[0].message.content });
  } catch (error) {
    console.error('Error processing LLM request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

### 2. Google Shopping Integration

To integrate with Google Custom Search API for product data:

1. Create a Custom Search Engine at https://programmablesearchengine.google.com/
2. Configure it to search specific shopping sites
3. Update the `fetchFromGoogleShopping` function in `app/api/products/route.ts`:

```typescript
async function fetchFromGoogleShopping(searchTerm: string): Promise<Product[]> {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CSE_ID}&q=${encodeURIComponent(searchTerm)}&searchType=shopping`
  );
  
  if (!response.ok) {
    throw new Error(`Google API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  return data.items.map((item: any) => ({
    id: item.cacheId || `google-${Math.random().toString(36).substring(2, 9)}`,
    name: item.title,
    price: item.pagemap?.offer?.[0]?.price || '$0.00',
    image: item.pagemap?.cse_image?.[0]?.src || 'https://via.placeholder.com/150',
    description: item.snippet || '',
    rating: 4.7, // Google doesn't always provide ratings
    source: 'Google Shopping',
    url: item.link
  }));
}
```

### 3. eBay Integration

To integrate with eBay Finding API:

1. Create an eBay developer account at https://developer.ebay.com/
2. Create an application to obtain API credentials
3. Update the `fetchFromEbay` function in `app/api/products/route.ts`:

```typescript
async function fetchFromEbay(searchTerm: string): Promise<Product[]> {
  const response = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(searchTerm)}&limit=3`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_EBAY_API_KEY}`,
      'Content-Type': 'application/json',
      'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
    }
  });
  
  if (!response.ok) {
    throw new Error(`eBay API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  return data.itemSummaries.map((item: any) => ({
    id: item.itemId,
    name: item.title,
    price: `$${item.price.value}`,
    image: item.image?.imageUrl || 'https://via.placeholder.com/150',
    description: item.shortDescription || item.title,
    rating: item.seller?.feedbackPercentage ? item.seller.feedbackPercentage / 20 : 4.5,
    source: 'eBay',
    url: item.itemWebUrl
  }));
}
```

### 4. Amazon Product Data Integration

Since Amazon doesn't offer a direct product search API, we can use a third-party service like RapidAPI:

1. Sign up for RapidAPI and subscribe to an Amazon product data API
2. Update the `fetchFromAmazon` function in `app/api/products/route.ts`:

```typescript
async function fetchFromAmazon(searchTerm: string): Promise<Product[]> {
  const response = await fetch(`https://amazon-product-data.p.rapidapi.com/search?keyword=${encodeURIComponent(searchTerm)}&marketplace=US&limit=3`, {
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
      'X-RapidAPI-Host': 'amazon-product-data.p.rapidapi.com'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Amazon API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  return data.results.map((item: any) => ({
    id: item.asin,
    name: item.title,
    price: item.price.current_price ? `$${item.price.current_price}` : 'See on Amazon',
    image: item.image || 'https://via.placeholder.com/150',
    description: item.title,
    rating: item.rating || 4.5,
    source: 'Amazon',
    url: `https://www.amazon.com/dp/${item.asin}`
  }));
}
```

## Updating the Demo Page

After implementing the real API integrations, update the `handleSend` and `handleCategorySelect` functions in `app/demo/page.tsx` to use the new API endpoints:

```typescript
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
    // First, get AI response
    const llmResponse = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    
    if (!llmResponse.ok) {
      throw new Error('LLM API error');
    }
    
    const llmData = await llmResponse.json();
    
    // Check if we should search for products
    const productKeywords = extractProductKeywords(input);
    
    if (productKeywords) {
      // Search for products
      const productResponse = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: productKeywords })
      });
      
      if (!productResponse.ok) {
        throw new Error('Product API error');
      }
      
      const productData = await productResponse.json();
      
      // Remove loading message and add response with products
      setMessages(prev => prev.filter(msg => !msg.isLoading).concat({
        text: llmData.text,
        sender: 'bot',
        products: productData.products
      }));
    } else {
      // Just regular response without products
      setMessages(prev => prev.filter(msg => !msg.isLoading).concat({
        text: llmData.text,
        sender: 'bot'
      }));
    }
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
```

## Rate Limiting Considerations

- **OpenAI API**: Be mindful of rate limits and token usage. Implement appropriate error handling.
- **Google Custom Search API**: The free tier allows 100 queries per day.
- **eBay API**: Check the rate limits for your specific developer tier.
- **RapidAPI**: Monitor your usage to avoid exceeding your subscription limits.

## Security Notes

- Always keep your API keys secure and never expose them in client-side code.
- For production, implement proper server-side API calls rather than using public environment variables.
- Consider implementing caching to reduce API calls and improve performance. 