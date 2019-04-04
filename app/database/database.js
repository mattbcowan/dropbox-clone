const mongoose = require('mongoose'),
      dbConfig = require('../../config/database.config.js')

mongoose.Promise = global.Promise;

const connectToDatabase = () => {
  // Connecting to MongoDB
  mongoose.connect(dbConfig.url, {useNewUrlParser: true})
    .then(() => {
      console.log('Successfully connected to Database.')
    })
    .catch(err => {
      console.log('Could not connect to Database. Exiting now...', err)
      process.exit();
    });
}

module.exports = {connectToDatabase}
