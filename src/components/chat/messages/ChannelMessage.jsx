import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '../../ui/avatar';
import FileMessage from './FileMessage';
import TextMessage from './TextMessage';
import { formatMessageTime } from '../../../utils/dateUtils';


const ChannelMessage = ({ message, onImageClick }) => {
  const { user } = useSelector((state) => state.profile);
  const isCurrentUser = message.sender._id === user._id;

  return (
    <div className={`relative mt-5 ${!isCurrentUser ? "text-left" : "text-right"}`}>
      <div className="relative group">
        {message.messageType === "text" ? (
          <TextMessage
            content={message.content}
            isReceived={!isCurrentUser}
            className="ml-9"
          />
        ) : (
          <FileMessage
            fileData={message.fileUrl}
            isReceived={!isCurrentUser}
            onImageClick={onImageClick}
          />
        )}
      </div>

      {!isCurrentUser ? (
        <div className="flex items-center justify-start gap-3 text-xs text-gray-600">
          <Avatar
            url={message.sender.image.url}
            name={message.sender.firstName}
            size="small"
          />
          <span className="text-sm text-white/60">
            {message.sender.firstName} {message.sender.lastName}
          </span>
          <span className="text-xs text-white/60">
            {formatMessageTime(message.createdAt)}
          </span>
        </div>
      ) : (
        <div className="text-xs mt-1 text-white/60">
          {formatMessageTime(message.createdAt)}
        </div>
      )}
    </div>
  );
};

export default ChannelMessage;