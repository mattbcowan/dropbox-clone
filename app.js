const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  session = require("express-session"),
  flash = require("connect-flash"),
  morgan = require("morgan"),
  cookieParser = require("cookie-parser"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local"),
  User = require("./app/users/user"),
  port = 3000;

// Assigning mongoose promise library and connecting to DB
const dbConfig = require("./config/database.config.js");

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to Database.");
  })
  .catch(err => {
    console.log("Could not connect to Database. Exiting now...", err);
    process.exit();
  });

//require("./auth/passport")(passport); // pass passport for config

// set up express app
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// Using Body Parser to parse our requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View Engine
app.set("view engine", "pug");
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Passport Config
app.use(
  session({
    secret: "This is my secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
require("./app/routes")(app, passport);

app.listen(port, () =>
  console.log(`Dropbox clone is listening on port ${port}`)
);
