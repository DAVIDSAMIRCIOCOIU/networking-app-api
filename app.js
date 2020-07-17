require('dotenv').config()

// Dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./api/database/database');

const app = express();

database.connect();

// Routes
const userRoute = require('./api/routes/user');

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
}));

// Use Routes
app.use('/user', userRoute);

/** Creates and passes a 404 error if the route is not a register route*/ 
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

/** Catches errors and returns a message */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

/** Starts the server */
app.listen(process.env.PORT, () => {
    console.log("Server started");
});