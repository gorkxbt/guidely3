# Guidely - AI-Powered Shopping Assistant

Guidely is an AI-powered shopping assistant platform that transforms traditional product browsing into intelligent, guided shopping experiences. The platform leverages advanced machine learning algorithms and natural language processing to process vast product catalogs and deliver hyper-personalized recommendations through a conversational interface.

## Features

- **AI-Powered Conversational Shopping**: Natural language interactions to understand user intent and preferences
- **Multi-Platform Product Search**: Aggregates products from Google Shopping, eBay, Amazon, and more
- **Real-Time Personalization**: Tailored recommendations based on shopper preferences and behavior
- **$GLY Token Economy**: Blockchain-based subscription model with utility token benefits
- **Interactive Demo**: Try the AI shopping assistant with simulated product recommendations

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Framer Motion
- **AI/ML**: Integration with LLM via OpenAI API
- **APIs**: Google Shopping, eBay, Amazon product data (via third-party services)
- **Blockchain**: Solana (for $GLY token)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/guidely.git
   cd guidely
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory (optional for enhanced API functionality):
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
   NEXT_PUBLIC_GOOGLE_CSE_ID=your_google_custom_search_engine_id
   NEXT_PUBLIC_EBAY_API_KEY=your_ebay_api_key
   NEXT_PUBLIC_RAPID_API_KEY=your_rapid_api_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Demo Mode

The application includes a fully functional demo mode that simulates interactions with the AI shopping assistant and product APIs. This allows you to experience the platform's capabilities without requiring actual API keys.

To try the enhanced demo with real API integration:

1. Set up the required API keys as described in the `API_INTEGRATION.md` file
2. The demo will automatically detect and use the available API services

## Project Structure

- `/app` - Next.js pages and app router
- `/components` - Reusable UI components
- `/public` - Static assets
- `/styles` - Global CSS and Tailwind configuration
- `/app/api` - API routes for LLM and product search

## Key Pages

- **Home**: Marketing landing page with platform overview
- **Documentation**: Technical documentation with platform details
- **Demo**: Interactive AI shopping assistant experience

## API Integration

The project supports integration with multiple APIs to provide real product data and AI capabilities. See `API_INTEGRATION.md` for detailed setup instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built as a modern fork of the Gengage platform
- Utilizes the latest in AI and e-commerce technologies 