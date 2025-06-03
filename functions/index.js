const { onRequest } = require("firebase-functions/v2/https");
const { onCall, https } = require("firebase-functions/v2/https");
const axios = require("axios");
const OpenAI = require("openai");

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



/*
const { onRequest } = require('firebase-functions/v2/https');
const { OpenAI } = require('openai');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

exports.getInsights = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { grokPrompt } = req.body;

    if (!grokPrompt) {
      return res.status(400).json({ error: 'grokPrompt is required' });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

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
    const output = completion.choices[0].message;

    // Sanitize data for Firestore (remove undefined values)
    const dataToSave = {
      grokPrompt,
      responseContent: output.content || '',
      timestamp: new Date().toISOString(),
      original: output.original || null, // Replace undefined with null
    };

    // Save to Firestore
    await db.collection('insights').add(dataToSave);
    console.log('Saved to Firestore:', dataToSave);

    // Return the response
    res.status(200).json(output);
  } catch (error) {
    console.error('Error in function:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack,
    });
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});
*/