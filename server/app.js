const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user-routes');
const serviceRoutes = require('./routes/service-router');

const app = express();

app.use(bodyParser.json());

app.use('/api/users/', userRoutes);
app.use('/api/services/', serviceRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(5000);
