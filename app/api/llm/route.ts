import { NextResponse } from 'next/server';

// This is a simulated response function since we don't have actual API keys in this environment
export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // In a real implementation, this would call OpenAI or another LLM provider
    // For example:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     messages: [
    //       { role: 'system', content: 'You are Guidely, an AI shopping assistant that helps users find products.' },
    //       { role: 'user', content: message }
    //     ],
    //     temperature: 0.7
    //   })
    // });
    // const data = await response.json();
    // return NextResponse.json({ text: data.choices[0].message.content });
    
    // For demo purposes, we'll simulate responses
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error('Error processing LLM request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 