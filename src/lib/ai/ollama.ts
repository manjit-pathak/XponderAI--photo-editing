export interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function ollamaChat(messages: OllamaMessage[], model: string) {
  try {
    const response = await fetch(`http://localhost:11434/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error("Ollama Chat Error:", error);
    throw error;
  }
}
