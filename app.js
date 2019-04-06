const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      app = express(),
      notesRoute = require('./app/notes/notesRoute'),
      fileHandlerRoute = require('./app/file_handler/fileHandlerRoute'),
      {connectToDatabase} = require('./app/database/database'),
      port = 3000

// Using Body Parser to parse our requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// View Engine
app.set('view engine', 'pug');
app.use(methodOverride('_method'));

// Connecting to MongoDB
connectToDatabase();

// Routes
app.use('/notes', notesRoute);
app.use('/upload', fileHandlerRoute);

app.get('/', (req, res) => res.render('index', { title: 'Dropbox Clone', message: 'This is the landing page.'}))

app.listen(port, () => console.log(`Dropbox clone is listening on port ${port}`))
