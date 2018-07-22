const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Mongoose dont mess me'
  },
  title: String,
  crossed: {
    type: Boolean,
    default: false
  },
  tags: [
    String
  ],
  description: String,
  created: {
    type: Date,
    default: null
  },
  deadline: {
    type: Date,
    default: null
  },
  author: {
    username: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dir-app-user'
    }
  }
});

module.exports = mongoose.model('dir-app-item', ItemSchema);
