export interface StoredImage {
  id: string;
  data: string; // base64 data
  name: string;
  timestamp: number;
}

class ImageStore {
  private readonly STORAGE_KEY = "sobi-images";
  private readonly MAX_IMAGES = 10;

  getImages(): StoredImage[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  addImage(file: File): Promise<StoredImage> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const images = this.getImages();
        const newImage: StoredImage = {
          id: crypto.randomUUID(),
          data: reader.result as string,
          name: file.name,
          timestamp: Date.now(),
        };

        // Remove oldest image if we're at capacity
        if (images.length >= this.MAX_IMAGES) {
          images.sort((a, b) => a.timestamp - b.timestamp);
          images.shift();
        }

        images.push(newImage);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(images));
        resolve(newImage);
      };

      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });
  }

  getImage(id: string): StoredImage | undefined {
    return this.getImages().find((img) => img.id === id);
  }

  removeImage(id: string): void {
    const images = this.getImages().filter((img) => img.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(images));
  }

  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const imageStore = new ImageStore();
