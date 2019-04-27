// Load things we need
const LocalStrategy = require("passport-local").Strategy;

// Load user model
const User = require("../app/users/userModel");

module.exports = passport => {
  // Serialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize User
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // Local Signup
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // Async
        // User.findOne wont fire unless data is sent back
        process.nextTick(() => {
          // find user whose email is the same as the forms email
          User.findOne({ "local.email": email }, (err, user) => {
            // if any errors
            if (err) return done(err);

            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken")
              );
            } else {
              // create the user
              var newUser = new User();

              // Set the user's local credentails
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              // save the user
              newUser.save(err => {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  // Local Login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass entire request
      },
      (req, email, password, done) => {
        process.nextTick(() => {
          User.findOne({ "local.email": email }, (err, user) => {
            // if errors
            if (err) return done(err);

            if (!user)
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found")
              );

            if (!user.validPassword(password))
              return done(
                null,
                false,
                req.flash("loginMessage", "Oops! Wrong password!")
              );

            // all is well
            return done(null, user);
          });
        });
      }
    )
  );
};
