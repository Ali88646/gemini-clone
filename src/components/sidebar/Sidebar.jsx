import React, { useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/Context";
const Sidebar = () => {
  const [isExtended, setIsExtended] = useState(false);
  const { onSent, prevPrompts, newChat } = useAppContext();

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setIsExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu-icon"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus-icon" />
          {isExtended ? <p>New Chat</p> : null}
        </div>
        {isExtended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((prompt, i) => {
              return (
                <div
                  onClick={() => onSent(prompt)}
                  key={i}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="message-icon" />
                  <p>{prompt}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt=" question-icon" />
          {isExtended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history-icon" />
          {isExtended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings-icon" />
          {isExtended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
