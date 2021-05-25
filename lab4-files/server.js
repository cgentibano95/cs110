// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const Room = require('./models/Rooms');
const Messages = require('./models/Messages');
const User = require('./models/Usernames');

const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


var curr_room = ""

app.post('/roomName', (req, res) =>{
    curr_room = req.body.room;
    res.redirect(req.body.room);
})

app.post('/createMessage', (req, res) =>{
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const newMessage = new Messages({
    room_id: req.body.room_name,
    user: req.body.username,
    message: req.body.message,
    date: new Date().toLocaleDateString("en-US", options),
  })
  newMessage
  .save()
  .then(item => console.log(item))
  .catch(err => console.log(err));
})


app.get("/getMessages", (req, res)=>{

  Messages.find({room_id: req.cookies.roomName}).lean().then(items => 
  {
    res.json(items);
  })
})

app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));