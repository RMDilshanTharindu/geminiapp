import './Main.css'
import { assets } from '../../../assets/assets'
import { useContext, useEffect, useRef, useState} from 'react';
import { Context } from '../../../Context/Context';

const Main = () => {

    const {onSent,showResults,loading,setInput,input,currentChat} = useContext(Context)
    const [chatResponce,setChatResponce] = useState('')

    const intervalRef = useRef(null);

    useEffect(() => {
        if (!loading && currentChat.length > 0) {
          const last = currentChat[currentChat.length - 1].gemini;
      
          if (!last) return;
      
          // Reset chat response immediately
          setChatResponce('');
          let i = 0;
      
          // Clear any previous interval
          if (intervalRef.current) clearInterval(intervalRef.current);
      
          // Start interval after short delay to ensure reset state applied
          const timeout = setTimeout(() => {
            intervalRef.current = setInterval(() => {
              setChatResponce(prev => {
                if (i < last.length) {
                  const updated = prev + last.charAt(i);
                  i++;
                  return updated;
                } else {
                  clearInterval(intervalRef.current);
                  return prev; // Don't add anything else
                }
              });
            }, 20);
          }, 10); // small delay ensures chatResponce is fully cleared
      
          // Cleanup both timeout and interval
          return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
          };
        }
      }, [currentChat, loading]);
      
      
      
    
    

  return (
    <div className='main'>
        <div className='nav'>
            <p>Gemini</p>
            <img src={assets.user_icon} alt='' />
        </div>
        <div className='main-container'>

            {!showResults
            ?<>
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
            </>
            :<div className='result'>
                <div>
                {currentChat.map((chat, index) => (
                <div key={index}>
                    <div className='result-title'>
                    <img src={assets.user_icon} alt='' />
                    <p>{chat.user}</p>
                    </div>
                    <div className='result-data'>
                    <img src={assets.gemini_icon} alt='' />
                    {loading && index === currentChat.length - 1 ? (
                        <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                        </div>
                    ) : (
                        <p
                        dangerouslySetInnerHTML={{
                            __html:
                            index === currentChat.length - 1
                                ? chatResponce
                                : chat.gemini,
                        }}
                        ></p>
                    )}
                    </div>
                </div>
                ))}

                </div>
                
                
            </div>
            }
            <div className='main-bottom'>
                <div className='search-box'>
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter a promt here'/>  
                    <div>
                        <img src={assets.gallery_icon} alt='' />
                        <img src={assets.mic_icon} alt='' />
                        {input?<img src={assets.send_icon} alt='' onClick={(e)=>onSent(input,e)} />:null}
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