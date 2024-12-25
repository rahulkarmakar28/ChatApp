export const canModifyMessage = (messageTimestamp) => {
    const now = new Date();
    const messageTime = new Date(messageTimestamp);
    const diffInMinutes = (now.getTime() - messageTime.getTime()) / (1000 * 60);
    return diffInMinutes <= 5;
  };