import { useState, useEffect } from "react";
const ImageUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
          headers: {},
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(`Success: ${data.message}`);
        } else {
          setMessage(`Error: ${data.detail || "Unknown error occurred"}`);
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    } else {
      setMessage("Please select a file to upload");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUploader;
// ok so we need to have an uploader and then just append whats uploaded to the page, simple, nothing crazy, so loader and where the images are appended too are suppose to be different.
