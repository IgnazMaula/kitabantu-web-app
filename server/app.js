const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes');
const serviceRoutes = require('./routes/service-routes');
const orderRoutes = require('./routes/order-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.use('/api/users/', userRoutes);
app.use('/api/services/', serviceRoutes);
app.use('/api/orders/', orderRoutes);

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
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wsn80.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => app.listen(5000))
    .catch((err) => {
        console.log(err);
    });
