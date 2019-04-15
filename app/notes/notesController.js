const Note = require('./notesModel.js'), 
      formidable = require('formidable');

// Create and Save a new Note
exports.create = (req, res) => {

  // Validate a request
  if(!req.body.content) {
    return res.status(400).send({
      message: "Note content cannot be empty."
    })
  }

  // Create a new note
  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content
  });

  // Save Note in the database
  note.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Note"
    });
  });
};

// Retrieve and return all Notes from database
exports.findAll = (req, res) => {
  Note.find()
  .then(notes => {
    res.send(notes);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the notes."
    })
  })
};

// Find a single Note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
  .then(note => {
    if(!note) {
      return res.status(404).send({
        message: `Note not found with ID ${req.params.noteId}`
      })
    }
    res.send(note);
  })
  .catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Note not found with ID ${req.params.noteId}`
      });
    }
    return res.status(505).send({
      message: `Error retrieving note with ID ${req.params.noteId}`
    });
  });
};

// Update a note identified by a noteId in the request
exports.update = (req, res) => {
  // Validate request
  if(!req.body.content) {
    return res.status(400).send({
      message: 'Note cannot be empty'
    });
  }
  // Find note and update it with req.body
  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  }, {new: true})
  .then(note => {
    if(!note) {
      return res.status(404).send({
        message: `Note not found with ID ${req.params.noteId}`
      })
    }
    res.send(note);
  })
  .catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Note not found with ID ${req.params.noteId}`
      })
    }
    return res.status(500).send({
      message: `Error updating note with ID ${req.params.noteId}`
    });
  });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
  .then(note => {
    if(!note) {
      return res.status(404).send({
        message: `Note not found with ID ${req.params.noteId}`
      });
    }
    res.send({ message: `Note deleted Successfully`})
  })
  .catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: `Note not found with ID ${req.params.noteId}`
      });
    }
    return res.status(500).send({
      message: `Could not delete note with ID ${req.params.noteId}`
    });
  });
};
