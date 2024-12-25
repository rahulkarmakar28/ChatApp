import React, { useRef, useState, useEffect } from 'react';
import { GrAttachment } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { BiLoaderAlt } from "react-icons/bi";
import { RiEmojiStickerLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { sendFileMessage as sendFile } from '../../services/operations/messagesApi';
import { useSocket } from '../../context/SocketContext';
import { setUpload } from '../../slices/chatSlice';

const MessageBar = () => {
    const socket = useSocket();
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const { selectChatType, selectChatData, isUpload } = useSelector(state => state.chat);

    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const emojiRef = useRef(null);
    const textareaRef = useRef(null);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        let messagePayload;
        if (selectChatType === "contact") {
            messagePayload = {
                sender: user._id,
                content: message,
                receiver: selectChatData._id,
                messageType: "text",
            };
            socket.emit("send-message", messagePayload);
        } else {
            messagePayload = {
                sender: user._id,
                content: message,
                messageType: "text",
                channelId: selectChatData._id,
            };
            socket.emit("send-channel-message", messagePayload);
        }
        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleAddEmoji = (e) => {
        setMessage(prevMessage => prevMessage + e.emoji);
        if (isMobile) {
            setEmojiPickerOpen(false);
        }
    };

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    async function uploadFile(file, receiver) {
        try {
            if (!file) return;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('receiver', receiver);

            dispatch(setUpload(true));
            const response = await sendFile(formData, token);

            if (selectChatType === "contact") {
                socket.emit("send-message", response);
            } else {
                response.channelId = selectChatData._id;
                response.messageType = "file";
                socket.emit("send-channel-message", response);
            }
            dispatch(setUpload(false));
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        await uploadFile(file, selectChatData._id);
    };

    useOnClickOutside(emojiRef, () => setEmojiPickerOpen(false));

    return (
        <div className="max-sm:w-full w-[90%] min-h-[10vh] bg-[#1c1d25] flex justify-center items-center mx-auto sm:mb-6 sm:gap-6 gap-1 px-[6px] sm:px-5">
            <div className="max-sm:w-[82%] flex-1 flex bg-[#2a2b33] items-center gap-1 sm:gap-5 pr-5 rounded-md">
                <textarea
                    ref={textareaRef}
                    placeholder="Type a message"
                    className="flex-1 py-3 max-sm:pl-2 sm:p-5 bg-transparent focus:border-none focus:outline-none resize-none max-h-32 overflow-y-auto"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button
                    onClick={handleFileUpload}
                    className="text-neutral-100 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                    <GrAttachment className="text-2xl text-neutral-500" />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="relative">
                    <button
                        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                        onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                    >
                        <RiEmojiStickerLine className="text-2xl text-neutral-500" />
                    </button>
                    {emojiPickerOpen && (
                        <div className='absolute bottom-16 right-0' ref={emojiRef}>
                            <EmojiPicker
                                theme='dark'
                                onEmojiClick={handleAddEmoji}
                                autoFocusSearch={false}
                            />
                        </div>
                    )}
                </div>
            </div>
            <button
                className="max-sm:max-w-[20%] bg-[#8417ff] rounded-full flex items-center justify-center p-3 sm:p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                onClick={handleSendMessage}
                disabled={isUpload}
            >
                {isUpload ? (
                    <BiLoaderAlt className="text-2xl text-neutral-300 loader font-extrabold" />
                ) : (
                    <IoSend className="text-2xl text-neutral-300" />
                )}
            </button>
        </div>
    );
};

export default MessageBar;