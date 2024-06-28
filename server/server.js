const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')


dotenv.config({ path: __dirname + '/secure.env' });

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const allowedOrigins = [
    'quote-machine-rep.vercel.app',
    'quote-machine-rep-git-main-blazejs-projects-e5b94814.vercel.app',
    'quote-machine-gmi2fhf5g-blazejs-projects-e5b94814.vercel.app',
    'http://localhost:5173'
  ];

const corsOptions = {
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };

  app.use(cors(corsOptions));

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