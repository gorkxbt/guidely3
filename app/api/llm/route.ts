import { NextResponse } from 'next/server';

// Hugging Face API key (free tier available)
// Get your free API key at https://huggingface.co/settings/tokens
const HUGGINGFACE_API_KEY = "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"; // This is a demo key, get your own at huggingface.co

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // Check if we have a Hugging Face API key
    const apiKey = process.env.HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY;
    console.log('Using Hugging Face API key');
    
    if (apiKey) {
      try {
        console.log('Sending request to Hugging Face API...');
        
        // Use Hugging Face Inference API with a capable model
        // We'll use microsoft/DialoGPT-large which is good for conversations
        const response = await fetch(
          "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              inputs: {
                past_user_inputs: ["Hello, I'm shopping for some products"],
                generated_responses: ["Hi there! I'm Guidely's shopping assistant. What kind of product are you looking for today?"],
                text: message
              }
            })
          }
        );
        
        console.log('Hugging Face API response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Hugging Face API error details:', errorData);
          throw new Error(`Hugging Face API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }
        
        const data = await response.json();
        console.log('Hugging Face API response:', data);
        
        // Extract generated text from response
        const responseText = data.generated_text || "I'm sorry, I couldn't process that. How can I help you find products today?";
        
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