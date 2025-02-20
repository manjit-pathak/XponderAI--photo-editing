import { Filter } from "../types";

export const contrastFilter: Filter = {
  name: "Contrast",
  description: "Adjust the contrast of the image",
  parameters: [
    {
      name: "level",
      type: "number",
      description: "Contrast level (-100 to 100)",
      default: 0,
      min: -100,
      max: 100,
      step: 1,
    },
  ],
  apply: async (imageData: ImageData) => {
    const data = imageData.data;
    const factor = (259 * (level + 255)) / (255 * (259 - level));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128) + 128; // Red
      data[i + 1] = factor * (data[i + 1] - 128) + 128; // Green
      data[i + 2] = factor * (data[i + 2] - 128) + 128; // Blue
    }

    return imageData;
  },
};
