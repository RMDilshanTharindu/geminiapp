import { createContext, useState } from "react";
import chatHandler from "../Gemini/ChatHandler";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const delayPara = (index,nextWord) =>{
        setTimeout(function() {
            setResponse(prev => prev+nextWord);
        },75*index);
    }
    
    const onSent = async (input,e) => {
        e.preventDefault();
        setLoading(true);
        setShowResults(true);
        setRecentPrompt(input);
        setPrevPrompts(prev=>[...prev,input])
        const reply = await chatHandler(input);
        let responseArray = reply.split("**");
        let newArray;
        for (let i=0; i<responseArray.length; i++){
            if(i===0 || i%2 !==1){
                newArray += responseArray[i]
            }else{
                newArray += "<b>"+responseArray[i]+"</b>"
            }
        }

        let newResponse = newArray.split("*").join("</br>");
        let newResponseArray = newResponse.split(" ");
        for(let i = 0; i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setResponse(newResponse);
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
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
