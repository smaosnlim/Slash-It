/*
import axios from 'axios';

//const BASE_URL = 'https://us-central1-slashit-8f9be.cloudfunctions.net/getInsights';
const BASE_URL = "https://getinsights-wtsh7ny5qa-uc.a.run.app"
export const getInsights = async (grokPrompt) => {
  try {
    const response = await axios.post(BASE_URL, {
      grokPrompt,
    });
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};
*/