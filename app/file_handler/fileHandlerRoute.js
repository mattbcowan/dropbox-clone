const express = require('express'),
      router = express.Router(),
      formidable = require('formidable');

router.get('/', (req, res) => {
  res.render('index', {title: 'Upload a File', message: 'This is the upload route!'})
});

router.post('/', (req, res) => {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', (name, file) => {
    file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', (name, file) => {
    console.log('Uploaded ' + file.name);
  })

  res.render('index', {title: 'Upload a File', message: 'You uploaded something!'})
})

module.exports = router;
