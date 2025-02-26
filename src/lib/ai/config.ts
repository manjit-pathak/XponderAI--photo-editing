export type ModelConfig = {
  id: string;
  name: string;
  contextWindow: number;
  costPer1kTokens: number;
  type: "openrouter" | "ollama";
};

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: "anthropic/claude-3-opus",
    name: "Claude 3 Opus",
    contextWindow: 200000,
    costPer1kTokens: 15,
    type: "openrouter",
  },
  {
    id: "llama2",
    name: "Llama 2 (Local)",
    contextWindow: 4096,
    costPer1kTokens: 0,
    type: "ollama",
  },
  {
    id: "mistral",
    name: "Mistral (Local)",
    contextWindow: 8192,
    costPer1kTokens: 0,
    type: "ollama",
  },
  {
    id: "anthropic/claude-3-sonnet",
    name: "Claude 3 Sonnet",
    contextWindow: 200000,
    costPer1kTokens: 3,
  },
  {
    id: "google/gemini-pro",
    name: "Gemini Pro",
    contextWindow: 30720,
    costPer1kTokens: 1,
  },
  {
    id: "mistralai/mistral-large",
    name: "Mistral Large",
    contextWindow: 32768,
    costPer1kTokens: 8,
  },
  {
    id: "mistralai/mistral-medium",
    name: "Mistral Medium",
    contextWindow: 32768,
    costPer1kTokens: 2.5,
  },
  {
    id: "mistralai/mistral-small",
    name: "Mistral Small",
    contextWindow: 32768,
    costPer1kTokens: 0.2,
  },
];

export const SELECTED_MODEL = AVAILABLE_MODELS[2]; // Default to Gemini Pro
