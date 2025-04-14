import './Main.css'
import { assets } from '../../../assets/assets'
import chatHandler from '../../../Gemini/ChatHandler';
import { useContext, useState } from 'react';
import { Context } from '../../../Context/Context';

const Main = () => {

    const {onSent,recentPrompt,showResults,loading,response,setInput,input} = useContext(Context)


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
                <div className='result-title'>
                    <img src={assets.user_icon} alt='' />
                    <p>{recentPrompt}</p>
                </div>
                <div className='result-data'>
                    <img src={assets.gemini_icon} alt='' />
                    {loading
                    ?<div className='loader'>
                        <hr/>
                        <hr/>
                        <hr/>
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:response}}></p> 
                     }
                    
                </div>
            </div>
            }
            <div className='main-bottom'>
                <div className='search-box'>
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter a promt here'/>  
                    <div>
                        <img src={assets.gallery_icon} alt='' />
                        <img src={assets.mic_icon} alt='' />
                        <img src={assets.send_icon} alt='' onClick={(e)=>onSent(input,e)} />
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