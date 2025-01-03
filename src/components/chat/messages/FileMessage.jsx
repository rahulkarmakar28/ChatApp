import React from 'react';
import { ImFolderOpen } from 'react-icons/im';
import { IoMdDownload } from 'react-icons/io';
import { BiLoaderAlt } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { setDownload } from '../../../slices/chatSlice';
import { downloadFile } from '../../../utils/fileUtils';

const FileMessage = ({ fileData, isReceived, onImageClick }) => {
  const dispatch = useDispatch();
  const { isDownload } = useSelector((state) => state.chat);
  const isImage = fileData.name.match(/\.(jpeg|jpg|gif|png|bmp|tiff|tif|webp|svg|ico|heic|heif)$/);

  const handleDownload = async () => {
    dispatch(setDownload(true));
    await downloadFile(fileData.url, fileData.name);
    dispatch(setDownload(false));
  };

  return (
    <div
      className={`${!isReceived
        ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
        : "bg-[#2a2b33]/5 text-white/80 border-white/20"
        } border inline-block py-1 px-3 rounded my-1 max-w-[60%] max-sm:max-w-[90%] break-words`}
    >
      <div>
        {isImage ? (
          <div className="cursor-pointer">
            <img
              src={fileData.url}
              alt={fileData.name}
              height={300}
              width={300}
              className="object-fit"
              onClick={() => onImageClick(fileData)}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <span className="text-white/80 text-3xl bg-black/20 rounded-full p-3">
              <ImFolderOpen />
            </span>
            <span>
              {fileData.name.length > 20
                ? `${fileData.name.substring(0, 15)}...`
                : fileData.name}
            </span>
            <button
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={handleDownload}
              disabled={isDownload}
            >
              {isDownload ? (
                <BiLoaderAlt className="text-2xl text-neutral-300 loader font-extrabold" />
              ) : (
                <IoMdDownload />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileMessage;