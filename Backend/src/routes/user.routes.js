const express = require('express');
const userRouter = express.Router();
const {followUserController,getPendingRequests,getFollowers,getFollowing,getSuggestions ,unfollowUserController,acceptFollowController,getFollowStatus,rejectFollowRequest}= require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');


userRouter.post('/follow/:username', authMiddleware,followUserController);
userRouter.post('/unfollow/:username', authMiddleware,unfollowUserController);
userRouter.get('/followers/:username', authMiddleware,getFollowers)
userRouter.get('/following/:username', authMiddleware,getFollowing)

userRouter.get('/follow/requests', authMiddleware,getPendingRequests)
userRouter.post("/follow/accept/:username", authMiddleware ,acceptFollowController)
userRouter.post("/follow/reject/:username", authMiddleware ,rejectFollowRequest)

userRouter.get("/follow-status/:username", authMiddleware ,getFollowStatus)
userRouter.get("/suggestions", authMiddleware ,getSuggestions)

module.exports = userRouter;