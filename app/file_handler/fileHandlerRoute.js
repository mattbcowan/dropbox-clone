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
  var form = new formidable.IncomingForm();
  form.parse(req)

  // Begin file upload
  form.on('fileBegin', (name, file) => {
    file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', (name, file) => {
    var title = file.name,
        type = file.type,
        size = file.size,
        lastModifiedDate = file.lastModifiedDate,
        newFile = {
          title: title,
          type: type,
          size: size,
          lastModifiedDate: lastModifiedDate
        }

        FileHandler.create(newFile, (err, newlyCreated) => {
          if(err) {
            console.log(err);
          } else {
            console.log(newlyCreated);
            res.redirect('/upload');
          }
        })
    })
  //console.log('Uploaded ' + file.name);

})

module.exports = router;
