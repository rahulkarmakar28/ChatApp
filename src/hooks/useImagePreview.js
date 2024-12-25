import { useState } from 'react';

export const useImagePreview = () => {
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState({
    url: '',
    name: '',
    public_id: '',
  });

  const handleImageChange = (data) => {
    setImage((prevData) => ({ ...prevData, ...data }));
    setShowImage(true);
  };

  return {
    image,
    showImage,
    setShowImage,
    handleImageChange,
  };
};