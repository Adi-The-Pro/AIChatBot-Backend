const express = require('express');
const { getAllUsers, userSignup, userLogin, verifyUser, userLogout} = require('../controllers/user-controller');
const { signupValidator , validate, loginValidator } = require('../utilis/validator.');
const { verifyToken } = require('../utilis/token-manager');
const userRouter = express.Router();

userRouter.get('/',getAllUsers);
userRouter.post('/signup',signupValidator,validate,userSignup);
userRouter.post('/login',loginValidator,validate,userLogin);
userRouter.get('/auth-status',verifyToken,verifyUser);
userRouter.get('/logout',verifyToken,userLogout);

module.exports = userRouter;