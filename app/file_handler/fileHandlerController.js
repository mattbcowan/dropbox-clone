const fs = require("fs"),
  FileHandler = require("./fileHandlerModel"),
  formidable = require("formidable");

exports.create = (req, res) => {
  if (!req.body.file) {
    return res.status(400).send({
      message: "File content cannot be empty."
    });
  }

  // Create a File Upload
  const fileHandler = new FileHandler({
    title: req.body.title,
    type: req.body.type,
    size: req.body.size,
    lastModifiedDate: req.body.lastModifiedDate
  });

  fileHandler
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving the file."
      });
    });
};

// Find all Files
exports.findAll = (req, res) => {
  FileHandler.find()
    .then(fileHanlder => {
      res.send(fileHandler);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not find files."
      });
    });
};

// Find a single Upload with a ID
exports.findOne = (req, res) => {
  FileHandler.findById(req.params.id)
    .then(file => {
      if (!file) {
        return res.status(404).send({
          message: `Note not found with ID ${req.params._id}`
        });
      }
      res.send(file);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Note not found with ID ${req.params._id}`
        });
      }
      return res.status(505).send({
        message: `Error retrieving note with ID ${req.params._id}`
      });
    });
};

// Update a note identified by a fileID in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "File does not exist"
    });
  }
  // Find note and update it with req.body
  FileHandler.findByIdAndUpdate(
    req.params._id,
    {
      title: req.body.title || "Untitled File",
      type: req.body.type
    },
    { new: true }
  )
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: `Note not found with ID ${req.params._id}`
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Note not found with ID ${req.params._id}`
        });
      }
      return res.status(500).send({
        message: `Error updating note with ID ${req.params._id}`
      });
    });
};

// Delete File
exports.delete = (req, res) => {
  FileHandler.findByIdAndRemove(req.params._id)
    .then(file => {
      if (!file) {
        return res.status(404).send({
          message: `File not found with ID ${req.params._id}`
        });
      }
      res.send({ message: "File deleted Successfully" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: `File not found with ID ${req.params._id}`
        });
      }
      return res.status(500).send({
        message: `Could not delete file with ID ${req.params._id}`
      });
    });
};

exports.removeFile = (req, res) => {
  fs.unlink(req, err => {
    if (err) throw err;
    // If no error, file deleted
    console.log("File deleted!");
  });
};
