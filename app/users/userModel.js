const mongoose = require("mongoose"),
  bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  }
});

// generate a hash
UserSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
UserSchema.methods.validPassword = password => {
  return bcrypt.compareSync(password, this.local.password);
};

// export our model
module.exports = mongoose.model("User", UserSchema);
