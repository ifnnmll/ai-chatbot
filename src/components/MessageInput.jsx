import { useState } from "react";
import { fetchGeminiResponse, analyzeImage } from "../api/api"; // Fungsi analisis gambar
import { Paperclip, Mic, ArrowUp, Image as ImageIcon } from "lucide-react";
import { storage } from "../firebase"; // Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MessageInput = ({ setMessages }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // State untuk upload gambar

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const botReply = await fetchGeminiResponse(input);
      setMessages((prev) => [
        ...prev,
        { text: botReply ?? "Maaf, saya tidak bisa menjawab saat ini.", sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Terjadi kesalahan. Coba lagi nanti.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      setMessages((prev) => [...prev, { imageUrl, sender: "user" }]);

      // Analisis gambar dengan AI
      const analysisResult = await analyzeImage(imageUrl);
      setMessages((prev) => [
        ...prev,
        { text: analysisResult ?? "Gambar berhasil dikirim, tapi tidak bisa dianalisis.", sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Gagal mengunggah gambar.", sender: "bot" },
      ]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center p-3 bg-gray-800">
      <div className="bg-gray-700 text-white px-3 py-2 rounded-2xl w-full max-w-xl flex flex-col items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Tanyakan apa saja..."
          className="w-full bg-transparent outline-none text-white text-center p-2 text-sm"
          disabled={loading || uploading}
        />

        <div className="flex justify-between w-full mt-2">
          <div className="flex gap-1">
            {/* Upload Gambar */}
            <label className="text-white bg-gray-600 hover:bg-gray-500 rounded-full p-1.5 cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <ImageIcon size={18} />
            </label>

            {/* Placeholder Tombol Mic */}
            <button className="text-white bg-gray-600 hover:bg-gray-500 rounded-full p-1.5">
              <Mic size={18} />
            </button>
          </div>

          <button
            onClick={sendMessage}
            className="text-white bg-gray-600 hover:bg-gray-500 rounded-full p-1.5 disabled:opacity-50"
            disabled={loading || uploading}
          >
            {loading || uploading ? "..." : <ArrowUp size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
