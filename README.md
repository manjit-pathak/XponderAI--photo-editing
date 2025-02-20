# XponderAI - AI-Powered Photo Editor

A modern web application that combines AI assistance with powerful image editing capabilities. Upload your photos and get real-time AI suggestions for enhancing them using our built-in filters.

## Features

### Image Processing
- Clean, drag-and-drop upload interface
- Side-by-side comparison view of original and processed images
- Real-time image processing with custom filters
- Multiple export formats (PNG, JPG, WebP)

### AI Assistant
- Built-in AI chat interface powered by Gemini
- Smart filter suggestions based on your requests
- Natural language processing for image editing commands
- Real-time assistance and explanations

### Image Filters
- Brightness adjustment
- Contrast enhancement
- More filters coming soon!

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- ShadcnUI Components
- Framer Motion
- OpenRouter API (with Gemini)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- OpenRouter API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Create a .env file in the root directory:
```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:5173
```

## Using the App

1. **Upload an Image**
   - Drag and drop an image onto the upload zone
   - Or click the upload button to select from your files

2. **Edit with AI**
   - Click the chat bubble icon in the bottom right
   - Describe what changes you want to make
   - The AI will suggest appropriate filters and settings

3. **Apply Filters**
   - Use the editing toolbar to apply suggested filters
   - Adjust filter parameters as needed
   - See real-time changes in the comparison view

4. **Export**
   - Choose your desired export format (PNG, JPG, WebP)
   - Click the download button to save your edited image

## Development

Available commands:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run typecheck
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details
