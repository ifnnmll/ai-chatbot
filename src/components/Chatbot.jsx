import { useState } from "react";
import { fetchGeminiResponse } from "../api";
import { FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    const result = await fetchGeminiResponse(input);
    setResponse(result);
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
        {/* Judul Chatbot */}
        <h2 className="text-3xl font-extrabold text-blue-700 text-center">
          Gemini AI Chatbot
        </h2>
        <p className="text-gray-500 text-center mt-2 mb-4">
          Ajukan pertanyaanmu dan dapatkan jawaban instan!
        </p>

        {/* Chatbox untuk menampilkan respons */}
        <div className="w-full h-64 p-4 bg-gray-100 rounded-lg overflow-y-auto">
          {response ? (
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[85%] ml-auto text-left shadow-md">
              {response}
            </div>
          ) : (
            <p className="text-gray-400 text-center">Belum ada jawaban...</p>
          )}
        </div>

        {/* Input Pertanyaan */}
        <div className="flex items-center mt-4 space-x-2">
          <textarea
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
            rows="2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pertanyaanmu..."
          ></textarea>

          {/* Tombol Kirim */}
          <button
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            onClick={handleSend}
            disabled={isLoading}
          >
            {isLoading ? (
              "..."
            ) : (
              <FaPaperPlane className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
