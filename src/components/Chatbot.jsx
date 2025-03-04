import { useState, useRef } from "react";
import { fetchGeminiResponse } from "../api";
import { Plus, Search, X, Mic, ArrowUp, Square } from "lucide-react";
import FileUpload from "./FileUpload";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typingResponse, setTypingResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [recording, setRecording] = useState(false);
  const typingInterval = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setHasTyped(true);

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    const botReply = await fetchGeminiResponse(input);
    setTypingResponse("");
    simulateTypingEffect(botReply);
    setHistory([{ question: input, answer: botReply }, ...history]);
  };

  const simulateTypingEffect = (text) => {
    const words = text.split(" ");
    let index = 0;
    typingInterval.current = setInterval(() => {
      setTypingResponse((prev) => prev + (index > 0 ? " " : "") + words[index]);
      index++;
      if (index === words.length) {
        clearInterval(typingInterval.current);
        setMessages((prev) => [...prev, { text, sender: "bot" }]);
        setTypingResponse("");
        setIsTyping(false);
      }
    }, 300);
  };

  const stopTyping = () => {
    clearInterval(typingInterval.current);
    setIsTyping(false);
    setTypingResponse("");
  };

  return (
    <div className="flex h-screen w-full bg-gray-900">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      <div className={`h-screen w-72 bg-gray-800 text-white p-4 flex flex-col border-r border-gray-700 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-72 md:translate-x-0"}`}>
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setMessages([])} className="flex items-center text-white">
            <Plus size={20} className="mr-2" /> New Chat
          </button>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={20} className="text-white" />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-screen p-4 md:p-6">
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-16 py-6 space-y-4 border-b border-gray-700">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-lg">Apa yang bisa saya bantu?</p>
          ) : (
            <div className="w-full">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <span className={`px-4 py-3 rounded-lg max-w-3xl text-base ${msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-700 text-white"}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <span className="px-4 py-3 rounded-lg max-w-3xl text-base bg-gray-700 text-white">
                    {typingResponse}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="p-4 flex bg-gray-900 gap-2">
        <FileUpload />  
          <button className="bg-white p-3 rounded-full flex items-center justify-center">
            <Mic size={20} className="text-black" />
          </button>
          <input
            type="text"
            className="flex-1 p-3 border rounded-lg text-base bg-gray-800 text-white placeholder-gray-400 border-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          {isTyping ? (
            <button onClick={stopTyping} className="bg-white p-3 rounded-full flex items-center justify-center">
              <Square size={24} className="text-black" />
            </button>
          ) : (
            <button onClick={sendMessage} className="bg-white p-3 rounded-full flex items-center justify-center">
              <ArrowUp size={24} className="text-black" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
