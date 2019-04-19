const express = require("express"),
  router = express.Router(),
  formidable = require("formidable"),
  fileHandler = require("./fileHandlerController"),
  FileHandler = require("./fileHandlerModel");

router.get("/", (req, res) => {
  FileHandler.find({}, (err, allFiles) => {
    if (err) {
      console.log(err);
    } else {
      res.render("fileHandler/view", {
        files: allFiles,
        title: "My Files",
        message: "My Files"
      });
    }
  });
});

// Create a new file upload
router.post("/", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req);

  // Begin file upload
  form.on("fileBegin", (name, file) => {
    file.path = __dirname + "/uploads/" + file.name;
  });

  form.on("file", (name, file) => {
    var title = file.name,
      type = file.type,
      size = file.size,
      lastModifiedDate = file.lastModifiedDate,
      newFile = {
        title: title,
        type: type,
        size: size,
        lastModifiedDate: lastModifiedDate
      };

    FileHandler.create(newFile, (err, newlyCreated) => {
      if (err) {
        console.log(err);
      } else {
        console.log(newlyCreated);
        res.redirect("/upload");
      }
    });
  });
});

// Find all Files
router.get("/", (req, res) => {
  FileHandler.find({}, (err, allFiles) => {
    if (err) {
      console.log(err);
    } else {
      res.render("fileHandler/view", {
        files: allFiles,
        title: "My Files",
        message: "My Files"
      });
    }
  });
});

// Retrieve a single Note with noteId
router.get("/:id", (req, res) => {
  FileHandler.findById(req.params.id).exec((err, foundFile) => {
    if (err || !foundFile) {
      console.log(err);
      return res.redirect("/files");
    }
    res.render("fileHandler/show", { file: foundFile });
  });
});

// Edit Note
router.get("/:id/edit", (req, res) => {
  FileHandler.findById(req.params.id, (err, foundFile) => {
    if (err) {
      console.log(err);
    }
    res.render("fileHandler/edit", { file: foundFile });
  });
});

// Update a File with ID
router.put("/:id", (req, res) => {
  FileHandler.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, file) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/upload/files");
    }
  );
});

// Delete note
router.delete("/:id", (req, res) => {
  FileHandler.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    }
    res.redirect("/files");
  });
});

module.exports = router;
