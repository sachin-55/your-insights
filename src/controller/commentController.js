import catchAsync from '../utils/catchAsync';
import Comment from '../model/commentModel';

exports.getAllComment = catchAsync(async (req, res, next) => {
  const comments = await Comment.find().populate('commentedBy').select('-__v');
  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments,
    },
  });
});
exports.getCommentOfPost = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({
    commentedBlog: req.params.postId,
  })
    .populate('commentedBy')
    .select('-__v');
  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments,
    },
  });
});

exports.createCommentOnPost = catchAsync(async (req, res, next) => {
  const comment = await Comment.create({
    comment: req.body.comment,
    commentedBlog: req.body.blogId,
    commentedBy: req.body.userId,
  });
  res.status(201).json({
    status: 'success',
    comment,
  });
});
