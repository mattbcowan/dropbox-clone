const express = require('express'),
      router = express.Router(),
      notes = require('./notesController.js')

// Create a new Note
router.post('/', notes.create);

// Retrieve all Notes
// router.get('/', notes.findAll);
router.get('/', (req, res) => res.render('../app/notes/index', {
  title: 'Notes Page',
  message: 'Welcome to the Notes Page!'
}))


// Retrieve a single Note with noteId
router.get('/:noteId', notes.findOne);

// Update a Note with noteId
router.put('/:noteId', notes.update);

// Delete a Note with noteId
router.delete('/:noteId', notes.delete);

module.exports = router;
