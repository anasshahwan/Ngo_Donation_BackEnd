const express = require('express'); // create server using express 
const app = express();
const morgan = require('morgan'); // mogran middle ware for handling the errors.
const bodyParser = require("body-parser"); // use bodyParse so we can access to the body of the request. 
const mongoose = require("mongoose");


const userRoutes = require('./api/routes/users');
const authRoutes = require('./api/routes/auth');
const roleRoutes = require('./api/routes/roles');
const donTypeRoutes = require('./api/routes/donationTypes');
const donationRoutes = require('./api/routes/donations');

const url = `mongodb+srv://Admin:Test.123@ngodonationdb.t82yp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

// Routes which should handle requests
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/roles', roleRoutes);
app.use('/donationTypes', donTypeRoutes);
app.use('/donations', donationRoutes);



// run this function in case happen any error .
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// using morgan middleware  we can handle the error 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;