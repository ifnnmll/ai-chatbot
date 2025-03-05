const FileUpload = ({ setMessages }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setMessages((prev) => [...prev, { file: fileUrl, sender: "user" }]);
  };

  return (
    <label className="file-upload">
      📎
      <input type="file" onChange={handleFileUpload} hidden />
    </label>
  );
};

export default FileUpload;
