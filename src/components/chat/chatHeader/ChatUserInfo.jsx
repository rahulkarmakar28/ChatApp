import React from 'react';


const ChatUserInfo = ({ chatData, chatType, isOnline }) => {
  return (
    <div className="flex gap-3 items-center justify-center">
      <div>
        <img
          src={chatData?.image?.url}
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex flex-col items-start">
        <div>
          {chatType === 'contact' && chatData?.firstName
            ? `${chatData?.firstName} ${chatData?.lastName}`
            : chatData?.email}
          {chatType === 'channel' && `${chatData?.name}`}
        </div>
        {chatType === 'contact' && (
          <div className={`text-sm ${!isOnline ? "text-neutral-500" : "text-green-600"}`}>
            {isOnline ? "Online" : "Offline"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUserInfo;