const express = require("express"),
  formidable = require("formidable");

const upload = (req, res) => {
  // var form = new formidable.IncomingForm();
  // var newFile = {
  //   title: "",
  //   type: "",
  //   size: null,
  //   lastModifiedDate: ""
  // };
  // form.parse(req);
  //
  // // Begin file upload
  // form.on("fileBegin", (name, file) => {
  //   file.path = __dirname + "/uploads/" + file.name;
  // });
  //
  // form.on("file", (name, file) => {
  //   var title = file.name,
  //     type = file.type,
  //     size = file.size,
  //     lastModifiedDate = file.lastModifiedDate;
  //
  //   newFile = {
  //     title: title,
  //     type: type,
  //     size: size,
  //     lastModifiedDate: lastModifiedDate
  //   };
  // });
  // return newFile;

  return 5;
};

module.exports.upload = upload;
