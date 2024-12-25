export const downloadFile = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const aTag = document.createElement('a');
      aTag.href = urlBlob;
      aTag.setAttribute('download', name);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };