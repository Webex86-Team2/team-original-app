import { useState, useRef } from "react";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import "../../styles/AvatarUpload.css";

export default function AvatarUpload({ defaultImage }) {
  const [preview, setPreview] = useState(defaultImage ?? null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ローカルプレビュー
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Firebaseにアップロード
    const fileRef = ref(storage, `avatars/${file.name}/${Date.now()}`);
    await uploadBytes(fileRef, file);
    // const url = await getDownloadURL(fileRef);

    // 👇 親に通知
    // onUploaded(url);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="avatar-container">
      <div className="avatar-frame">
        {preview ? (
          <img src={preview} alt="preview" className="avatar-image" />
        ) : (
          <div className="avatar-placeholder">No image</div>
        )}
      </div>

      <Button
        type="button"
        variant="contained"
        className="avatar-button"
        onClick={handleClick}
      >
        <CameraAltIcon className="camera-icon" />
      </Button>

      <input
        type="file"
        accept="image/*"
        className="hidden-input"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
}
