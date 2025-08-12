# Instagram AI Image Caption Maker (Frontend)

[![GitHub stars](https://img.shields.io/github/stars/jambhaleAnuj/Instagram-AI-Image-Caption-Maker-Frontend-?style=social)](https://github.com/jambhaleAnuj/Instagram-AI-Image-Caption-Maker-Frontend-/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jambhaleAnuj/Instagram-AI-Image-Caption-Maker-Frontend-?style=social)](https://github.com/jambhaleAnuj/Instagram-AI-Image-Caption-Maker-Frontend-/network/members)
[![Issues](https://img.shields.io/github/issues/jambhaleAnuj/Instagram-AI-Image-Caption-Maker-Frontend-)](https://github.com/jambhaleAnuj/Instagram-AI-Image-Caption-Maker-Frontend-/issues)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
[![CI](https://github.com/jambhaleAnuj/Instagram-AI-Image-Caption-Maker-Frontend-/actions/workflows/ci.yml/badge.svg)](https://github.com/jambhaleAnuj/Instagram-AI-Image-Caption-Maker-Frontend-/actions)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FjambhaleAnuj%2FInstagram-AI-Image-Caption-Maker-Frontend-&project-name=instagram-ai-caption-maker-frontend&repository-name=Instagram-AI-Image-Caption-Maker-Frontend-&demo-title=Instagram%20AI%20Caption%20Generator&demo-description=Privacy-first%20AI%20Instagram%20caption%20generator%20using%20BLIP%20%2B%20Gemini%2FGemma&demo-url=https%3A%2F%2Fexample.com&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fvercel%2Fnext.js%2Fcanary%2Fpackages%2Fcreate-next-app%2Ftemplates%2Fapp%2Fpublic%2Fopengraph-image.png)

Generate creative, human-like, and SEO-optimized Instagram captions for your images using state-of-the-art AI models (BLIP + Google Gemini/Gemma). This is the Next.js frontend that connects to a FastAPI backend to upload images and display multiple caption styles. If you’re searching for an “Instagram caption generator,” “AI Instagram captions,” or “image-to-caption tool,” this project gives you a fast, privacy-first, and open-source solution.

## Table of Contents

- [Unique Privacy Advantage (USP)](#unique-privacy-advantage-usp)
- [Features](#features)
- [Live Demo](#live-demo)
- [Demo Flow](#demo-flow)
- [Why This Frontend](#why-this-frontend)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage Details](#usage-details)
- [Example API Response](#example-api-response)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)
- [SEO Keywords](#seo-keywords)
- [Star This Project](#star-this-project)
- [GitHub SEO Checklist](#github-seo-checklist)

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
- Privacy-first Instagram caption generator (BLIP + Gemini/Gemma)

## Live Demo

- Coming soon. You can deploy instantly on Vercel and point to your backend API.

## Demo Flow

1. Select or drag an image (PNG/JPG/JPEG, up to 10 MB)
2. Click "Upload to API"
3. View generated captions by style and copy the ones you like

## Why This Frontend

- SEO-optimized structure and content to improve discoverability on GitHub and search engines
- Clean UX with clear CTA for image-to-caption generation
- Extensible and framework-agnostic API consumption (simply change the API base URL)
- Privacy-first messaging aligned with the backend’s local BLIP processing

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

This app reads `NEXT_PUBLIC_API_BASE_URL` and falls back to `http://localhost:8001` if not set. Requests are sent to `${API_BASE}/upload_image/`.

- Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend.example.com
```

- No code change is required. The component already uses the env variable with a localhost fallback.

Example (used internally):

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

## Screenshots

Add a social preview and screenshots to increase clicks and stars:

- Repo Settings → Social preview → Upload a banner (1200×630). Recommended text: “Instagram AI Caption Generator – BLIP + Gemini/Gemma – Privacy-first”.
- Place screenshots at `public/` and reference them here, for example:

```markdown
![Upload UI](public/screenshot-upload.png)
![Generated Captions](public/screenshot-captions.png)
```

## Deployment

- Vercel is recommended for deploying the Next.js app.
- Ensure the backend API is reachable from your deployed URL and that CORS is configured accordingly.
- If using env vars for the API URL, set `NEXT_PUBLIC_API_BASE_URL` in your hosting platform.

## FAQ

- Is this a free Instagram caption generator?
  - Yes, this open-source frontend connects to your own backend, so you control costs.
- Does this generate captions from images using AI?
  - Yes. The backend uses BLIP for image understanding and Gemini/Gemma for creative captions.
- Is my image private and safe?
  - Images are processed by your backend. The recommended setup keeps images local and sends only text to LLMs.
- Can I deploy this and use it on mobile?
  - Yes. Deploy on Vercel; it’s responsive and works on mobile browsers.
- Can I customize caption styles?
  - Yes. Extend the backend prompt/styles and the frontend will render them automatically.

## Contributing

PRs are welcome. Please open an issue to discuss significant changes. Star the repo to support visibility and growth.

## License

GNU Affero General Public License v3.0

## SEO Keywords

Instagram AI caption generator, Instagram caption generator, AI Instagram captions, image captioning frontend, Next.js Instagram captions, React Instagram captions, Tailwind CSS UI, BLIP image captioning, Gemini, Gemma, social media automation, creative captions, SEO Instagram captions, open source, content creator tools, photo caption generator, image to caption AI, best Instagram caption generator

## Star This Project

If this project helps you, please star it. Stars and shares help more creators discover a privacy-first caption generator.

## GitHub SEO Checklist

- Add GitHub Topics: `instagram`, `caption-generator`, `ai`, `blip`, `gemini`, `gemma`, `nextjs`, `react`, `tailwindcss`, `fastapi`.
- Write a concise repo description with primary keywords.
- Upload a strong Social preview image (see Screenshots).
- Keep README updated with clear Features, Demo, and Screenshots.
- Share the repo on X/LinkedIn/Reddit and cross-link from your backend repo.
- Pin the repo to your GitHub profile for extra visibility.

