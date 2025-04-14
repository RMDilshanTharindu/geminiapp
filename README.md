
---

### 📄 Final `README.md`

```markdown
# 💬 Simple Chat App using React + Express + Google Gemini API

This is a full-stack mini chatbot app using:
- **React** frontend
- **Express.js** backend
- **Google Gemini API (Flash 2.0)** to generate AI responses

---

## 📦 Tech Stack

- Frontend: React.js
- Backend: Node.js + Express
- AI: Google Gemini 2.0 Flash via official SDK
- CORS: Enabled using `cors` middleware for cross-origin communication

---

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── index.js       # Express server
│   └── gemini.js      # Google Gemini API wrapper
│
├── frontend/
│   └── src/
│       └── components/
│           ├── Chat.js          # React chat component
│           └── chatHandler.js   # Handles sending prompts to server
```

---

### `backend/index.js`

```js
import express from 'express';
import main from './gemini.js';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors()); // Enable CORS

server.post('/chat', async (req, res) => {
  const { promt } = req.body;
  const result = await main(promt);
  res.status(201).json(result);
});

server.listen(4000, () => {
  console.log('server is running');
});

```

---

### `backend/gemini.js`

```js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyA1TwO***************" // ⚠️ Replace with your actual API key
});

async function main(promt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: promt,
  });
  return response.text;
}

export default main;
```

---

## 🔑 How I Got the Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/prompts/new_chat)
2. Sign in with your Google account
3. Click your profile picture → `Get API Key`
4. Copy the key and use it in your backend (keep it secure!)

---

## ⚙️ Handling CORS

By default, modern browsers block requests from one origin to another due to **CORS policy**.

### ✅ Solution: Enable CORS in Express

Install CORS:
```bash
npm install cors
```

Use it in your server:
```js
import cors from 'cors';
server.use(cors());
```

This allows your React app (`localhost:3000`) to talk to your Node backend (`localhost:4000`) without CORS errors.

---

## 💻 Frontend Overview

### `chatHandler.js`

```js
const chatHandler = async (prompt) => {
  try {
    const res = await fetch('http://localhost:4000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promt: prompt }),
    });

    const data = await res.json();
    return Array.isArray(data) ? data.join(' ') : data;
  } catch {
    return 'Something went wrong!';
  }
};

export default chatHandler;
```

---

### `Chat.js`

```jsx
import React, { useState } from 'react';
import chatHandler from './chatHandler';

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reply = await chatHandler(prompt);
    setResponse(reply);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default Chat;
```

---

## 🚀 Running the App

### Backend

```bash
cd backend
npm install
node index.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Important Notes

- **Never expose your API key in public repos**.
- Use environment variables (`.env`) to hide it in production.
- Use HTTPS and API restrictions for added safety.

---

## 🔮 Future Upgrades

- Better chat history UI
- Add markdown / image support
- Save conversations
- Connect Gemini Pro model

---

## 👨‍💻 Author

Made by **Dilshan Tharindu** ❤️
