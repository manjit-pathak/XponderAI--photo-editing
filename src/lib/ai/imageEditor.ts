import { chat, ChatMessage } from "./openrouter";
import { filters } from "../filters";

const SYSTEM_PROMPT = `You are an AI image editing assistant. You help users edit their images by suggesting and applying appropriate filters.
Available filters: ${Object.entries(filters)
  .map(([name, filter]) => `- ${name}: ${filter.description}`)
  .join("\n")}`;

export class ImageEditor {
  private messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  async processUserRequest(userInput: string): Promise<{
    response: string;
    suggestedFilters: Array<{
      filter: string;
      parameters: Record<string, any>;
    }>;
  }> {
    this.messages.push({ role: "user", content: userInput });

    const response = await chat(this.messages);
    this.messages.push({ role: "assistant", content: response });

    // Parse the response to extract filter suggestions
    const suggestedFilters = [];
    if (response.includes("FILTERS:")) {
      const filterSection = response.split("FILTERS:")[1].split("\n");
      for (const line of filterSection) {
        const match = line.match(/([a-zA-Z]+):\s*{([^}]+)}/);
        if (match) {
          const [_, filterName, paramsStr] = match;
          const params = Object.fromEntries(
            paramsStr.split(",").map((p) => {
              const [key, value] = p.split(":").map((s) => s.trim());
              return [key, Number(value) || value];
            }),
          );
          suggestedFilters.push({ filter: filterName, parameters: params });
        }
      }
    }

    return {
      response,
      suggestedFilters,
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
        currentImageData = await filters[filter].apply(currentImageData);
      }
    }

    return currentImageData;
  }
}
