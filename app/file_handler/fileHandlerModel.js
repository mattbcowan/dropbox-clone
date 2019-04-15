const mongoose = require('mongoose');

const FileHandlerSchema = mongoose.Schema({
  title: String,
  type: String,
  size: Number,
  lastModifiedDate: Date,
}, {
  timestamps: true
});

module.exports = mongoose.model('FileHandler', FileHandlerSchema);
