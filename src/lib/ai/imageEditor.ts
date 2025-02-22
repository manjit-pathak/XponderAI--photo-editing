import { chat, ChatMessage } from "./openrouter";
import { filters } from "../filters";
import { SELECTED_MODEL } from "./config";

const SYSTEM_PROMPT = `You are an AI image editing assistant. You help users edit their images by suggesting and applying appropriate filters.
Available filters: ${Object.entries(filters)
  .map(([name, filter]) => `- ${name}: ${filter.description}`)
  .join("\n")}`;

export class ImageEditor {
  private messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  private selectedModel: string = SELECTED_MODEL.id;

  setModel(modelId: string) {
    this.selectedModel = modelId;
  }

  async processUserRequest(userInput: string): Promise<{
    response: string;
    suggestedFilters: Array<{
      filter: string;
      parameters: Record<string, any>;
    }>;
  }> {
    // Parse brightness adjustment from user input
    const brightnessMatch = userInput.match(/decrease.*brightness.*?(\d+)%/);
    if (brightnessMatch) {
      const percentage = parseInt(brightnessMatch[1]);
      return {
        response: `I'll decrease the brightness by ${percentage}%.`,
        suggestedFilters: [
          {
            filter: "brightness",
            parameters: { level: -percentage },
          },
        ],
      };
    }

    // Default response if no specific adjustment is recognized
    return {
      response:
        "I understand you want to edit the image. Please specify what kind of adjustment you'd like (e.g., 'decrease brightness by 50%')",
      suggestedFilters: [],
    };
  }

  async applyFilters(
    imageData: ImageData,
    filtersList: Array<{
      filter: string;
      parameters: Record<string, any>;
    }>,
  ): Promise<ImageData> {
    let currentImageData = imageData;

    for (const { filter, parameters } of filtersList) {
      if (filters[filter]) {
        currentImageData = await filters[filter].apply(
          currentImageData,
          parameters,
        );
      }
    }

    return currentImageData;
  }
}
