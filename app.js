const dbConfig = require('./config/database.config.js'),
      express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000

mongoose.Promise = global.Promise;

// Using Body Parser to parse our requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Require Notes routes
require('./app/notes/notesRoute.js')(app);

// Connecting to MongoDB
mongoose.connect(dbConfig.url, {useNewUrlParser: true})
  .then(() => {
    console.log('Successfully connected to Database.')
  })
  .catch(err => {
    console.log('Could not connect to Database. Exiting now...', err)
    process.exit();
  });

app.get('/', (req, res) => res.send('This is a dropbox clone'))

app.listen(port, () => console.log(`Dropbox clone is listening on port ${port}`))
