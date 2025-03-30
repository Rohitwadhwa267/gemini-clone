import React, { useState } from "react";
import "./Sidebar.css";
// import asserts
import { assets } from "../../assets/assets.js";
import { useContext } from "react";
import { Context } from "../../context/Context.jsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);
 const loadPrompt = async (prompt) => {
  
    setRecentPrompt(prompt);
    await onSent(prompt);
 }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended(!extended)}
          src={assets.menu_icon}
          alt="menu"
          className="menu"
        />
        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="plus" className="plus" />
          {extended ? <p className="new-chat-text">New chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {prevPrompts.map((prompt, index) => {
              return (
                <div className="recent-entry" key={index} onClick={() => loadPrompt(prompt)}>
                <img src={assets.message_icon} alt="message" className="" />
                <p className="recent-entry-text">{prompt.slice(0, 18)}...</p>
              </div>
              )
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="history" className="" />
          {extended ? <p className="bottom-item-text">Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history" className="" />
          {extended ? <p className="bottom-item-text">Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="history" className="" />
          {extended ? <p className="bottom-item-text">Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
