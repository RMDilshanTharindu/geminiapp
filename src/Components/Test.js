import React, { useState, useEffect } from 'react';
import chatHandler from '../Gemini/ChatHandler';

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [firstPrompt, setFirstPrompt] = useState('');
  const [currentChat, setCurrentChat] = useState([]);
  const [chatHistory, setChatHistory] = useState({});
  const [newChat, setNewChat] = useState(true);

  // ⬇️ Load chat history from localStorage on first load
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // ⬇️ Save chat history to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newChat) {
      setFirstPrompt(prompt);
      const reply = await chatHandler(prompt);
      setResponse(reply);
      setCurrentChat([{ user: prompt, Gemini: reply }]);
      setNewChat(false);
    } else {
      const reply = await chatHandler(prompt);
      setResponse(reply);
      setCurrentChat((prev) => [...prev, { user: prompt, Gemini: reply }]);
    }

    setPrompt('');
  };

  const handleNewChat = () => {
    if (firstPrompt && currentChat.length > 0) {
      // Save current chat under first prompt
      setChatHistory((prev) => {
        const updated = {
          ...prev,
          [firstPrompt]: currentChat,
        };
        localStorage.setItem('chatHistory', JSON.stringify(updated)); // Optional here too
        return updated;
      });
    }
    // Reset chat state
    setCurrentChat([]);
    setNewChat(true);
    setFirstPrompt('');
    setResponse('');
    setPrompt('');
  };

  const handleClickFirstPrompt = (promptKey) => {
    const chat = chatHistory[promptKey];
    alert(`Chat history for "${promptKey}":\n` +
      chat.map(c => `User: ${c.user}\nGemini: ${c.Gemini}`).join('\n\n'));
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
        <button type="button" onClick={handleNewChat}>
          New Chat
        </button>
      </form>

      <hr />

      <div>
        <p><strong>First Prompt:</strong> {firstPrompt}</p>
        {currentChat.map((chat, index) => (
          <div key={index}>
            <p><strong>User:</strong> {chat.user}</p>
            <p><strong>Gemini:</strong> {chat.Gemini}</p>
          </div>
        ))}
      </div>

      <hr />

      <div>
        <h3>Saved Chats:</h3>
        {Object.keys(chatHistory).map((key, index) => (
          <div
            key={index}
            onClick={() => handleClickFirstPrompt(key)}
            style={{ cursor: 'pointer', marginBottom: '8px' }}
          >
            <p><strong>First Prompt:</strong> {key}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
