import { NextResponse } from 'next/server';

// Hugging Face API key (free tier available)
// Get your free API key at https://huggingface.co/settings/tokens
const HUGGINGFACE_API_KEY = "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"; // This is a demo key, get your own at huggingface.co

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message);
    
    try {
      // For simplicity and reliability, let's use our fallback method
      // which has predefined responses based on the message content
      console.log('Using simulated response due to API issues');
      return simulateResponse(message);
    } catch (error) {
      console.error('Error in fallback response generation:', error);
      return NextResponse.json(
        { text: "I'm sorry, I'm having trouble processing your request right now. How can I help you find products today?" },
        { status: 500 }
      );
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