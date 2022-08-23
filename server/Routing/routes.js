import express from 'express'
import { addUser , loginUser} from '../controllers/userController.js';
import { uploadImage, getImage } from '../controllers/imageController.js';
import { createPost, getAllPosts , getPost, updatePostData, deletePost} from '../controllers/postController.js';
import { authenticateToken } from '../controllers/jwtController.js';
import { newComment , getComments, deleteComment} from '../controllers/commentController.js';

import upload from '../utils/upload.js'

const router = express.Router();

router.post('/signup', addUser);
router.post('/login', loginUser);
router.post('/file/upload',upload.single('file') ,uploadImage);
router.get('/file/:filename', getImage);
router.post('/createPost', authenticateToken,createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePostData);
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments)
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;