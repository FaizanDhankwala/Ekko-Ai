import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'help', 'settings', or null

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
    setActiveModal(null);
  };

  const toggleModal = (modal) => {
    if (activeModal === modal) {
      setActiveModal(null); // close if already open
    } else {
      setActiveModal(modal); // open requested modal
    }
  };

  return (
    <>
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
            {extended && <p>New Chat</p>}
          </div>

          {extended && (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item) => (
                <div key={item.id} className="recent-entry" onClick={() => loadPrompt(item)}>
                  <img src={assets.message_icon} alt="message icon" />
                  <p>{item.prompt.slice(0, 18)}{item.prompt.length > 18 ? "..." : ""}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bottom">
          <div
            className="bottom-item recent-entry"
            onClick={() => toggleModal('help')}
            style={{ cursor: 'pointer' }}
          >
            <img src={assets.question_icon} alt="question icon" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="history icon" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div
            className="bottom-item recent-entry"
            onClick={() => toggleModal('settings')}
            style={{ cursor: 'pointer' }}
          >
            <img src={assets.setting_icon} alt="settings icon" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>

            {activeModal === 'help' && (
              <>
                <h2>Ekko Ai- Built by Faizan Dhankwala</h2>
                <img className='profile-image' src={assets.newprofile}></img>
              <p>
  Hello! My name is Faizan Dhankwala, and I’m the creator of this app. I recently graduated from the University of Washington with a degree in Computer Science in March. This app is a custom Gemini-based chatbot designed to converse like Ekko, a character from League of Legends. You can view all my projects at{" "}
  <a href="https://faizandhankwala.com" target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
    faizandhankwala.com
  </a>
</p>
              </>
            )}

            {activeModal === 'settings' && (
              <>
                <h2>Settings</h2>
                <p>Here you can adjust your preferences.</p>
                {/* Add your actual settings options here */}
                <button className='settings-button' onClick={() => alert('Settings option clicked!')}>Example Option</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
