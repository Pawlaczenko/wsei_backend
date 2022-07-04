require('dotenv').config();

process.on('uncaughtException', err => {
    console.log("____Uncought exception____");
    console.log(err.name,err.message);
    process.exit(1);
});

const express = require('express');
const app = express();

const ErrorHandler = require('./utils/errorHandler');
const errorControler = require('./controllers/errorController');

app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.once('open',() => console.log("Connected to mongoose"));

app.all('*', (req,res,next)=> {
    next(new ErrorHandler(`Can't find ${req.originalUrl}`,404));
});

app.use(errorControler);

const server = app.listen(process.env.PORT || 3000);

process.on('unhandledRejection', err => {
    console.log("____nhandled rejection____");
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    });
});

