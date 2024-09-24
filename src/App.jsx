import app from "./firebase";
import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  async function handleImageChange(e) {
    console.log(e.target.files[0]);
    const image = e.target.files[0];
    if(image){
      try {
        setUploading(true);
        const storage=getStorage(app);
        const storageRef=ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL);
        setImageURL(downloadURL);

      } catch (error) {
        console.log(error);
      }finally{
        setUploading(false);
      }
     
    }
  }
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Upload Image in Firebase</h2>
      <input type="file" onChange={handleImageChange}/>
      <button disabled={uploading}>
        {uploading ? "Uploading" : "Upload Image"}
        </button>
        {imageURL && <img src={imageURL} style={{ maxWidth: 150 }} />}
    </div>
  );
};

export default ImageUploader;