const express = require('express'),
      router = express.Router(),
      notes = require('./notesController.js'),
      Note = require('./notesModel.js')

// Create a new Note
router.post('/', (req, res) => {
  var title = req.body.title,
      content = req.body.content,
      newNote = {title: title, content: content}

  Note.create(newNote, (err, newlyCreated) => {
    if(err) {
      console.log(err)
    } else {
      // redirect back to notes page
      console.log(newlyCreated);
      res.redirect('/notes');
    }
  })
})

// Retrieve all Notes
router.get('/', (req, res) => {
  Note.find({}, (err, allNotes) => {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {
        notes: allNotes,
        title: 'Notes Page',
        message: 'Welcome to the notes page',
        noNotes: 'There are no notes right now.'
      })
    }
  });
});


// Retrieve a single Note with noteId
// router.get('/:noteId', notes.findOne);
router.get('/:noteId', (req, res) => {
  Note.findById(req.params.noteId).exec((err, foundNote) => {
    if(err || !foundNote) {
      console.log(err)
      return res.redirect('/notes');
    }
    console.log(req.params.noteId);
    res.render('notes/show', {note: foundNote})
  })
})

// Update a Note with noteId
router.put('/:noteId', notes.update);

// Delete a Note with noteId
router.delete('/:noteId', notes.delete);

module.exports = router;
