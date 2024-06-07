
const loadImage = (imageFile, index) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = reader.result;
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      const encrypted = CryptoJS.SHA256(wordArray);

      const blob = new Blob([arrayBuffer]);
      const dataUrl = URL.createObjectURL(blob);
      resolve({
              name: encrypted.toString(),
              dataURL: dataUrl,
              index: index,
              quantity: 1,
              blob: blob
              });
    };
    reader.onabort = (e) => {
      reject(e);
    };
    reader.readAsArrayBuffer(imageFile);
  });
};

function getImages(files) {
  if (!files) return;
  const filesData = [].map.call(files, (element, index) => loadImage(element, index));
  /*
  Promise.all(filesData).then((e) => {
    console.log("all", e);
  });
  */
  return filesData;
}

