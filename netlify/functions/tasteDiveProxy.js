const fetch = require('node-fetch'); // Required for Node <18

exports.handler = async function(event) {
  const tasteKey = process.env.VITE_TASTEDIVE_API_KEY;
  const query = event.queryStringParameters.q;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing query parameter.' }),
    };
  }

  const apiUrl = `https://tastedive.com/api/similar?q=${encodeURIComponent(query)}&type=movie&limit=5&info=1&k=${tasteKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API request failed.' }),
    };
  }
};
