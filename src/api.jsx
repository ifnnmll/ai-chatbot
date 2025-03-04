import axios from "axios";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("API Key tidak ditemukan! Pastikan sudah diatur di .env");
}

const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

export const fetchGeminiResponse = async (prompt) => {
  try {
    console.log("Menggunakan API Key:", apiKey);

    const response = await axios.post(
      API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response dari API:", response.data);

    // Ambil teks balasan AI dengan aman
    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, saya tidak bisa menjawab.";

    return reply;
  } catch (error) {
    console.error("Error saat mengambil respons dari Gemini API:", error);
    
    // Cek apakah ada response dari server
    if (error.response) {
      console.error("Detail Kesalahan:", error.response.data);
      return `Error: ${error.response.data.error?.message || "Terjadi kesalahan saat mengambil data."}`;
    }

    return "Terjadi kesalahan saat mengambil data.";
  }
};
