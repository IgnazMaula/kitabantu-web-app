const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes');
const serviceRoutes = require('./routes/service-router');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/users/', userRoutes);

app.use('/api/services/', serviceRoutes);

app.use((req, res, next) => {
    next(new HttpError('Could not find this route.', 404));
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect('mongodb+srv://ignazmaula:sAnfUUO9J473iz4J@cluster0.wsn80.mongodb.net/kitaBantu?retryWrites=true&w=majority')
    .then(() => app.listen(5000))
    .catch((err) => {
        console.log(err);
    });
