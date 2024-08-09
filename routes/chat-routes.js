const express = require('express');
const router = express.Router();
const { chatCompletionValidator,validate } = require('../utilis/validator.');
const { generateChatCompletion, sendChatsToUser, deleteChats } = require('../controllers/chat-controller');
const {verifyToken} = require('../utilis/token-manager');
const chatRouter = router;

chatRouter.post("/new",chatCompletionValidator,validate,verifyToken,generateChatCompletion);
chatRouter.get("/all-chats",verifyToken,sendChatsToUser);
chatRouter.delete("/delete",verifyToken,deleteChats);
module.exports = chatRouter;