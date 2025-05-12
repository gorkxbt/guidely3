import { NextResponse } from 'next/server';

// Hardcoded API key to ensure functionality
const OPENAI_API_KEY = "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";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // Check if we have an OpenAI API key (either from env or hardcoded)
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || OPENAI_API_KEY;
    
    if (apiKey) {
      try {
        // Use the OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini', // Using gpt-4o-mini as it's more cost-effective
            messages: [
              { 
                role: 'system', 
                content: 'You are Guidely, an AI shopping assistant that helps users find products. Keep your responses concise and helpful, focusing on understanding the user\'s shopping needs.'
              },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 150 // Keep responses reasonably sized
          })
        });
        
        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }
        
        const data = await response.json();
        return NextResponse.json({ text: data.choices[0].message.content });
      } catch (apiError) {
        console.error('OpenAI API error:', apiError);
        // Fall back to simulated responses if the API call fails
        return simulateResponse(message);
      }
    } else {
      // No API key, use simulated responses
      return simulateResponse(message);
    }
  } catch (error) {
    console.error('Error processing LLM request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Helper function for simulated responses when the API isn't available
async function simulateResponse(message: string) {
  const userInput = message.toLowerCase();
  let responseText = '';
  
  if (userInput.includes('headphone') || userInput.includes('earphone')) {
    responseText = "I can help you find the perfect headphones! Are you looking for over-ear, on-ear, or in-ear headphones? Do you have any specific features in mind like noise cancellation or wireless connectivity?";
  } else if (userInput.includes('laptop') || userInput.includes('computer')) {
    responseText = "I'd be happy to help you find a laptop. What will you primarily use it for? Gaming, work, casual use? And do you have a preferred brand or operating system?";
  } else if (userInput.includes('camera')) {
    responseText = "Looking for a camera? Great! Are you a beginner, enthusiast, or professional photographer? Are you interested in DSLRs, mirrorless, or point-and-shoot cameras?";
  } else if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('budget')) {
    responseText = "I can definitely help you find products within your budget. What price range are you considering, and what type of product are you looking for?";
  } else {
    responseText = "I'd be happy to help you find what you're looking for. Could you tell me more about the specific product you're interested in? Or if you prefer, you can select from the product categories.";
  }
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({ text: responseText });
} 