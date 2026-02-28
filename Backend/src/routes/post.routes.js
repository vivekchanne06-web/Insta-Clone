const express = require('express');
const postRouter = express.Router();
const { createPostController, getPostsController,getPostDetailsController,getFeedController,unlikePostController, } = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { likePostController } = require('../controllers/post.controller');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });




postRouter.post('/', upload.single('image'),authMiddleware, createPostController)
postRouter.get('/',authMiddleware, getPostsController)
postRouter.get('/details/:postId',authMiddleware, getPostDetailsController)


postRouter.post('/like/:postId',authMiddleware,likePostController)
postRouter.post('/unlike/:postId',authMiddleware,unlikePostController)
postRouter.get('/feed',authMiddleware,getFeedController)


module.exports = postRouter;