import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export const MessageOptionsModal = ({ onEdit, onDelete, canModify }) => {
  if (!canModify) return null;

  return (
    <div className="absolute right-8 top-0 py-2 w-36 bg-white rounded-md shadow-xl z-20">
      <button
        onClick={onEdit}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <Edit2 className="w-4 h-4" />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
};