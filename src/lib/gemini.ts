import { GoogleGenAI, Type } from "@google/genai";

// Initialization - process.env.GEMINI_API_KEY is available via Vite define
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function processVoiceLog(transcript: string, context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Analyze this voice check-in for the "Anonymouse" app.
        Transcript: "${transcript}"
        Context: ${context}
      `,
      config: {
        systemInstruction: `
          You are an empathetic AI Sponsor. 
          Provide:
          1. Empathetic summary.
          2. Key details object.
          3. A "Daily Calm" tip.
          Return ONLY valid JSON.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            details: { type: Type.OBJECT },
            tip: { type: Type.STRING }
          },
          required: ["summary", "details", "tip"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini Error:", err);
    throw err;
  }
}
