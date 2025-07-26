//const { onRequest } = require("firebase-functions/v2/https");
const { onCall, https } = require("firebase-functions/v2/https");
const axios = require("axios");
const OpenAI = require("openai");

const cheerio = require("cheerio"); 

exports.getInsights = onCall( {
    secrets: ["XAI_API_KEY"] },
    async (request) => {
        /*
        if (!req.auth) {
            throw new Error("User must be authenticated.");
        }
        */
    
    //const xaiApiUrl = 'https://api.x.ai/v1'

    try {
        const { grokPrompt } = request.data;
        console.log("Received grokPrompt:", grokPrompt);

        if (!grokPrompt) {
        throw new https.HttpsError(
          "invalid-argument",
          "grokPrompt is required."
        );
      }

        const apiKey = process.env.XAI_API_KEY;
        if (!apiKey) {
        throw new https.HttpsError(
          "internal",
          "API key not configured."
        );
      }

        /*
        if (!grokPrompt) {
        return res.status(400).json({ error: 'grokPrompt is required' });
        }

        if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
        }
        */

        // Initialize OpenAI client
        const client = new OpenAI({
            apiKey,
            baseURL: 'https://api.x.ai/v1',
        });

    // Make the API call
    const completion = await client.chat.completions.create({
      model: 'grok-3-latest',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides insights on expenses.',
        },
        {
          role: 'user',
          content: grokPrompt,
        },
      ],
    });

    // Extract the response
    const output = JSON.parse(completion.choices[0].message.content);
    return output;  
    } catch (error) {
        console.error("Error calling xAI API:", error);
        //res.status(500).send("Error calling xAI API");
    }
})

exports.getDeals = onCall( {}, async (request) => {
  try {
    const url = 'https://singpromos.com/dining-restaurants-food/';
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const deals = [];

    // Select deal articles based on the website's structure
    $('article').each((index, element) => {
      const title = $(element).find('.entry-title a').text().trim();
      const link = $(element).find('.entry-title a').attr('href');
      const summary = $(element).find('.entry-summary p').first().text().trim();
      const image = $(element).find('.mh-loop-thumb a img').attr('src') || '';

      if (title && link) {
        deals.push({ title, link, summary, image });
      }
    });

    return { deals };
  } catch (error) {
    console.error('Error scraping deals:', error);
    throw new https.HttpsError('internal', 'Failed to scrape deals');
  }
});

const base_url = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&";
const topicList = ["blockchain"];

exports.getNewsSentiment = onCall( {
    secrets: ["NEWS_API_KEY"] },
    async (request) => {
      try {
        const combinedTopics = "topics=" + topicList.join(",");
        
        // Get API URL (replicating getApiUrl)
        const apiKey = process.env.NEWS_API_KEY;
        
        const url = `${base_url}${combinedTopics}&apikey=${apiKey}`;
        console.log("API URL:", url);

        // Fetch data from Alpha Vantage
        const response = await axios.get(url);
        const newsData = response.data;

        // Return the news sentiment data
        return {
          status: "success",
          data: newsData.feed || [], // Return the feed or an empty array
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        console.error("Error fetching news sentiment:", error.message);
        throw new https.HttpsError(
          "internal",
          `Failed to fetch news sentiment: ${error.message}`
        );
    }
});