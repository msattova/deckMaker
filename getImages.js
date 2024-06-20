
const loadImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = reader.result;
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      const encrypted = CryptoJS.SHA256(wordArray);

      const blob = new Blob([arrayBuffer]);
      const dataUrl = URL.createObjectURL(blob);

      resolve(Object.freeze({
              baseFileName: imageFile.name,
              name: encrypted.toString(),
              dataURL: dataUrl,
              identifier: `${encrypted.toString()}${Date.now()}`,
              blob: blob
              }));
    };
    reader.onabort = (e) => {
      reject(e);
    };
    reader.readAsArrayBuffer(imageFile);
  });
};

function getImage(file) {
  if (!file) return;
  const fileData = loadImage(file);

  console.log("one", file);

  return fileData;
}


function getImages(files) {
  if (!files) return;
  const filesData = [].map.call(files, (element) => loadImage(element));
  /*
  Promise.all(filesData).then((e) => {
    console.log("all", e);
  });
  */
  return filesData;
}

