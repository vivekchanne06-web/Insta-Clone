const express = require('express');
const { registerController, loginController,getController } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware')

const authRouter = express.Router();

authRouter.post('/register', registerController); 


authRouter.post('/login', loginController);

authRouter.get('/get-me',authMiddleware ,getController)


module.exports = authRouter;