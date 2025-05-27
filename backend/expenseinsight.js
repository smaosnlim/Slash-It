import functions from 'firebase-functions';
import fetch from 'node-fetch';

const API_KEY = xai-CISpdbuNRBfzspZWG48Iv2VmGdBQ7SONl5uYgtsMnqiVomr0rnOMdr5UHnA05YoJeno6qYobI7bXu4S4;

//const categories = ['Food&Drink', "Transport", "Utilities", "Entertainment", "Savings", "Other"];

export const getInsights = functions.https.onCall(async (data, context) => {
    try {
        const prompt = `
      Analyze the following monthly expenses and provide insights in JSON format with:
      - total: Total spending
      - breakdown: Object with category names as keys and total amounts as values
      - tips: Array of 2-3 actionable spending tips
      Expenses:
      ${expenseSummary}
      Return JSON only.`;

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
        console.error("Error generating insights:", error);
        throw new functions.https.HttpsError('internal', `Failed to generate insights: ${error.message}`);

    }
})