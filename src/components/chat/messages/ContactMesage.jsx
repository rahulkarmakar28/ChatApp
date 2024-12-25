import React from 'react';
import { useSelector } from 'react-redux';
import FileMessage from './FileMessage';
import TextMessage from './TextMessage';
import { formatMessageTime } from '../../../utils/dateUtils';


const ContactMessage = ({ message, onImageClick }) => {
  const { selectChatData } = useSelector((state) => state.chat);
  const isReceived = message.sender === selectChatData._id;

  return (
    <div className={`${isReceived ? "text-left" : "text-right"}`}>
      <div className="relative group">
        {message.messageType === "text" ? (
          <TextMessage content={message.content} isReceived={isReceived} />
        ) : (
          <FileMessage
            fileData={message.fileUrl}
            isReceived={isReceived}
            onImageClick={onImageClick}
          />
        )}
      </div>
      <div className="text-xs text-gray-600">
        {formatMessageTime(message.createdAt)}
      </div>
    </div>
  );
};

export default ContactMessage;