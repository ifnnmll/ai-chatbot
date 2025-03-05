import { useState } from "react";
import { fetchGeminiResponse } from "../api/api";
import { Paperclip, Mic, ArrowUp } from "lucide-react";

const MessageInput = ({ setMessages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    const botReply = await fetchGeminiResponse(input);
    setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
  };

  return (
    <div className="flex items-center bg-gray-700 p-4 border-t border-gray-600">
      <button className="p-2 text-gray-400 hover:text-white">
        <Paperclip size={24} />
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Tanyakan apa saja..."
        className="flex-grow p-2 border rounded-lg bg-gray-800 text-white outline-none"
      />
      <button className="p-2 text-gray-400 hover:text-white">
        <Mic size={24} />
      </button>
      <button onClick={sendMessage} className="p-2 bg-blue-600 rounded-full text-white">
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default MessageInput;
