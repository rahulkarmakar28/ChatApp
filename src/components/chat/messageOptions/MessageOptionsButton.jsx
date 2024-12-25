import React from 'react';
import { MoreVertical } from 'lucide-react';


export const MessageOptionsButton = ({ onClick, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700" />
    </button>
  );
};