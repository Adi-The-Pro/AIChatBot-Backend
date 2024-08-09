const express = require('express');
const router = express.Router();
const userRouter = require('./user-routes');
const chatRouter = require('./chat-routes');

router.use('/user',userRouter); //domain/api/v1/user
router.use('/chat',chatRouter) //domain/api/v1/chats

module.exports = router;