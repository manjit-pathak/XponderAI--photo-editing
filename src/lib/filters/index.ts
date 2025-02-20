import { brightnessFilter } from "./basic/brightness";
import { contrastFilter } from "./basic/contrast";
import { Filter } from "./types";

export const filters: Record<string, Filter> = {
  brightness: brightnessFilter,
  contrast: contrastFilter,
};

export * from "./types";
