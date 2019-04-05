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
router.get('/:id', (req, res) => {
  Note.findById(req.params.id).exec((err, foundNote) => {
    if(err || !foundNote) {
      console.log(err)
      return res.redirect('/notes');
    }
    console.log(req.params.id);
    res.render('notes/show', {note: foundNote})
  })
})

// Edit Note
router.get('/:id/edit', (req, res) => {
  res.render('notes/edit', {note: req.note})
})

// Update a Note with noteId
router.put('/:id', notes.update);

// Delete a Note with noteId
router.delete('/:id', notes.delete);

module.exports = router;
