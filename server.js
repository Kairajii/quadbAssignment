// server

const express = require('express');
const axios = require('axios');
const cors = require('cors')
const { Pool } = require('pg');

const app = express();
app.use(cors())
const port = 5000;

const connectionString = 'postgresql://tusharkaira456:XQ1r9hFDEnSt@ep-purple-pond-47137082.ap-southeast-1.aws.neon.tech/crypto_data?sslmode=require';

const pool = new Pool({
  connectionString: connectionString,
});


const fetchDataAndStoreInDatabase = async () => {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const tickers = response.data;
  
      // Extract the top 10 tickers
      const top10Tickers = Object.values(tickers).slice(0, 10);
      //console.log({top10Tickers})
  
      for (const tickerSymbol in top10Tickers) {
        const ticker = top10Tickers[tickerSymbol];
        const { base_unit, last, buy, sell, volume, name } = ticker;
        console.log({
            base_unit, last, buy, sell, volume, name
        })
  
        // Store data in the PostgreSQL database
        await pool.query(
          'INSERT INTO crypto_info (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
          [name, last, buy, sell, volume, base_unit]
        );
      }
  
      console.log('Data stored in the database.');
    } catch (error) {
      console.error('Error fetching data:', error.message);
      console.error('Error stack:', error.stack);
    }
  };

//fetchDataAndStoreInDatabase();


app.get('/cryptoData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM crypto_info');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data from the database:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
