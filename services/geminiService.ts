import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_OWNER, ABOUT_TEXT, SKILLS, EXPERIENCE, PROJECTS } from '../constants';

// Construct the system instruction based on the portfolio data
const SYSTEM_INSTRUCTION = `
You are an AI assistant for the portfolio of ${PORTFOLIO_OWNER}.
Your goal is to answer visitor questions specifically about ${PORTFOLIO_OWNER}'s background, skills, and projects in a professional yet friendly tone.

Here is the context about ${PORTFOLIO_OWNER}:

Bio:
${ABOUT_TEXT}

Skills:
${SKILLS.map(s => `- ${s.name} (${s.level}%)`).join('\n')}

Experience:
${EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

If a user asks about something not in this data (like general knowledge, math, or history unrelated to the portfolio), politely redirect them back to discussing the portfolio. 
Keep answers concise (under 3 sentences usually) unless asked for details.
`;

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing from environment variables.");
      throw new Error("API Key not found");
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    const ai = getClient();
    
    // Using gemini-2.5-flash for fast, responsive chat
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having trouble connecting to my brain right now. Please check the console or try again later.";
  }
};
