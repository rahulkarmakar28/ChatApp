import React from 'react';
import { useSelector } from 'react-redux';
import ContactMessage from './ContactMesage';
import ChannelMessage from './ChannelMessage';
import DateDivider from './DateDivider';
import { formatDate } from '../../../utils/dateUtils';


const MessageList = ({ messages, onImageClick }) => {
  const { selectChatType } = useSelector((state) => state.chat);

  const renderMessages = () => {
    let lastDate = null;

    return messages?.map((message) => {
      const date = formatDate(message.updatedAt, 'YYYY-MM-DD');
      const showDate = date !== lastDate;
      lastDate = date;

      return (
        <div key={message._id}>
          {showDate && <DateDivider date={message.updatedAt} />}
          {selectChatType === "contact" ? (
            <ContactMessage message={message} onImageClick={onImageClick} />
          ) : (
            <ChannelMessage message={message} onImageClick={onImageClick} />
          )}
        </div>
      );
    });
  };

  return <>{renderMessages()}</>;
};

export default MessageList;