const Note = require('./notesModel.js');

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

};

// Find a single Note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by a noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};
