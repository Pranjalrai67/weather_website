
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const apiKey = process.env.GEMINI_API_KEY;

// if (!apiKey) {
//   console.error("GEMINI_API_KEY environment variable not set.");
//   process.exit(1);
// }

// // Use new class name
// const ai = new GoogleGenerativeAI(apiKey);

// async function get_hourly_json(city) {
//   const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-1.5-pro"

//   const prompt = `
//   Provide a today's hourly weather forecast for ${city}.
//   Format the output as a JSON array of objects, like:
//   \`\`\`json
//   [
//   {
//     time: "1:00 AM - 2:00 AM",
//     temperature: "22°C",
//     conditions: "Clear night",
//     rainChance: "Very Low",
//   },
//   {
//     time: "2:00 AM - 3:00 AM",
//     temperature: "21°C",
//     conditions: "Clear night",
//     rainChance: "Very Low",
//   },
//   {
//     time: "3:00 AM - 4:00 AM",
//     temperature: "21°C",
//     conditions: "Clear",
//     rainChance: "Very Low",
//   },
//   {
//     time: "4:00 AM - 5:00 AM",
//     temperature: "20°C",
//     conditions: "Partly Cloudy",
//     rainChance: "Low",
//   },
//   {
//     time: "5:00 AM - 6:00 AM",
//     temperature: "20°C",
//     conditions: "Morning haze",
//     rainChance: "Low",
//   },
//   {
//     time: "6:00 AM - 7:00 AM",
//     temperature: "21°C",
//     conditions: "Partly Sunny",
//     rainChance: "Low",
//   },
//   {
//     time: "7:00 AM - 8:00 AM",
//     temperature: "23°C",
//     conditions: "Sunny",
//     rainChance: "Low",
//   },
//   {
//     time: "8:00 AM - 9:00 AM",
//     temperature: "25°C",
//     conditions: "Mostly Sunny",
//     rainChance: "Low",
//   },
//   {
//     time: "9:00 AM - 10:00 AM",
//     temperature: "27°C",
//     conditions: "Sunny",
//     rainChance: "Low",
//   },
//   {
//     time: "10:00 AM - 11:00 AM",
//     temperature: "28°C",
//     conditions: "Sunny",
//     rainChance: "Low",
//   },
//   {
//     time: "11:00 AM - 12:00 PM",
//     temperature: "29°C",
//     conditions: "Sunny",
//     rainChance: "Low",
//   },
//   {
//     time: "12:00 PM - 1:00 PM",
//     temperature: "30°C",
//     conditions: "Mostly Sunny",
//     rainChance: "Moderate",
//   },
//   {
//     time: "1:00 PM - 2:00 PM",
//     temperature: "31°C",
//     conditions: "Partly Cloudy",
//     rainChance: "Moderate",
//   },
//   {
//     time: "2:00 PM - 3:00 PM",
//     temperature: "31°C",
//     conditions: "Cloudy",
//     rainChance: "Moderate",
//   },
//   {
//     time: "3:00 PM - 4:00 PM",
//     temperature: "30°C",
//     conditions: "Cloudy with light rain",
//     rainChance: "Moderate to High",
//   },
//   {
//     time: "4:00 PM - 5:00 PM",
//     temperature: "29°C",
//     conditions: "Light rain",
//     rainChance: "High",
//   },
//   {
//     time: "5:00 PM - 6:00 PM",
//     temperature: "28°C",
//     conditions: "Rainy",
//     rainChance: "High",
//   },
//   {
//     time: "6:00 PM - 7:00 PM",
//     temperature: "27°C",
//     conditions: "Rain tapering off",
//     rainChance: "Moderate",
//   },
//   {
//     time: "7:00 PM - 8:00 PM",
//     temperature: "26°C",
//     conditions: "Mostly Cloudy",
//     rainChance: "Moderate",
//   },
//   {
//     time: "8:00 PM - 9:00 PM",
//     temperature: "25°C",
//     conditions: "Cloudy",
//     rainChance: "Low",
//   },
//   {
//     time: "9:00 PM - 10:00 PM",
//     temperature: "24°C",
//     conditions: "Partly Cloudy",
//     rainChance: "Low",
//   },
//   {
//     time: "10:00 PM - 11:00 PM",
//     temperature: "23°C",
//     conditions: "Clear night",
//     rainChance: "Very Low",
//   },
//   {
//     time: "11:00 PM - 12:00 AM",
//     temperature: "22°C",
//     conditions: "Clear night",
//     rainChance: "Very Low",
//   },
// ]
//   \`\`\`
//   Only respond with the JSON.
//   `;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = await response.text();
//   const cleanedText = text
//   .replace(/^```json\s*/i, '')
//   .replace(/```$/, '')
//   .replace(/```$/, '')
//   .trim();
//   console.log(cleanedText)
//     let forecast;
    
//   let newforecsat = cleanedText.slice(0, -4);
// try {

//   forecast = JSON.parse(newforecsat);
// //   console.log(forecast)
//   return forecast;
// } catch (err) {
//   console.error("Failed to parse Gemini JSON:", err);
//   return null;
// }
    
//     console.log("Gemini's response:", cleanedText);
//     return text;
//   } catch (error) {
//     console.error("Error generating content:", error);
//     return null;
//   }
// }

// export default get_hourly_json;

// async function main() {
//   await get_hourly_json("Bhilai");
// }

// main();
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY environment variable not set.");
  process.exit(1);
}

const ai = new GoogleGenerativeAI(apiKey);

async function get_hourly_json(city) {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Provide a full 24-hour weather forecast for today in ${city}, starting from 1:00 AM to 12:00 AM (midnight), with hourly breakdown.

Format the output as a JSON array like this:
\`\`\`json
[
  {
    "time": "1:00 AM - 2:00 AM",
    "temperature": "22°C",
    "conditions": "Clear night",
    "rainChance": "Very Low"
  },
  {
    "time": "2:00 AM - 3:00 AM",
    "temperature": "21°C",
    "conditions": "Clear night",
    "rainChance": "Very Low"
  }
]
\`\`\`
Only respond with the JSON array, no extra explanation.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const cleanedText = text
      .replace(/^```json\s*/i, '')
      .replace(/```$/, '')
      .trim();
    console.log(cleanedText);
    let frocast = cleanedText.slice(0,-3);
      console.log("Cleaned Gemini Response:\n", frocast);
    try {
       let forecast = JSON.parse(cleanedText);
      return forecast;
    } catch (err) {
      console.error("❌ Failed to parse Gemini JSON:", err.message);
      return null;
    }
  } catch (error) {
    console.error("❌ Error generating content:", error);
    return null;
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryGetHourlyJSON(city, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await get_hourly_json(city);
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
export default retryGetHourlyJSON;

async function main() {
  const forecast = await get_hourly_json("Bhilai");
  console.log("Parsed forecast:\n", forecast);
}

main();
