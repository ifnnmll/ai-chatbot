import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatGPTLayout = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "Halo! Saya adalah Gemini AI. Bagaimana saya bisa membantu?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "system", content: "Ini adalah respons dari Gemini AI..." },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">Gemini AI</h2>
        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded mb-4">
          + New Chat
        </button>
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          <button className="w-full py-2 px-4 hover:bg-gray-700 rounded mb-2">Chat 1</button>
          <button className="w-full py-2 px-4 hover:bg-gray-700 rounded mb-2">Chat 2</button>
        </div>

        {/* Footer Sidebar */}
        <div className="mt-4 border-t border-gray-700 pt-4">
          <button className="w-full py-2 px-4 hover:bg-gray-700 rounded">Settings</button>
          <button className="w-full py-2 px-4 hover:bg-gray-700 rounded mt-2">Log out</button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 border-b">
          <h1 className="text-xl font-bold">ChatGPT Clone</h1>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-lg shadow ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                <span className="block font-semibold">{msg.role === "user" ? "You:" : "AI:"}</span>
                <span>{msg.content}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <footer className="p-4 border-t bg-white">
          <div className="flex">
            <textarea
              className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none resize-none"
              rows="2"
              placeholder="Ketik pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? "..." : <FaPaperPlane />}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ChatGPTLayout;
