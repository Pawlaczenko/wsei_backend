const {setupProxies} = require("./proxy");

const express = require('express')
const app = express()

const ROUTES = [
    {
        url: '/movies',
        proxy: 'movies:3001'
    },
    {
        url: '/users',
        proxy: 'users:3002'
    }
]

setupProxies(app, ROUTES);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`)
})