const express = require('express'),
      router = express.Router(),
      passport = require('passport')

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Login Successful!')
})
