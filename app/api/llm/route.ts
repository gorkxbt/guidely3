import { NextResponse } from 'next/server';

// Hardcoded API key to ensure functionality
const OPENAI_API_KEY = "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";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // Check if we have an OpenAI API key (either from env or hardcoded)
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || OPENAI_API_KEY;
    console.log('Using OpenAI API key starting with:', apiKey.substring(0, 10) + '...');
    
    if (apiKey) {
      try {
        console.log('Sending request to OpenAI API...');
        // Use the OpenAI API
        const requestBody = {
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
        };
        
        console.log('Request payload:', JSON.stringify(requestBody, null, 2));
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(requestBody)
        });
        
        console.log('OpenAI API response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('OpenAI API error details:', errorData);
          throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }
        
        const data = await response.json();
        console.log('OpenAI API response:', data);
        return NextResponse.json({ text: data.choices[0].message.content });
      } catch (apiError) {
        console.error('OpenAI API error:', apiError);
        // Fall back to simulated responses if the API call fails
        return simulateResponse(message);
      }
    } else {
      console.log('No API key found, using simulated responses');
      // No API key, use simulated responses
      return simulateResponse(message);
    }
  } catch (error) {
    console.error('Error processing LLM request:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.toString() : 'Unknown error' },
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