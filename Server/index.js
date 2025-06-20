import express from 'express';
import cors from 'cors'
import retryGetDailyJSON from './requests_manage/dailyrequest.js'; // .js is mandatory in ESM
import retryGetHourlyJSON from './requests_manage/hourlyrequest.js'; // .js is mandatory in ESM
const app = express();

app.use(cors());

const port = 3000;

app.get('/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const forecast = await retryGetDailyJSON(city);
    res.send(forecast);
  } catch (err) {
    console.error('Error fetching forecast:', err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/:city/hourly', async (req, res) => {
  const city = req.params.city;

  try {
    const forecast = await retryGetHourlyJSON(city);
    res.send(forecast);
  } catch (err) {
    console.error('Error fetching forecast:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
