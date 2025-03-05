import { useState } from "react";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Content */}
      <div className="flex flex-col flex-grow p-4 bg-white">
        {/* Message List */}
        <MessageList messages={messages} />

        {/* Input */}
        <MessageInput setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Chatbot;
