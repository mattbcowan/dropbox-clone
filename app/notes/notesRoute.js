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
    res.render('notes/show', {note: foundNote})
  })
})

// Edit Note
router.get('/:id/edit', (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if(err) {
      console.log(err);
    }
    res.render('notes/edit', {note: note})
  })
})

// Update a Note with noteId
// router.put('/:id', notes.update);
router.put('/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, note) => {
    if(err) {
      console.log(err);
    }
    res.redirect('/notes')
  })
})

// Delete a Note with noteId
// router.delete('/:id', notes.delete);
router.delete('/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err)
    }
    res.redirect('/notes');
  });
});

module.exports = router;
