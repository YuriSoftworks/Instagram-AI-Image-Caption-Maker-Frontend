# Instagram AI Image Caption Maker (Frontend)

Generate creative, human-like, and SEO-optimized Instagram captions for your images using state-of-the-art AI models (BLIP + Google Gemini/Gemma). This is the Next.js frontend that connects to a FastAPI backend to upload images and display multiple caption styles.

## Unique Privacy Advantage (USP)

- Images are uploaded only to your own backend. The frontend never sends images to Google, OpenAI, or third-party services.
- In the recommended backend, the BLIP model runs locally to describe your image, and only the text description is sent to Gemini/Gemma for caption generation—keeping your image data private.

Note: This repository contains only the frontend UI. You’ll need the backend API running to generate captions.

## Features

- Drag-and-drop image upload with preview
- One-click "Upload to API" and progress state
- Captions grouped by style (e.g., Witty, Inspirational, Minimalist, Poetic, etc.)
- Copy-to-clipboard for any generated caption
- Responsive UI built with Tailwind CSS
- Works with the FastAPI backend endpoint `/upload_image/`

## Demo Flow

1. Select or drag an image (PNG/JPG/JPEG, up to 10 MB)
2. Click "Upload to API"
3. View generated captions by style and copy the ones you like

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn/bun)
- Running backend API (default: <http://localhost:8001>)
  - Ensure CORS allows <http://localhost:3000> from the backend

### Installation

```bash
# from the project root (this folder)
npm install

# start dev server
npm run dev
```

Open <http://localhost:3000> in your browser.

## Configuration

By default, the frontend expects the backend at `http://localhost:8001/upload_image/`.

- To change the API URL, update the fetch call in `src/components/ImageUpload.tsx`:
  - `fetch("http://localhost:8001/upload_image/", { method: "POST", body: formData })`
- Optional (recommended): switch to an environment variable, e.g., `NEXT_PUBLIC_API_BASE_URL`, and read it in the component.

Example `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend.example.com
```

Example usage in the component:

```ts
const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001";
const response = await fetch(`${apiBase}/upload_image/`, {
  method: "POST",
  body: formData,
});
```

## Usage Details

- Supported formats: PNG, JPG, JPEG
- Max size: 10 MB
- Current limit: 1 image per upload
- Captions appear grouped by style. Click the copy icon to copy a caption.

## Example API Response

```json
[
  {
    "style": "Witty",
    "captions": [
      "Just a frame...waiting for its masterpiece. 😏 #artinprogress #blankcanvas #justkidding #photography #blackandwhite",
      "This frame is accepting applications for stories. ✍️  Send your best! #storytime #potential #creative #photography #blackandwhite"
    ]
  },
  {
    "style": "Inspirational",
    "captions": [
      "The space to create. The space to grow. ✨ Your story is waiting to be written. #inspiration #motivation #create #grow #photography",
      "Embrace the blank page.  Every moment is a chance to start anew. 💍 #newbeginnings #possibilities #positivevibes #photography #blackandwhite"
    ]
  }
]
```

## Scripts

- `npm run dev` – Start the Next.js dev server
- `npm run build` – Build for production
- `npm run start` – Start the production server
- `npm run lint` – Lint the project

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- react-dropzone (custom UI wrapper in `src/components/ui/dropzone.tsx`)
- lucide-react icons

## Project Structure

```text
.
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ ImageUpload.tsx
│  │  └─ ui/
│  │     └─ dropzone.tsx
│  └─ lib/
│     └─ utils.ts
├─ next.config.ts
├─ package.json
└─ README.md
```

## Deployment

- Vercel is recommended for deploying the Next.js app.
- Ensure the backend API is reachable from your deployed URL and that CORS is configured accordingly.
- If using env vars for the API URL, set `NEXT_PUBLIC_API_BASE_URL` in your hosting platform.

## License

MIT License

## Contributing

PRs are welcome. Please open an issue to discuss significant changes.

## SEO Keywords

Instagram AI caption generator, image captioning frontend, Next.js, React, Tailwind CSS, BLIP, Gemini, Gemma, social media automation, creative captions, SEO Instagram captions, open source, content creator tools

## Star This Project

If this project helps you, please star it to support development and visibility!
