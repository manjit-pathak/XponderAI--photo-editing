export type ModelConfig = {
  id: string;
  name: string;
  contextWindow: number;
  costPer1kTokens: number;
};

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: "google/gemini-2.0-flash-thinking-exp:free",
    name: "Gemini 2.0 Flash",
    contextWindow: 32000,
    costPer1kTokens: 0,
  },
];

export const SELECTED_MODEL = AVAILABLE_MODELS[0]; // Using free Gemini model
