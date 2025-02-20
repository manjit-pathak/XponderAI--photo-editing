import { SELECTED_MODEL } from "./config";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("OpenRouter API key is not set in .env file");
}
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// OpenRouter headers for Gemini models
const HEADERS = {
  "HTTP-Referer": window.location.origin,
  "X-Title": "Image Editor Assistant",
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENROUTER_API_KEY}`,
  "X-Model-Priority": JSON.stringify([
    "google/gemini-2.0-flash-thinking-exp:free",
  ]),
};

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function chat(messages: ChatMessage[]) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        model: SELECTED_MODEL.id,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to get AI response");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
}
