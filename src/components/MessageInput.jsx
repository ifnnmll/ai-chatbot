import { useState } from "react";
import { fetchGeminiResponse } from "../api/api";
import FileUpload from "./FileUpload";
import VoiceInput from "./VoiceInput";
import { Mic, ArrowUp } from "lucide-react";

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
    <div className="message-input">
      <FileUpload setMessages={setMessages} />
      <VoiceInput setMessages={setMessages} />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default MessageInput;
