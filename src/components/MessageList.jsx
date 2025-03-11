const MessageList = ({ messages }) => {
  return (
    <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center space-y-6">
      {messages.length === 0 ? (
        <p className="text-gray-400 text-center">Apa yang bisa saya bantu?</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="w-2/4 flex flex-col">
            {/* Garis pemisah antar chat */}
            {index > 0 && <div className="w-full border-t border-gray-600 my-4"></div>}

            {/* Pesan dari user (pertanyaan) */}
            {msg.sender === "user" ? (
              <div className="self-end bg-gray-700 text-white px-3 py-2 rounded-lg text-sm max-w-fit">
                {msg.text}
              </div>
            ) : (
              // Pesan dari bot (jawaban) tanpa bubble
              <div className="self-start text-gray-200 text-base leading-relaxed">
                {msg.text}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
