import { NextResponse } from 'next/server';

// Hugging Face API key (free tier available)
// Get your free API key at https://huggingface.co/settings/tokens
const HUGGINGFACE_API_KEY = "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"; // This is a demo key, get your own at huggingface.co

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message);
    
    // Check if we have a Hugging Face API key
    const apiKey = process.env.HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY;
    console.log('Using Hugging Face API key');
    
    if (apiKey) {
      try {
        console.log('Sending request to Hugging Face API...');
        
        // Use a simpler model with text completion for reliability
        const response = await fetch(
          "https://api-inference.huggingface.co/models/google/flan-t5-xxl",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              inputs: `Answer this user query about shopping in a helpful, concise way: ${message}`,
              parameters: {
                max_length: 200,
                temperature: 0.7
              }
            })
          }
        );
        
        console.log('Hugging Face API response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Hugging Face API error details:', errorData);
          throw new Error(`Hugging Face API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Hugging Face API response:', data);
        
        // Get generated text from response - different models return results in different formats
        let responseText = "";
        if (Array.isArray(data) && data.length > 0) {
          // Some models return an array
          if (typeof data[0] === 'string') {
            responseText = data[0];
          } else if (data[0].generated_text) {
            responseText = data[0].generated_text;
          }
        } else if (data.generated_text) {
          // Some models return an object with generated_text
          responseText = data.generated_text;
        } else if (typeof data === 'string') {
          // Some models return a string directly
          responseText = data;
        }
        
        if (!responseText) {
          console.log('No valid response from Hugging Face, falling back to simulation');
          return simulateResponse(message);
        }
        
        return NextResponse.json({ text: responseText });
      } catch (apiError) {
        console.error('Hugging Face API error:', apiError);
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

// Helper function for simulated responses
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
  } else if (userInput.includes('phone') || userInput.includes('smartphone')) {
    responseText = "I can help you find the perfect smartphone! Are you interested in iOS or Android? Do you have any preferences regarding screen size, camera quality, or battery life?";
  } else if (userInput.includes('smartwatch') || userInput.includes('watch')) {
    responseText = "Looking for a smartwatch? There are great options from Apple, Samsung, Garmin, and others. What features are most important to you? Fitness tracking, notifications, or battery life?";
  } else if (userInput.includes('tablet') || userInput.includes('ipad')) {
    responseText = "I can recommend some excellent tablets. Are you looking for something for work, entertainment, or both? Do you prefer iOS, Android, or Windows?";
  } else if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
    responseText = "Hello! I'm Guidely's shopping assistant. I can help you find the perfect product. What are you looking for today?";
  } else {
    responseText = "I'd be happy to help you find what you're looking for. Could you tell me more about the specific product you're interested in? Or if you prefer, you can select from the product categories.";
  }
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({ text: responseText });
} 