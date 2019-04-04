const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      notesRoute = require('./app/notes/notesRoute'),
      {connectToDatabase} = require('./app/database/database'),
      port = 3000

// Using Body Parser to parse our requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// View Engine
app.set('view engine', 'pug')

// Connecting to MongoDB
connectToDatabase();

// Routes
app.use('/notes', notesRoute);

app.get('/', (req, res) => res.render('index', { title: 'Dropbox Clone', message: 'This is the landing page.'}))

app.listen(port, () => console.log(`Dropbox clone is listening on port ${port}`))
