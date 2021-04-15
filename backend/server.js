const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
var xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');
const path = require('path');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Configuring the database
const dbConfig = require('./app/config/database.config.js');
const mongoose = require('mongoose');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());

// to prevent ddos attack 
const limit = rateLimit({
  max: 100,// max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of ban each ip depass 100 request  
  message: 'Too many requests !' // message to send
});

global.ddos = limit;
global.__basedir = __dirname;

// XSS attacks
app.use(xss());

//helmet protection lol helmet LVL 3 HAHAHAHA
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use("/", express.static(path.join(__dirname, "/app/img")));

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


// NoSQL Injection Attacks
app.use(mongoSanitize({
  replaceWith: 'nice_try'
}));

require("./app/routes/admin.routes")(app);
require("./app/routes/buyer.routes")(app);
require("./app/routes/seller.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/packs.routes")(app);
require("./app/routes/cart.routes")(app)
require("./app/routes/checkout.routes")(app)

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })