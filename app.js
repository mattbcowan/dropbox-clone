const express = require('express'),
      app = express(),
      port = 3000

  app.get('/', (req, res) => res.send('This is a dropbox clone'))

  app.listen(port, () => console.log(`Dropbox clone is listening on port ${port}`))
