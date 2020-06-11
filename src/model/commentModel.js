import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  commentDate: {
    type: Date,
    default: Date.now(),
  },
  commentedBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
