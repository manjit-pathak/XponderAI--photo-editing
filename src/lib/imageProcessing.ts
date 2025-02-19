export async function applyCinematicEffect(imageFile: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply cinematic color grading
      for (let i = 0; i < data.length; i += 4) {
        // Get RGB values
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate luminance
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        // Shadows to teal (adjust blue and green)
        if (luminance < 128) {
          data[i + 2] = Math.min(255, b * 1.2); // Boost blue
          data[i + 1] = Math.min(255, g * 1.1); // Slightly boost green
          data[i] = Math.max(0, r * 0.9); // Reduce red
        }
        // Highlights to orange (adjust red and green)
        else {
          data[i] = Math.min(255, r * 1.2); // Boost red
          data[i + 1] = Math.min(255, g * 1.05); // Slightly boost green
          data[i + 2] = Math.max(0, b * 0.8); // Reduce blue
        }

        // Contrast enhancement
        for (let j = 0; j < 3; j++) {
          const value = data[i + j];
          data[i + j] = Math.min(
            255,
            Math.max(0, ((value / 255 - 0.5) * 1.2 + 0.5) * 255),
          );
        }
      }

      // Put processed image data back
      ctx.putImageData(imageData, 0, 0);

      // Convert to base64 and resolve
      resolve(canvas.toDataURL("image/jpeg", 0.95));
    };

    // Load image from File
    img.src = URL.createObjectURL(imageFile);
  });
}
