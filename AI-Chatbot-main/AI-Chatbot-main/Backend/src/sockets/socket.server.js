const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model")
const aiService = require("../service/ai.service")
const messageModel = require("../model/message.model")
const { createMemory, queryMemory } = require("../service/vector.service")


function initSocketServer(httpServer) {

    const io = new Server(httpServer, {});

    io.use(async (socket, next) => {

        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        if (!cookies.token) {
            next(new Error("Authentication error: No token provided"))
        }

        try {

            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

            const user = await userModel.findById(decoded.id);

            socket.user = user

            next()

        } catch (err) {
            next(new Error("Authentication error: Invalid token"));
        }
    })

    io.on("connection", (socket) => {

        socket.on("ai-message", async (messagePayload) => {

            const [message, vectors] = await Promise.all([
                messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: messagePayload.content,
                    role: "user"
                }),
                aiService.generateVector(messagePayload.content)
            ])

            await createMemory({
                    vectors,
                    messageId: message._id,
                    metadata: {
                        chat: messagePayload.chat,
                        user: socket.user._id,
                        text: messagePayload.content
                    }
                })


            const [memory, chatHistory] = await Promise.all([

                queryMemory({
                    queryVector: vectors,
                    limit: 3,
                    metadata: {
                        user: socket.user._id
                    }
                }),

                messageModel.find({
                    chat: messagePayload.chat
                }).sort({ createdAt: -1 }).limit(20).lean().then(message => message.reverse())
            ])

            const stm = chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            })

            const ltm = [
                {
                    role: "user",
                    parts: [{
                        text: `
                        
                        these are some previous message from the chat. Use them to generate response
                        
                        ${memory.map(item => item.metadata.text).join("\n")}
                        
                        ` }]
                }
            ]

            console.log("LTM:", ltm[0]);
            console.log("STM:", stm);

            const response = await aiService.generateResponse([...ltm, ...stm])

            socket.emit('ai-response', {
                content: response,
                chat: messagePayload.chat
            })

            const [responseMessage, responseVectors] = await Promise.all([
                messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: response,
                    role: "model"
                }),
                aiService.generateVector(response)
            ])

            await createMemory({
                vectors: responseVectors,
                messageId: responseMessage._id,
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: response

                }
            })
        })
    })

}

module.exports = initSocketServer;