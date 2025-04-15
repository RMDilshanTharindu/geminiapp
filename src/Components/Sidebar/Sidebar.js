import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import { Context } from '../../Context/Context';

const Sidebar = () => {

    const[extended,setExtended] = useState(false);
    const {onSent,prevPrompts,setRecentPrompt,newChat,firstPromptList,loadOldChats,uniqueFirstPromptList} = useContext(Context);

    const LoadPrompt = async (prompt) =>{
        console.log(prompt);
        loadOldChats(prompt)
        //setRecentPrompt(prompt)
        //await onSent(prompt)
    }

  return (
    <div className='sidebar'>
        <div className='top'>
            <img onClick={()=>setExtended(pre=>!pre)} className='menu' src={assets.menu_icon} alt='' /><br/>
            <div onClick={()=>newChat()} className='new-chat'>
                <img src={assets.plus_icon} alt='' />
                {extended?<p>New chat</p>:null}
            </div>
            {extended?
              <div className='recent'>
              <p className='recent-title'>Recent</p>
              {uniqueFirstPromptList.map((item,index)=>{
                    return(
                        <div onClick={()=>LoadPrompt(item)}className='recent-entry'>
                            <img src={assets.message_icon} alt='' />
                            <p>{item.slice(0,18)}...</p>
                        </div>
                    )
              })}
              
          </div>
            :null }
            
        </div>

        <div className='bottom'>
            <div className='bottom-item recent-entry'>
                <img src={assets.question_icon} alt='' />
                {extended?<p>Help</p>:null}
            </div>
            <div className='bottom-item recent-entry'>
                <img src={assets.history_icon} alt='' />
                {extended?<p>History</p>:null}
            </div>
            <div className='bottom-item recent-entry'>
                <img src={assets.setting_icon} alt='' />
                {extended?<p>Setting</p>:null}
            </div>

        </div>
    </div>
  )
}

export default Sidebar