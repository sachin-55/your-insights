import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog must have a title.'],
  },
  content: {
    type: String,
    required: [true, 'There is no Blog 😉'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
