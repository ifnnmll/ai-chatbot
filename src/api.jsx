import axios from "axios";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const endpoint =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export const fetchGeminiResponse = async (prompt) => {
  try {
    const response = await axios.post(`${endpoint}?key=${apiKey}`, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.data.candidates[0]?.content.parts[0]?.text || "No response";
  } catch (error) {
    console.error("Error fetching Gemini API:", error);
    return "Error fetching response.";
  }
};
