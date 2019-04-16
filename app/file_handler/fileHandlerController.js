const FileHandler = require('./fileHandlerModel'),
      formidable = require('formidable')

exports.create = (req, res) => {
  if(!req.body.file) {
    return res.status(400).send({
      message: "File content cannot be empty."
    })
  }

  // Create a File Upload
  const fileHandler = new FileHandler({
    title: req.body.title,
    type: req.body.type,
    size: req.body.size,
    lastModifiedDate: req.body.lastModifiedDate
  });

  fileHandler.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving the file."
      });
    })
}

// Find all Files
exports.findAll = (req, res) => {
  FileHandler.find()
    .then(fileHanlder => {
      res.send(fileHandler)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not find files."
      });
    });
}

// Delete File
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params._id)
  .then(file => {
    if(!file) {
      return res.status(404).send({
        message: `File not found with ID ${req.params._id}`
      });
    }
    res.send({ message: `File deleted Successfully`})
  })
  .catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: `File not found with ID ${req.params._id}`
      });
    }
    return res.status(500).send({
      message: `Could not delete file with ID ${req.params._id}`
    });
  });
};
