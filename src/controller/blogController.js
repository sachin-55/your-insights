import cloudinary from 'cloudinary';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import Blog from '../model/blogModel';

exports.uploadImage = catchAsync(async (req, res, next) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.v2.uploader.upload(req.file.path);
  // const result = {
  //   secure_url: `https://res.cloudinary.com/nihcas/image/upload/v1586781742/olh4cooqsh7xoieordz4.jpg`,
  // };

  res.status(200).json({
    status: 'success',
    message: 'file uploaded in cloud',
    result,
  });
});
exports.uploadVideo = catchAsync(async (req, res, next) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    resource_type: 'video',
    width: 300,
    height: 200,
  });

  res.status(200).json({
    status: 'success',
    message: 'Video uploaded in cloud',
    result,
  });
});

exports.uploadFile = catchAsync(async (req, res, next) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    resource_type: 'raw',
    // resource_type: 'auto',  supporting for all kind of files types
  });

  res.status(200).json({
    status: 'success',
    message: 'File uploaded in cloud',
    result,
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    blog,
  });
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate('user').select('+createdAt');

  res.status(200).json({
    status: 'success',
    results: blogs.length,
    blogs,
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId)
    .populate('user')
    .select('+createdAt');

  res.status(200).json({
    status: 'success',
    blog,
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.blogId,
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    blog,
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.blogId);

  res.status(200).json({
    status: 'success',
    message: 'Blog Deleted',
  });
});
