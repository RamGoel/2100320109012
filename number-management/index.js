const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/sort_numbers', async (req, res) => {
  const { urls } = req.query;
  console.log(req.query, "ncdnc")

  console.log(urls, "dmkd")
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Please provide valid "urls" as query parameters.' });
  }

  try {
    const fetchNumbersPromises = urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        return response.data.numbers;
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        return [];
      }
    });

    const numbersArrays = await Promise.all(fetchNumbersPromises);
    const numbers = numbersArrays.flat();

    numbers.sort((a, b) => a - b);

    return res.json({ numbers });
  } catch (error) {
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
