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
  apply: async (imageData: ImageData, params: { level: number }) => {
    const data = imageData.data;
    const factor = 1 + params.level / 100;

    for (let i = 0; i < data.length; i += 4) {
      // Apply contrast to each channel
      data[i] = Math.min(
        255,
        Math.max(0, ((data[i] / 255 - 0.5) * factor + 0.5) * 255),
      );
      data[i + 1] = Math.min(
        255,
        Math.max(0, ((data[i + 1] / 255 - 0.5) * factor + 0.5) * 255),
      );
      data[i + 2] = Math.min(
        255,
        Math.max(0, ((data[i + 2] / 255 - 0.5) * factor + 0.5) * 255),
      );
    }

    return imageData;
  },
};
