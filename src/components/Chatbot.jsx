import { useState } from "react";
import { fetchGeminiResponse } from "../api";
import { Plus, Search, X } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const botReply = await fetchGeminiResponse(input);
    const updatedMessages = [...newMessages, { text: botReply, sender: "bot" }];
    setMessages(updatedMessages);

    setHistory([{ question: input, answer: botReply }, ...history]);
  };

  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen w-full bg-gray-900">
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      <div className={`fixed md:relative h-screen w-72 bg-gray-800 text-white p-4 flex flex-col border-r border-gray-700 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-72 md:translate-x-0"}`}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={startNewChat} className="flex items-center space-x-2 text-white">
            <Plus size={20} />
            <span>New Chat</span>
          </button>
          <button className="text-white">
            <Search size={20} />
          </button>
          <button onClick={() => setSidebarOpen(false)} className="text-white md:hidden">
            <X size={20} />
          </button>
        </div>
        <input
          type="text"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white placeholder-gray-400"
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex-1 overflow-y-auto space-y-2">
          {history.filter((item) => item.question.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
            <div key={index} className="p-2 bg-gray-700 rounded-lg cursor-pointer">
              <p className="text-sm font-semibold">You: {item.question}</p>
              <p className="text-xs text-gray-300">Bot: {item.answer.slice(0, 50)}...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen">
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between border-b border-gray-700">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-xl">☰</button>
          <h2 className="text-lg font-bold">Aipan'sGPT</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-6 space-y-4 border-b border-gray-700">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <span className={`px-4 py-3 rounded-lg max-w-3xl text-base ${msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-700 text-white"}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 flex bg-gray-900">
          <input
            type="text"
            className="flex-1 p-3 border rounded-lg text-base bg-gray-800 text-white placeholder-gray-400 border-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="ml-2 bg-green-500 text-white px-6 py-3 rounded-lg">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;