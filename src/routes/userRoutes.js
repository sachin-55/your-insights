import express from 'express';

import userController from '../controller/userController';
import authController from '../controller/authController';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.protect, authController.logout);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

export default router;
