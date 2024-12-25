import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

export const useOnlineStatus = (userId, chatId) => {
  const socket = useSocket();

  useEffect(() => {
    const checkUserOnlineStatus = () => {
      socket.emit("is_user_online", userId, chatId);
    };

    const intervalId = setInterval(checkUserOnlineStatus, 10000);
    checkUserOnlineStatus();

    return () => clearInterval(intervalId);
  }, [socket, userId, chatId]);
};