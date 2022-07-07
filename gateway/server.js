const {setupProxies} = require("./proxy");

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const app = express()

const ROUTES = [
    {
        url: '/movies/',
        proxy: 'movies:3001'
    },
    {
        url: '/users/',
        proxy: 'users:3002'
    }
]

app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/movies', proxy('127.0.0.1:3001'));
app.use('/users', proxy('127.0.0.1:3002'));

//setupProxies(app, ROUTES);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`)
});