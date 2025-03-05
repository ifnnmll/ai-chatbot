const MessageList = ({ messages }) => {
    return (
      <div className="message-list">
        {messages.length === 0 ? (
          <p className="placeholder-text">Apa yang bisa saya bantu?</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.file && <img src={msg.file} alt="Uploaded" className="uploaded-image" />}
              <p>{msg.text}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default MessageList;
  