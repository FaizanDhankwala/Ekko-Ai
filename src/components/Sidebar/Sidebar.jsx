import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const {
        prevPrompts,
        setRecentPrompt,
        setShowResult,
        setResultData,
        setInput,
        setLoading,
        typeResultData,
        newChat
    } = useContext(Context);

    const loadPrompt = async (historyItem) => {
        setResultData("");
        setInput("");
        setShowResult(true);
        setLoading(true);
        setRecentPrompt(historyItem.prompt);

        await typeResultData(historyItem.response);

        setLoading(false);
    };

    const handleNewChat = () => {
        newChat();
        setExtended(false);
    };

    return (
        // --- THIS LINE IS CORRECT FOR ADDING THE CLASS ---
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <img
                    className="menu"
                    src={assets.menu_icon}
                    alt="menu icon"
                    onClick={() => setExtended(prev => !prev)}
                    style={{ cursor: 'pointer' }}
                />

                <div className="new-chat" onClick={handleNewChat}>
                    <img src={assets.plus_icon} alt="plus icon" />
                    {extended && <p>New Chat</p>} {/* This text will animate */}
                </div>

                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p> {/* This text will animate */}
                        {prevPrompts.map((item) => (
                            <div key={item.id} className="recent-entry" onClick={() => loadPrompt(item)}>
                                <img src={assets.message_icon} alt="message icon" />
                                <p>{item.prompt.slice(0, 18)}{item.prompt.length > 18 ? "..." : ""}</p> {/* This text will animate */}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="question icon" />
                    {extended ? <p>Help</p> : null} {/* This text will animate */}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="history icon" />
                    {extended ? <p>Activity</p> : null} {/* This text will animate */}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="settings icon" />
                    {extended ? <p>Settings</p> : null} {/* This text will animate */}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;