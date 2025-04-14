import { createContext, useEffect, useState } from "react";
import chatHandler from "../Gemini/ChatHandler";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [currentChat,setCurrentChat] = useState([]);
    const [chatHistory,setChatHistory] = useState([]);
    const [firstPrompt,setFirstPrompt] = useState('');
    const [firstPromptList,setFirstPromptList] = useState([]);

    const delayPara = (index,nextWord) =>{
        setTimeout(function() {
            setResponse(prev => prev+nextWord);
        },75*index);
    }

    const loadOldChats = (visitedprompt) =>{
        
        chatHistory.map((item, index) => {
            if(item.firstPrompt === visitedprompt){
                setCurrentChat(item.chathistory)
                setShowResults(true);
            }
            console.log(currentChat)
            
          });
    }

    useEffect(() => {
        if (currentChat.length > 0) {
            console.log("Old chat loaded:", currentChat);
            
        }
    }, [currentChat]);

    const newChat = () =>{
        setLoading(false)
        setShowResults(false)
        setChatHistory(prev =>[
            ...prev,
            {
                firstPrompt:firstPrompt,
                chathistory:currentChat
            }
        ])
        setFirstPrompt('');
        setCurrentChat([]);
    }
    
    const onSent = async (prompt, e={ preventDefault: () => {} }) => {
        e.preventDefault();
        setLoading(true);
        setShowResults(true);
    
        let finalPrompt
        if(prompt !== undefined){
            finalPrompt=prompt;
            if(!prevPrompts.includes(finalPrompt)){
                setPrevPrompts(prev => [...prev, finalPrompt]); 
            }
        }else{
            finalPrompt=input;
            console.log('this is user inout')
            setPrevPrompts(prev => [...prev, finalPrompt]);
        }

        if(currentChat.length===0){
            setFirstPrompt(finalPrompt);
            setFirstPromptList(prev=>[
                ...prev,
                finalPrompt
            ]);
        }
       
        console.log(chatHistory)

        setRecentPrompt(finalPrompt);
        setResponse('');
    
        const response1 = await chatHandler(finalPrompt);

        setCurrentChat(prev => [
            ...prev,
            {
              user: finalPrompt,
              gemini: response1
            }
          ]);

        
    
        let responseArray = response1.split("**");
        let newArray = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newArray += responseArray[i];
            } else {
                newArray += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        let newResponse = newArray.split("*").join("</br>");
        let newResponseArray = newResponse.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
    
        setLoading(false);
        setInput('');
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResults,
        loading,
        response,
        input,
        setInput,
        newChat,
        currentChat,
        firstPromptList,
        chatHistory,
        loadOldChats
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
