import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';


const TextMessage = ({ content = '', isReceived, className = '' }) => {
  const [showFull, setShowFull] = useState(false);

  const handleToggle = () => setShowFull((prev) => !prev);

  // Ensure content is a string
  const messageContent = String(content || '');

  return (
    <div className="relative group">
      <div
        className={`${!isReceived
          ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50 text-left"
          : "bg-[#2a2b33]/5 text-white/80 border-white/20 text-left"
          } border inline-block py-1 px-3 rounded my-1 break-words ${className} max-w-[50%]`}
      >
        <div className="flex items-center">
          <span>
            {showFull ? messageContent : (messageContent.length > 50 ? `${messageContent.substring(0, 50)}...` : messageContent)}
            {messageContent.length > 50 && (
              <button
                onClick={handleToggle}
                className="text-blue-400 ml-1 text-sm hover:underline focus:outline-none"
              >
                {showFull ? 'See less' : 'See more'}
              </button>
            )}
          </span>
          {/* <span
            onClick={ }
            className="ml-1">
            <EllipsisVertical className={`${!isReceived ? "text-[#8417ff]" : "text-white"} w-4 h-4 font-semibold`} />
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default TextMessage;
