// Master Routes

const fileHandlerRoute = require("./file_handler/fileHandlerRoute"),
  notesRoute = require("./notes/notesRoute"),
  authRoute = require("./auth/authRoute");

module.exports = (app, passport) => {
  app.get("/", (req, res) =>
    res.render("index", {
      title: "Dropbox Clone",
      message: "This is the landing page."
    })
  );

  app.use("/notes", notesRoute);
  app.use("/files", fileHandlerRoute);
  app.use("/auth", authRoute);
};
