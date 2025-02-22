import { Filter } from "../types";

export const brightnessFilter: Filter = {
  name: "Brightness",
  description: "Adjust the brightness of the image",
  parameters: [
    {
      name: "level",
      type: "number",
      description: "Brightness level (-100 to 100)",
      default: 0,
      min: -100,
      max: 100,
      step: 1,
    },
  ],
  apply: async (imageData: ImageData, params: { level: number }) => {
    const data = imageData.data;
    const factor = 1 + params.level / 100;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, data[i] * factor)); // Red
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * factor)); // Green
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * factor)); // Blue
    }

    return imageData;
  },
};
