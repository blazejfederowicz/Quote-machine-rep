const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios').default;

dotenv.config({ path: __dirname + '/secure.env' });

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.error('API_KEY is not defined in the environment variables.');
    process.exit(1);
}

app.get('/api/data', async(req, res) => {
    res.json({apiKey})
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});