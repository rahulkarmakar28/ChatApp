import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { IoMdDownload } from 'react-icons/io';
import { BiLoaderAlt } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { setDownload } from '../../../slices/chatSlice';
import { downloadFile } from '../../../utils/fileUtils';


const ImagePreviewDialog = ({
  image,
  showImage,
  setShowImage,
}) => {
  const dispatch = useDispatch();
  const { isDownload } = useSelector((state) => state.chat);

  const handleDownload = async () => {
    dispatch(setDownload(true));
    await downloadFile(image.url, image.name);
    dispatch(setDownload(false));
  };

  return (
    <Dialog open={showImage} onOpenChange={setShowImage}>
      <DialogContent className="bg-[#1a1b20] border-none text-white flex flex-col px-12 py-7 rounded-lg">
        <DialogHeader className="flex flex-col items-center gap-3">
          <DialogTitle className="text-xl flex gap-5 items-center">
            <span>{image.name}</span>
            <button
              className="bg-slate-700 p-2 text-2xl rounded-full hover:bg-[#8417ff] cursor-pointer transition-all duration-300"
              onClick={handleDownload}
              disabled={isDownload}
            >
              {isDownload ? (
                <BiLoaderAlt className='text-2xl text-neutral-300 loader font-extrabold' />
              ) : (
                <IoMdDownload />
              )}
            </button>
          </DialogTitle>
          <div className="flex justify-center">
            <img
              src={image.url}
              alt={image.name}
              height={300}
              width={300}
              className="object-fit shadow-2xl shadow-slate-600 rounded-lg"
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;