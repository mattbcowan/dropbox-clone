const express = require('express'),
      router = express.Router(),
      notes = require('./notesController.js'),
      Note = require('./notesModel.js')

// Create a new Note
router.post('/', notes.create);

// Retrieve all Notes
// router.get('/', notes.findAll);
router.get('/', (req, res) => {
  Note.find({}, (err, allNotes) => {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {notes: allNotes, title: 'Notes Page', message: 'Welcome to the notes page', noNotes: 'There are no notes right now.'})
    }
  });
});


// Retrieve a single Note with noteId
router.get('/:noteId', notes.findOne);

// Update a Note with noteId
router.put('/:noteId', notes.update);

// Delete a Note with noteId
router.delete('/:noteId', notes.delete);

module.exports = router;
