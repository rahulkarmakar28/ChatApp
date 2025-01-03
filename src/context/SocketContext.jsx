import React, { createContext, useContext, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addMessage,
    setDmContacts,
    addChannel,
    setChannels,
    sortContacts,
    setOnlineUsers,
    updateDmContacts,
    updateChannel
} from "../slices/chatSlice";
import io from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const socketContext = createContext(null);

export const useSocket = () => useContext(socketContext);

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const socket = useRef(null);
    const { user } = useSelector((state) => state.profile);
    const { selectChatData, selectChatType, isOnline } = useSelector((state) => state.chat);

    useEffect(() => {
        if (user) {
            socket.current = io(BASE_URL, {
                withCredentials: true,
                query: { userId: user._id },
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            socket.current.on("receive-message", (message) => {
                if (selectChatType && (selectChatData?._id === message?.sender?._id || selectChatData?._id === message?.receiver?._id)) {
                    dispatch(addMessage(message));
                }
                // console.log("Message received", message, user._id);
                dispatch(updateDmContacts({ message, userId: user._id }));
                const contact = user?._id === message?.receiver?._id ? message?.sender : message?.receiver;
                contact.userId = user?._id
                contact.sender = message?.sender
                contact.receiver = message?.receiver
                if (contact) {
                    dispatch(sortContacts(contact));
                }
            });
            socket.current.on("receive-channel-message", (message) => {
                if (selectChatType && (selectChatData?._id === message?.channelId))
                    dispatch(addMessage(message));
                dispatch(addChannel(message));
                // console.log("Channel message received", message);
                dispatch(updateChannel(message));
            });
            socket.current.on("receive-channel", (channel) => {
                dispatch(addChannel(channel));
            });

            socket.current.on("user-online", (isOnline) => {
                dispatch(setOnlineUsers(isOnline));
            });
            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                }
            };
        }
    }, [user, selectChatData, selectChatType, dispatch]);

    return (
        <socketContext.Provider value={socket.current}>
            {children}
        </socketContext.Provider>
    );
}

export default SocketProvider;
