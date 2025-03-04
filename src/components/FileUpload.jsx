import { useState } from "react";
import { Paperclip } from "lucide-react";

const FileUpload = ({ onFileSend }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSend = () => {
    if (file) {
      onFileSend(file);
      setFile(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="bg-white p-3 rounded-full flex items-center justify-center cursor-pointer">
        <Paperclip size={20} className="text-black" />
      </label>
      {file && (
        <button onClick={handleSend} className="bg-white p-2 rounded-lg text-black">
          Send
        </button>
      )}
    </div>
  );
};

export default FileUpload;
