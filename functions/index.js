const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
import {onCall} from "firebase-functions/v2/https";

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

export const getInsights = onCall({
  secrets: ["XAI_API_KEY"],
  }, async () => {
    const secretKey = process.env.SECRET_API_KEY;
    logger.info("Hello logs!", {structuredData: true});
    return {"secret key": secretKey};
  }
)

/*
exports.getInsights = onRequest(async (req, res) => {
    const original = req.query.text;
    const writeResult = await getFirestore()
      .collection("messages")
      .add({original: original});

    res.json({result: `Message with ID: ${writeResult.id} added.`});
})
*/

/*
import functions from 'firebase-functions';
import fetch from 'node-fetch';

const API_KEY = functions.config().xai.api_key;

export const getInsights = functions.https.onCall(async (data, context) => {
    try {
      // Validate input expenses
      const expenses = data.expenses || [];
      if (!Array.isArray(expenses) || expenses.length === 0) {
        throw new functions.https.HttpsError('invalid-argument', 'Expenses must be a non-empty array');
      }
  
      // Join expenses into a string for the prompt
      const expenseSummary = expenses.join('\n');
      const prompt = `
        Analyze the following monthly expenses and provide insights in JSON format with:
        - total: Total spending
        - breakdown: Object with category names as keys and total amounts as values
        - tips: Array of 2-3 actionable spending tips
        Expenses (format: description,category,$amount):
        ${expenseSummary}
        Return JSON only.
      `;
  
      // Call Grok API
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new functions.https.HttpsError('internal', `Grok API error: ${errorData.error || response.statusText}`);
      }
  
      const data = await response.json();
      const insights = JSON.parse(data.choices[0].message.content);
  
      return insights;
    } catch (error) {
      console.error('Error generating insights:', error);
      throw new functions.https.HttpsError('internal', `Failed to generate insights: ${error.message}`);
    }
  });
  */