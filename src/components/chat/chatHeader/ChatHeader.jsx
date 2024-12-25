import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiCloseFill } from "react-icons/ri";
import ChatUserInfo from './ChatUserInfo';
import { useOnlineStatus } from '../../../hooks/useOnlineStatus';
import { closeChat } from "@/slices/chatSlice";

const ChatHeader = () => {
  const { selectChatData, selectChatType, isOnline } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();


  useOnlineStatus(user._id, selectChatData._id);
  
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-5 sm:px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <ChatUserInfo
          chatData={selectChatData}
          chatType={selectChatType}
          isOnline={isOnline}
        />
        <div className="flex items-center justify-center gap-5 ">
                    <button
                        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all "
                        onClick={() => dispatch(closeChat())}
                    >
                        <RiCloseFill className="text-3xl" />
                    </button>
                </div>
      </div>
    </div>
  );
};

export default ChatHeader;