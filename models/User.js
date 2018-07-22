const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  directions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dir-app-item'
    }
  ]
});

UserSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model('dir-app-user', UserSchema);
