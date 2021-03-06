const express = require("express"),
  router = express.Router(),
  passport = require("passport");

// Login
router.get("/login", (req, res) => {
  res.render("auth/login.pug", { message: req.flash("loginMessage") });
});

// Log in
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
    failureFlash: true
  })
);

// Sign Up
router.get("/signup", (req, res) => {
  // render the page and pass in any flash data if it exists
  res.render("auth/signup.pug", { message: req.flash("signupMessage") });
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/auth/profile", // redirect to secure Profile
    failureRedirect: "/auth/signup", //redirect back to signup page
    failureFlash: true // allow flash messages
  })
);

// Profile
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("auth/profile.pug", {
    user: req.user // get the user out of session and pass to template
  });
});

// Log Out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route Middleware
function isLoggedIn(req, res, next) {
  // if user is authenticated
  if (req.isAuthenticated()) return next();

  // if they aren't authenticated
  res.redirect("/");
}

module.exports = router;
