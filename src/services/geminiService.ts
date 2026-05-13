import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

export function getGemini() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export async function askMentor(prompt: string, context: string = "") {
  try {
    const ai = getGemini();
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const fullPrompt = `You are a Filipino "AI Sensei" mentor for Codemm, an education platform. 
    Keep responses tech-forward, encouraging, and clear. 
    Use a professional yet accessible tone. 
    Context: ${context}
    
    User message: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Mentor error:", error);
    return "I'm having a bit of trouble connecting right now, Gaille. Hang tight while I recalibrate my system.";
  }
}
