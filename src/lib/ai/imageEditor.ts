import { chat, ChatMessage } from "./openrouter";
import { filters } from "../filters";
import { SELECTED_MODEL } from "./config";

const SYSTEM_PROMPT = `You are Sobi, an AI image editing assistant. You help users enhance their images through natural conversation. You can adjust brightness and contrast of images.

When suggesting adjustments:
- Always be specific with percentage values
- Use natural conversation while being precise with numbers
- Never mention previews or applying changes in your responses
- Focus on describing the adjustments and their effects`;

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
    this.messages.push({ role: "user", content: userInput });

    try {
      const aiResponse = await chat(this.messages, this.selectedModel);
      this.messages.push({ role: "assistant", content: aiResponse });

      const suggestedFilters: Array<{
        filter: string;
        parameters: Record<string, any>;
      }> = [];

      // Look for brightness adjustments
      const brightnessMatch = aiResponse.match(
        /(?:increase|decrease|reduce|lower|raise)\s+(?:the\s+)?brightness\s+(?:by\s+)?(\d+)%/,
      );
      if (brightnessMatch) {
        const percentage = parseInt(brightnessMatch[1]);
        const direction = aiResponse.match(
          /(?:decrease|reduce|lower)\s+(?:the\s+)?brightness/,
        )
          ? -1
          : 1;
        suggestedFilters.push({
          filter: "brightness",
          parameters: { level: percentage * direction },
        });
      }

      // Look for contrast adjustments
      const contrastMatch = aiResponse.match(
        /(?:increase|decrease|reduce|lower|raise)\s+(?:the\s+)?contrast\s+(?:by\s+)?(\d+)%/,
      );
      if (contrastMatch) {
        const percentage = parseInt(contrastMatch[1]);
        const direction = aiResponse.match(
          /(?:decrease|reduce|lower)\s+(?:the\s+)?contrast/,
        )
          ? -1
          : 1;
        suggestedFilters.push({
          filter: "contrast",
          parameters: { level: percentage * direction },
        });
      }

      return {
        response: aiResponse,
        suggestedFilters,
      };
    } catch (error) {
      console.error("Error processing request:", error);
      return {
        response: "Sorry, I couldn't process that request.",
        suggestedFilters: [],
      };
    }
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
