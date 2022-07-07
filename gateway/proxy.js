const proxy = require('express-http-proxy');

const setupProxies = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, proxy(r.proxy));
    })
}

exports.setupProxies = setupProxies