import React, { useState } from 'react';

const TextMessage = ({ content, isReceived, className = '' }) => {
  const [showFull, setShowFull] = useState(false);

  const handleToggle = () => setShowFull((prev) => !prev);

  return (
    <div
      className={`${!isReceived
        ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50 text-left"
        : "bg-[#2a2b33]/5 text-white/80 border-white/20 text-left"
        } border inline-block py-1 px-3 rounded my-1 max-w-[50%] break-words ${className}`}
    >
      {showFull ? content : (content.length > 50 ? `${content.substring(0, 50)}...` : content)}
      {content.length > 50 && (
        <button
          onClick={handleToggle}
          className="text-blue-400 ml-1 text-sm hover:underline focus:outline-none"
        >
          {showFull ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
};

export default TextMessage;
