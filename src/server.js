/**
 * @Author_KieuVu   Nodejs.v15
 * @Design_Pattern  Model - View - Controller
 */

const express = require('express');
const routeMatching = require("./routes");
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./ultis/db');
const env = require('dotenv');

//Start server
const app = express();

//Dotenv Config
env.config();

//Cookie Parser
app.use(cookieParser());

//Encode data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to DB
db.connect();

//Static Files
app.use(express.static(path.join(__dirname + '/public')));

//Set Views Engine
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname + "/resources/views/layouts"),
  partialsDir: [path.join(__dirname + "/resources/views/partials"),],
}));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname + "/resources/views"));

//Route
routeMatching(app);

//Listen port
app.listen(process.env.PORT || 3000, () => {
  console.log(`App started at http://localhost:${process.env.PORT}`);
});