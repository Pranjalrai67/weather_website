import { useState } from "react";
import axios  from 'axios'

const hourlyForecastData = [
  {
    time: "11:00 AM - 12:00 PM",
    temperature: "28-29°C",
    conditions: "Cloudy",
    rainChance: "Low",
  },
  {
    time: "12:00 PM - 1:00 PM",
    temperature: "29°C",
    conditions: "Cloudy with a possibility of light rain",
    rainChance: "Moderate",
  },
  {
    time: "1:00 PM - 2:00 PM",
    temperature: "29°C",
    conditions: "Light rain likely",
    rainChance: "Moderate to High",
  },
  {
    time: "2:00 PM - 3:00 PM",
    temperature: "29°C",
    conditions: "Light rain likely",
    rainChance: "Moderate to High",
  },
  {
    time: "3:00 PM - 4:00 PM",
    temperature: "28-29°C",
    conditions: "Light rain expected to continue",
    rainChance: "Moderate to High",
  },
  {
    time: "4:00 PM - 5:00 PM",
    temperature: "28°C",
    conditions: "Light rain possible, becoming more intermittent",
    rainChance: "Moderate",
  },
];



export default function App() {
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState(""); 
  const [loading, setloading] = useState(false); 
  const [dailyForecastData, setDailyForecastData] = useState([]);
  const [hourlyForecastData, sethourlyForecastData] = useState([]);
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmittedCity(city);
  setloading(true);
  try {
    const dailyResponse = await axios.get('http://localhost:3000/' + city);
    console.log(dailyResponse)
      setDailyForecastData(dailyResponse.data);

    const hourlyResponse = await axios.get('http://localhost:3000/' + city+'/hourly'); 
    sethourlyForecastData(hourlyResponse.data);
    setloading(false);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🌤 Weather Forecast
        </h1>

        {/* City Input and Daily Forecast */}
        <div className="mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <input
              type="text"
              placeholder="Enter City Name"
              className="px-4 py-3 rounded-md border border-gray-300 w-full md:w-1/2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-md shadow hover:bg-blue-700 transition"
            >
              Show Forecast
            </button>
          </form>

          {submittedCity && (
            <h2 className="mt-6 text-center text-2xl text-gray-700">
              Forecast for: <span className="text-blue-800">{submittedCity}</span>
            </h2>
          )}
          {loading && (
  <div className="text-center mt-6">
    <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
    <p className="text-gray-600 mt-2">Loading forecast...</p>
  </div>
)}

          {/* Simplified Daily Forecast */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {dailyForecastData.map((day, index) => (
              <div
                key={index}
                className="bg-green-50 rounded-lg p-4 shadow-sm flex flex-col items-center w-32"
              >
                  <p className="text-2xl text-center  ">
                  {day.conditions.toLowerCase().includes("sunny") ? '☀️' :
                  day.conditions.toLowerCase().includes("cloudy") ? '☁️' :
                  day.conditions.toLowerCase().includes("rain") ? '🌧️' :
                  '🌈'}
                </p>
                <p className="font-semibold">{day.day}</p>
                <p className="text-sm">
                  <span className="text-blue-600">Min:</span> {day.low}
                </p>
                <p className="text-sm">
                  <span className="text-red-600">Max:</span> {day.high}
                </p>


              </div>
            ))}
          </div>
        </div>

        {/* Hourly Forecast */}
        {submittedCity && <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Hourly Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hourlyForecastData.map((hour, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
              >
                <h4 className="text-xl font-semibold text-gray-800">{hour.time}</h4>
                <p className="text-gray-700 mt-2">
                  <span role="img" aria-label="temperature">🌡️</span> <strong>Temperature:</strong> {hour.temperature}
                </p>
                <p className="text-gray-700 mt-1">
                  <span role="img" aria-label="conditions">☁️</span> <strong>Conditions:</strong> {hour.conditions}
                </p>
                <p className="text-gray-700 mt-1">
                  <span role="img" aria-label="rain">🌧️</span> <strong>Rain:</strong>{" "}
                  <span className={
                    hour.rainChance.includes("High")
                      ? "text-red-600 font-bold"
                      : hour.rainChance.includes("Moderate")
                      ? "text-yellow-600 font-semibold"
                      : "text-green-600 font-semibold"
                  }>
                    {hour.rainChance}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>}
      </div>
    </div>
  );
}