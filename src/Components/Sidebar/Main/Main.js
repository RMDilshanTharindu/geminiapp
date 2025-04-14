import './Main.css'
import { assets } from '../../../assets/assets'
import chatHandler from '../../../Gemini/ChatHandler';
import { useState } from 'react';

const Main = () => {

    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
  
    const submitPrompt = async () => {
      if (!prompt.trim()) return;
  
      const userMessage = { role: 'user', text: prompt };
      const response = await chatHandler(prompt);
      const aiMessage = { role: 'ai', text: response };
  
      setChatHistory([...chatHistory, userMessage, aiMessage]);
      setPrompt('');
    };


  return (
    <div className='main'>
        <div className='nav'>
            <p>Gemini</p>
            <img src={assets.user_icon} alt='' />
        </div>
        <div className='main-container'>
            <div className='greet'>
                <p><span>Hello, Dev.</span></p>
                <p>How can i help you today?</p>
            </div>
            <div className='cards'>
                <div className='card'>
                    <p>Suggest beautiful place to see on upcoming road trip</p>
                    <img src={assets.compass_icon} alt='' />
                </div>
                <div className='card'>
                    <p>Brefely summarise this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt='' />
                </div>
                <div className='card'>
                    <p>Bainstrome team bonding activities for our work retart</p>
                    <img src={assets.message_icon} alt='' />
                </div>
                <div className='card'>
                    <p>Imporve the readability of fallowing code</p>
                    <img src={assets.code_icon} alt='' />
                </div>
            </div>
            <div className='chat-history'>
                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-container ${msg.role === 'user' ? 'message-right' : 'message-left'}`}
                        >
                            <div
                            className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : ''}`}
                            >
                            <strong>{msg.role === 'user' ? 'You' : 'Gemini'}:</strong> {msg.text}
                            </div>
                        </div>
                    ))}
            </div>

            <div className='main-bottom'>
                <div className='search-box'>
                    <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Enter a promt here'/>  
                    <div>
                        <img src={assets.gallery_icon} alt='' />
                        <img src={assets.mic_icon} alt='' />
                        <img src={assets.send_icon} alt='' onClick={submitPrompt} />
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info,including about people, so duble check it responces
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main