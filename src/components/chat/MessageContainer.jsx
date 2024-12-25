import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectChatMessages } from '../../slices/chatSlice';
import { getAllMessages, getChannelMessages } from '../../services/operations/messagesApi';
import MessageList from './messages/MessageList';
import ImagePreviewDialog from './messages/ImagePreviewDialog';
import { useImagePreview } from '../../hooks/useImagePreview';

const MessageContainer = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { selectChatType, selectChatData, selectChatMessages } = useSelector(
    (state) => state.chat
  );
  
  const { image, showImage, setShowImage, handleImageChange } = useImagePreview();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectChatData._id) return;

      try {
        const messages = selectChatType === "contact"
          ? await getAllMessages(selectChatData.chatId, token)
          : await getChannelMessages(selectChatData._id, token);
        
        dispatch(setSelectChatMessages(messages));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectChatData, selectChatType, dispatch, token]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectChatMessages]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[78vw] w-full">
      <MessageList
        messages={selectChatMessages}
        onImageClick={handleImageChange}
      />
      <div ref={scrollRef} />
      
      <ImagePreviewDialog
        image={image}
        showImage={showImage}
        setShowImage={setShowImage}
      />
    </div>
  );
};

export default MessageContainer;