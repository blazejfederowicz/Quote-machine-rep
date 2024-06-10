const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.get('/api/data', (req, res) => {
    console.log("Request received for /api/data");
    res.json({plz:"apiKey"})
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});