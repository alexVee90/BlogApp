const mongoose = require('mongoose');

const Blog = mongoose.model('Blog', {
  title: String,
  image: String,
  desc: String,
  date: {type: Date, default: Date.now},
  comments: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = Blog;