const express           = require('express'),
      app               = express(),
      bodyParser        = require('body-parser'),
      mongoose          = require('mongoose'),
      passport          = require('passport'),
      session           = require('express-session'),
      methodOverride    = require('method-override'),
      LocalStrategy     = require('passport-local'),
      User              = require('./app/users/user'),
      port              = 3000

// Requiring Routes
const fileHandlerRoute  = require('./app/file_handler/fileHandlerRoute'),
      notesRoute        = require('./app/notes/notesRoute')

// Assigning mongoose promise library and connecting to DB
const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {useNewUrlParser: true})
  .then(() => {
    console.log('Successfully connected to Database.')
  })
  .catch(err => {
    console.log('Could not connect to Database. Exiting now...', err)
    process.exit();
  });

// Using Body Parser to parse our requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// View Engine
app.set('view engine', 'pug');
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Passport Config
app.use(require('express-session')({
  secret: 'This is my secret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/notes', notesRoute);
app.use('/files', fileHandlerRoute);

app.get('/', (req, res) => res.render('index', { title: 'Dropbox Clone', message: 'This is the landing page.'}))

app.listen(port, () => console.log(`Dropbox clone is listening on port ${port}`))
