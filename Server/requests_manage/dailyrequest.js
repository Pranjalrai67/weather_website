import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY environment variable not set.");
  process.exit(1);
}

// Use new class name
const ai = new GoogleGenerativeAI(apiKey);

async function get_daily_json(city) {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" }); // or "gemini-1.5-pro"

  const prompt = `
  Provide this week's  weather forecast for ${city}  .
  Format the output as a JSON array of objects, like:
  \`\`\`json
  [
    {
      "day": "Monday",
      "high": "30°C",
      "low": "22°C",
      "conditions": "Cloudy"
    },
    {
      "day": "Tuesday",
      "high": "31°C",
      "low": "23°C",
      "conditions": "Sunny"
    }
  ]
  \`\`\`
  Only respond with the JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
  const cleanedText = text
  .replace(/^```json\s*/i, '')
  .replace(/```$/, '')
  .replace(/```$/, '')
  .trim();
    let forecast;
  let newforecsat = cleanedText.slice(0, -3);
try {

  forecast = JSON.parse(cleanedText);
  console.log(forecast)
  return forecast;
} catch (err) {
  console.error("Failed to parse Gemini JSON:", err);
  return null;
}
    
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
}
async function retryGetDailyJSON(city, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await get_daily_json(city);
      return result;
    } catch (err) {
      console.warn(`Attempt ${i + 1} failed: ${err.message}`);
      if (i < retries - 1) {
        await wait(1000 * (i + 1)); // waits 1s, 2s, 3s...
      } else {
        throw err;
      }
    }
  }
}
export default retryGetDailyJSON;

async function main() {
  await retryGetDailyJSON("New York");
}

main();
