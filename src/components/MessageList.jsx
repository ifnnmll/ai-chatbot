const MessageList = ({ messages }) => {
    return (
      <div className="flex-grow overflow-y-auto p-6">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">Apa yang bisa saya bantu?</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <div className={`p-4 rounded-lg max-w-xl ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}>
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default MessageList;
  