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

// Find all Files
router.get('/files', (req, res) => {
  FileHandler.find({}, (err, allFiles) => {
    if(err) {
      console.log(err);
    } else {
      res.render('fileHandler/view', {
        files: allFiles,
        title: 'My Files',
        message: 'My Files',
      })
    }
  });
});

// Retrieve a single Note with noteId
router.get('/files/:id', (req, res) => {
  FileHandler.findById(req.params.id).exec((err, foundFile) => {
    if(err || !foundFile) {
      console.log(err)
      return res.redirect('/files');
    }
    res.render('fileHandler/show', {file: foundFile})
  })
})

// Edit Note
router.get('/files/:id/edit', (req, res) => {
  FileHandler.findById(req.params.id, (err, foundFile) => {
    if(err) {
      console.log(err);
    }
    res.render('fileHandler/edit', {file: foundFile})
  })
})

// Delete note
router.delete('/files/:id', (req, res) => {
  FileHandler.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err)
    }
    res.redirect('/upload/files');
  });
});


module.exports = router;
