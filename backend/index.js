// Import dotenv
require('dotenv').config({ path: './.env' });

// Import Express
const express = require('express');
// Import BodyParser
const bodyParser = require('body-parser');
// Import CORS
const cors = require('cors');

// Create App
const app = express();

// Get the Port
const port = process.env.PORT || 5000;

// Set up body-parser middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS
app.use(cors());

app.all("*", (req, res) => {
    res.status(404).send("`~` Page Not Found `~`");
})

app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
})