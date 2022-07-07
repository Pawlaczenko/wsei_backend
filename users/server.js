require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

process.on('uncaughtException', err => {
    console.log("____Uncought exception____");
    console.log(err.name,err.message);
    process.exit(1);
});

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const ErrorHandler = require('./utils/errorHandler');
const errorControler = require('./controllers/errorController');

app.use(mongoSanitize());
app.use(xss()); 
app.use(hpp()); //parameter polution

app.use(cookieParser());

const userRouter = require('./routes/users');

app.use(express.json());
app.use('/users',userRouter);

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

const server = app.listen(process.env.PORT || 3002, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`)
});

process.on('unhandledRejection', err => {
    console.log("____nhandled rejection____");
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    });
});

