const express = require('express'),
      router = express.Router(),
      formidable = require('formidable'),
      fileHandler = require('./fileHandlerController'),
      FileHandler = require('./fileHandlerModel');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Upload a File',
    message: 'This is the upload route!'
  })
});

// Create a new file upload
router.post('/', (req, res) => {
  fileHandler.fileUpload(req, newFile);
  //console.log('Uploaded ' + file.name);
  FileHandler.create(newFile, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect('/upload');
    }
  })
})

module.exports = router;
