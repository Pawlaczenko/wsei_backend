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

app.listen(process.env.PORT || 3000);
