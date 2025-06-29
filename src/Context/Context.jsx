import { createContext, useState } from "react";
import { runChat } from "../config/gemini";

export const Context = createContext();

const delayText = (ms) => new Promise(res => setTimeout(res, ms));

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setInput("");
        setRecentPrompt("");
    };

    const typeResultData = async (text) => {
        for (let i = 0; i < text.length; i++) {
            const nextChar = text[i];
            setResultData(prev => prev + nextChar);
            await delayText(10);
        }
    };

    const onSent = async (prompt_val) => {
        setLoading(true);
        setShowResult(true);
        setResultData(""); 

        let currentPrompt = prompt_val || input;
        setRecentPrompt(currentPrompt);

        let formattedResponse = "";

        try {
            const response = await runChat(currentPrompt);

            let responseText = response;
            responseText = responseText.split("**").map((part, index) =>
                index % 2 === 1 ? `<b>${part}</b>` : part
            ).join("");
            responseText = responseText.split("*").join("<i>");
            responseText = responseText.split("\n").join("<br/>");

            formattedResponse = responseText;

            const newHistoryEntry = {
                id: Date.now(),
                prompt: currentPrompt,
                response: formattedResponse
            };
            setPrevPrompts(prev => [...prev, newHistoryEntry]);

            setLoading(false); 
            await typeResultData(formattedResponse);

        } catch (error) {
            console.error("Error in onSent:", error);
            setResultData("An error occurred while fetching the response from Ekko. Please try again.");
            setLoading(false);
        } finally {
            setInput("");
        }
    };

    const loadPreviousPrompt = (promptObj) => {
        setRecentPrompt(promptObj.prompt);
        setResultData(promptObj.response);
        setShowResult(true);
    };

const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult, 
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
    newChat,
    loadPreviousPrompt,
    typeResultData 
};

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
