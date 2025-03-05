import { useState } from "react";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-gray-800">
        <MessageList messages={messages} />
        <MessageInput setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Chatbot;
