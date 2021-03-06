import express from 'express';

import blogController from '../controller/blogController';
import authController from '../controller/authController';

import multer from 'multer';
import AppError from '../utils/appError';

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image') ||
      file.mimetype.startsWith('video') ||
      file.mimetype.startsWith('application') ||
      file.mimetype.startsWith('text')
    ) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          'Not an image or video | Please upload only image and video',
          400
        ),
        false
      );
    }
  },
});

const router = express.Router();

router.get('/public', blogController.getAllBlogsForAll);

router
  .route('/')
  .get(authController.protect, blogController.getAllBlogs)
  .post(authController.protect, blogController.createBlog);

router
  .route('/:blogId')
  .get(blogController.getBlog)
  .patch(authController.protect, blogController.updateBlog)
  .delete(authController.protect, blogController.deleteBlog);

router.post(
  '/uploadImage',
  authController.protect,
  upload.single('file'),
  blogController.uploadImage
);
router.post(
  '/uploadVideo',
  authController.protect,
  upload.single('file'),
  blogController.uploadVideo
);
router.post(
  '/uploadFile',
  authController.protect,
  upload.single('file'),
  blogController.uploadFile
);

export default router;
