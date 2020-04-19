import express from 'express';

import userController from '../controller/userController';
import authController from '../controller/authController';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.protect, authController.logout);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/updateMyPicture',
  authController.protect,
  userController.updatePicture
);
router.patch(
  'updateMyNameAndEmail',
  authController.protect,
  userController.updateUser
);

router.route('/').get(userController.getAllUsers);

router.route('/:userId').get(authController.protect, userController.getUser);

export default router;
