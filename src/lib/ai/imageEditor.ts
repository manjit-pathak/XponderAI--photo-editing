import { chat, ChatMessage } from "./openrouter";
import { filters } from "../filters";
import { SELECTED_MODEL } from "./config";

const SYSTEM_PROMPT = `You are Sobi, an AI image editing assistant. You help users enhance their images through natural conversation. You can adjust brightness and contrast of images.

When suggesting adjustments:
- Always be specific with percentage values (e.g. "increase brightness by 30%")
- Use natural conversation while being precise with numbers
- Always assume changes will be visible to the user
- Describe what you're doing (e.g. "I've increased the brightness by 30% to make the image lighter")
- Never say you can't show changes or previews
- Never apologize for not being able to show changes
- Focus on describing what you did and how it affects the image

Example good responses:
"I've increased the brightness by 30% to make the image lighter and more vibrant."
"I've adjusted the contrast by 40% to make the colors pop more."
"I've made the image 20% brighter to bring out more detail in the shadows."

Example bad responses:
"I can't show you the changes"
"Unfortunately I can't display the edited image"
"The preview should be available"`;

export class ImageEditor {
  private messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  private selectedModel: string = SELECTED_MODEL.id;
  private currentImageData: string | null = null;

  setModel(modelId: string) {
    this.selectedModel = modelId;
  }

  setCurrentImage(imageData: string) {
    this.currentImageData = imageData;
    this.messages = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "system",
        content:
          "An image has been uploaded. You can now suggest adjustments for brightness and contrast.",
      },
    ];
  }

  async processUserRequest(userInput: string): Promise<{
    response: string;
    suggestedFilters: Array<{
      filter: string;
      parameters: Record<string, any>;
    }>;
  }> {
    if (!this.currentImageData) {
      return {
        response: "Please upload an image first before requesting adjustments.",
        suggestedFilters: [],
      };
    }

    this.messages.push({ role: "user", content: userInput });

    try {
      const aiResponse = await chat(this.messages, this.selectedModel);
      this.messages.push({ role: "assistant", content: aiResponse });

      const suggestedFilters: Array<{
        filter: string;
        parameters: Record<string, any>;
      }> = [];

      // Look for brightness adjustments
      const brightnessMatch = aiResponse
        .toLowerCase()
        .match(
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
      const contrastMatch = aiResponse
        .toLowerCase()
        .match(
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
