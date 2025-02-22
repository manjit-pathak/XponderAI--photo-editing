export interface Filter {
  name: string;
  description: string;
  apply: (
    imageData: ImageData,
    parameters?: Record<string, any>,
  ) => Promise<ImageData>;
  parameters?: FilterParameter[];
}

export interface FilterParameter {
  name: string;
  type: "number" | "boolean" | "string";
  description: string;
  default: number | boolean | string;
  min?: number;
  max?: number;
  step?: number;
}
