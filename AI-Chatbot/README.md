# 🚀 AI-Chatbot: Full Stack Real-Time Conversational Platform

**Live, Modular, AI-driven Chatbot**<br>
<sub>Built for production-grade scalability. Powered by Node.js, Express, MongoDB, Socket.io, JWT, and extendable AI integrations.</sub>

---
 
<img src="https://dummyimage.com/1200x280/000/ffffff&text=AI+Chatbot" width="100%" style="border-radius:10px;"/>

--- 

## 🌟 What is AI-Chatbot?

AI-Chatbot is a full-stack application designed to facilitate real-time, intelligent conversations. It combines robust backend architecture with AI services, user authentication, and persistent chat history. The project is highly modular—ideal for extending features or plugging in alternative frontends.

---

## 🏗️ Full Stack: Technologies Used

### Backend
- **Node.js**: JavaScript runtime for scalable server operations.
- **Express.js**: REST API routing, middleware, and core server logic.
- **MongoDB**: NoSQL database for storing users, chat, and messages.
- **Mongoose**: Schema modeling for MongoDB collections.
- **Socket.io**: Enables real-time, bidirectional communication for live chat.
- **JWT (JSON Web Token)**: Handles secure token-based authentication.
- **dotenv**: Manages environment variables.
- **AI Service (ai.service.js)**: Connects to external AI APIs (OpenAI, Gemini, etc.) for chatbot responses.

### Project Structure

```
AI-Chatbot/
├── src/
│   ├── controllers/      # Business logic for auth and chat
│   ├── db/               # DB connection setup
│   ├── middlewares/      # Auth validation, error handling
│   ├── models/           # Mongoose schemas (User, Message)
│   ├── routes/           # API definitions (/auth, /chat)
│   ├── service/          # AI integrations
│   ├── sockets/          # Socket.io events
│   └── app.js            # Express app setup
├── .env                  # Environment variables
├── server.js             # Main server entry point
└── package.json          # Project metadata, dependencies
```

### Frontend
- **React & Vite**: Lightning-fast development and HMR.
  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react): Integrates Babel for React compilation.
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc): Uses SWC for enhanced performance.
- *(Extensible for other frontends like Next.js, admin dashboards, or analytics panels)*

---

## ⚡ Core Features

- Real-time chat (instant delivery)
- AI-generated responses
- JWT-protected authentication for all chat endpoints
- Conversation & message history (MongoDB)
- RESTful API + WebSocket hybrid model
- Modular MVC architecture for maintainability
- Environment-based configuration

---

## 🔑 How to Setup

Install backend dependencies:
```bash
npm install
```
Set up environment:
```ini
MONGO_URI=              # Your MongoDB connection string
JWT_SECRET=             # JWT encryption secret
AI_API_KEY=             # API key for external AI (OpenAI, etc.)
PORT=5000               # Server port
```
Start the server:
```bash
npm start
```

---

## 🛠️ API Endpoints

**Authentication**
| Method | Route         | Description              |
|--------|--------------|--------------------------|
| POST   | /auth/signup | Register new user        |
| POST   | /auth/login  | Authenticate + get token |

**Chat**
| Method | Route            | Description                  |
|--------|------------------|------------------------------|
| POST   | /chat/send       | Send a message + AI reply    |
| GET    | /chat/history    | Retrieve full conversation   |

---

## 🔗 How the System Works

1. User logs in → JWT is issued
2. Token authorizes further chat interactions
3. Messages stored in MongoDB
4. AI service generates reply
5. Socket.io pushes updates to all connected clients
6. Conversation history retrievable via API

---

## 🚩 Extend & Upgrade

- Multi-agent AI conversations
- Voice mode, image generation
- Advanced analytics dashboard
- Frontends with React/Next.js, mobile app support
- Admin panel for moderation

---

## ❤️ Contributing

Contributions welcome! For major changes, open an issue first.

---

## 📝 License

MIT License

---

<div align="center">Made with ⚡ passion + ☕ caffeine</div>
