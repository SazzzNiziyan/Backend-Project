const chatModel = require('../model/chat.model')
const messageModel = require('../model/message.model')


async function createChat(req, res) {

    const { title } = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        user: user._id,
        title
    });

    res.status(201).json({
        message: "Chat created successfully",
        chat: {
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }
    });

}

async function getChats(req, res) {
    const user = req.user;

    const chats = await chatModel.find({ user: user._id }).sort({ updatedAt: -1 }).lean();

    res.status(200).json({ chats });
}

async function getMessages(req, res) {
    const { chatId } = req.params;

    const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 }).lean();

    res.status(200).json({ messages });
}

module.exports = {
    createChat,
    getChats,
    getMessages
} 