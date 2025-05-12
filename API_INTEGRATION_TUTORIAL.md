# Easy API Integration Tutorial for Guidely

This beginner-friendly guide will help you set up the Guidely demo with real AI and product search capabilities.

## What You Need

1. An OpenAI API key (for the AI shopping assistant)
2. A Google Custom Search Engine ID and API key (for product search)

Don't worry if you don't have these - the app will work in demo mode without them!

## Step 1: Set Up OpenAI API

1. Go to [OpenAI's Platform](https://platform.openai.com/signup)
2. Create a free account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (it will look like `sk-...`)

## Step 2: Set Up Google Custom Search

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the "Custom Search API" in the API Library
4. Create API credentials to get your API key
5. Next, go to [Programmable Search Engine](https://programmablesearchengine.google.com/)
6. Create a new search engine
7. Under "Sites to search" add shopping websites like:
   - amazon.com
   - bestbuy.com
   - walmart.com
   - target.com
   - ebay.com
8. Check "Search the entire web" to expand results
9. Under the "Setup" tab, find your Search Engine ID (cx value)

## Step 3: Add Your API Keys to Guidely

1. Create a file named `.env.local` in the root of your Guidely project
2. Add the following lines:

```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
NEXT_PUBLIC_GOOGLE_CSE_ID=your_search_engine_id_here
```

3. Replace the placeholders with your actual API keys

## Step 4: Start the Application

Run the following command to start the development server:

```
npm run dev
```

Visit `http://localhost:3000/demo` to try out your enhanced Guidely demo!

## Troubleshooting

### My OpenAI API isn't working

- Make sure your API key is correct
- Check if you have billing set up on your OpenAI account
- The app will automatically fall back to demo mode if there are any issues

### My Google product search isn't working

- Verify your API key and Search Engine ID are correct
- Make sure you've enabled the Custom Search API in Google Cloud
- Check your Google Cloud billing status
- The app will show simulated product data if Google API fails

### Rate Limits

- **OpenAI**: Free tier has usage limits
- **Google Custom Search API**: Free tier allows 100 queries per day

## Understanding the Code

- `app/api/llm/route.ts`: Handles AI assistant functionality
- `app/api/products/route.ts`: Manages product search
- Both have fallback mechanisms if APIs aren't available

## Next Steps

Once you're comfortable with the basic setup, you can explore:

1. Adding more API integrations (like eBay or Amazon)
2. Customizing the AI assistant's behavior
3. Improving the product search functionality

Happy coding! 