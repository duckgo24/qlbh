import axios from "axios";


export default function getLinkImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: process.env.REACT_APP_IMGBB_KEY
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      resolve(res.data.data.url);
    } catch (error) {
      reject(error);
    }
  })
}
