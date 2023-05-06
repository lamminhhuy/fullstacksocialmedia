const mongoose = require('mongoose');


  const ReviewSchema = new mongoose.Schema({
  
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    content: { type: String, required: true },
    book: {   type: mongoose.Schema.Types.ObjectId, ref: 'book',required:true},
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }); 
  
module.exports = mongoose.model('Review', ReviewSchema);
