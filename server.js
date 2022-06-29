if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
const directorRouter = require('./routes/directors');
const movieRouter = require('./routes/movies');
const actorRouter = require('./routes/actors');
const genreRouter = require('./routes/genres');

app.use(express.static('public'));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',() => console.log("Connected to mongoose"));

app.use('/',indexRouter);
app.use('/directors',directorRouter);
app.use('/movies',movieRouter);
app.use('/actors',actorRouter);
app.use('/genres',genreRouter);

app.all('*', (req,res,next)=> {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl}`
    // })

    const err = new Error(`Can't find ${req.originalUrl}`);
    err.status = "fail";
    err.statusCode = 404;

    next(err);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

app.listen(process.env.PORT || 3000);
