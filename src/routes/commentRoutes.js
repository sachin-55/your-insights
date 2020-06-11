import express from 'express';
import commentController from '../controller/commentController';
import authController from '../controller/authController';
const router = express.Router();

router.get('/', commentController.getAllComment);
router.get('/:postId', commentController.getCommentOfPost);
router.post('/', authController.protect, commentController.createCommentOnPost);

export default router;
