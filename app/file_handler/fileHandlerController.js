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
