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
    
    const onSent = async (input,e) => {
        e.preventDefault();
        setLoading(true);
        setShowResults(true);
        setRecentPrompt(input)
        const reply = await chatHandler(input);
        setResponse(reply);
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
