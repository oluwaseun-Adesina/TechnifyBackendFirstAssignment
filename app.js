const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

// middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Import Routes
const userRoute = require('./routes/userRoute');

// Route Middlewares
app.use('/api/user', userRoute);

// Connect to DB
mongoose.connect(process.env.LocaldbURI, { useNewUrlParser: true }, () => {
    console.log('Connected to DB!');
    // }).catch(err => {
    // console.log('Error connecting to DB: ', err);
});

// Start listening for requests
app.listen(port, () => console.log(`Server Up and running on port ${port}`));

