import axios from "axios";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const endpoint =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export const fetchGeminiResponse = async (prompt) => {
  try {
    console.log("API Key:", apiKey); // Cek apakah API Key terbaca

    const response = await axios.post(
      `${endpoint}?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Ambil teks balasan AI
    const reply =
      response.data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ") ||
      "No response";

    return reply;
  } catch (error) {
    console.error("Error fetching Gemini API:", error);
    console.error("Response Data:", error.response?.data);
    return "Error fetching response.";
  }
};
