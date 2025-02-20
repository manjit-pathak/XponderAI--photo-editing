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
  apply: async (imageData: ImageData) => {
    const data = imageData.data;
    const level = Math.pow(2, level / 100);

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * level); // Red
      data[i + 1] = Math.min(255, data[i + 1] * level); // Green
      data[i + 2] = Math.min(255, data[i + 2] * level); // Blue
    }

    return imageData;
  },
};
