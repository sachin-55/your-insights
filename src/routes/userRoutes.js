import express from 'express';

import userController from '../controller/userController';
import authController from '../controller/authController';

import multer from 'multer';
import AppError from '../utils/appError';

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image. Upload only Image', 400), false);
    }
  },
});

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.protect, authController.logout);

router.patch(
  '/uploadProfileImage',
  authController.protect,
  upload.single('photo'),
  userController.uploadProfileImage
);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  'updateMyNameAndEmail',
  authController.protect,
  userController.updateUser
);

router.route('/').get(userController.getAllUsers);

router.route('/:userId').get(authController.protect, userController.getUser);

export default router;
