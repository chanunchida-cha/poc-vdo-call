export const mediaSetting = (constraints: any) => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      return stream;
    })
    .catch((error: any) => {
      alert(error);
    });
};
