const express = require('express'),
      mongoose = require('mongoose'),
      app = express(),
      port = 3000

mongoose.connect('mongodb+srv://mattcowan:Brokenchains1@mydata-xomta.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

app.get('/', (req, res) => res.send('This is a dropbox clone'))

app.listen(port, () => console.log(`Dropbox clone is listening on port ${port}`))
