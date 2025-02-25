import { useState, useEffect } from "react";
import { fetchGeminiResponse } from "../api";
import { Plus, Search, X, Mic, Image as ImageIcon } from "lucide-react";

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
    let index = 0;
    const interval = setInterval(() => {
      setTypingResponse((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setMessages((prev) => [...prev, { text, sender: "bot" }]);
        setTypingResponse("");
        setIsTyping(false);
      }
    }, 50);
  };

  const startNewChat = () => {
    setMessages([]);
    setHasTyped(false);
  };

  const startRecording = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "id-ID";
    recognition.start();
    setRecording(true);

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
      setRecording(false);
    };

    recognition.onerror = () => setRecording(false);
  };

  return (
    <div className="flex h-screen w-full bg-gray-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className={`h-screen w-72 bg-gray-800 text-white p-4 flex flex-col border-r border-gray-700 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-72 md:translate-x-0"}`}>
        <div className="flex justify-between items-center mb-4">
          <button onClick={startNewChat} className="flex items-center text-white">
            <Plus size={20} className="mr-2" /> New Chat
          </button>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={20} className="text-white" />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 mt-4">
          {history.filter((item) => item.question.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
            <div key={index} className="p-2 bg-gray-700 rounded-lg">
              <p className="text-sm font-semibold">You: {item.question}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen">
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between border-b border-gray-700">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-xl">☰</button>
          <h2 className="text-lg font-bold">Aipan'sGPT</h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-16 py-6 space-y-4 border-b border-gray-700">
          {messages.length === 0 ? (
            <>
              <p className="text-gray-400 text-lg">Apa yang bisa saya bantu?</p>
              {!hasTyped && (
                <input
                  type="text"
                  className="mt-4 p-4 w-96 border rounded-lg text-base bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                />
              )}
            </>
          ) : (
            <div className="w-full">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <span className={`px-4 py-3 rounded-lg max-w-3xl text-base ${msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-700 text-white"}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {hasTyped && (
          <div className="p-4 flex bg-gray-900">
            <button onClick={startRecording} className="mr-2 bg-blue-500 text-white px-4 py-3 rounded-lg">
              <Mic size={20} />
            </button>
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
        )}
      </div>
    </div>
  );
};

export default Chatbot;
