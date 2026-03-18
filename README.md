# FormatConverter

A free, web-based image format converter. Upload images and convert between PNG, JPEG, WebP, AVIF, GIF, and TIFF instantly with quality control and batch processing.

**[Live Demo](https://format-converter-pedromussi1s-projects.vercel.app/)**

## Features

- **Multi-Format Support** — Convert between PNG, JPEG, WebP, AVIF, GIF, and TIFF
- **Batch Conversion** — Upload and convert multiple images at once
- **Quality Control** — Adjustable quality slider for fine-tuning output file size
- **ZIP Download** — Download all converted files as a single ZIP archive
- **Format-Specific Pages** — SEO-optimized landing pages for each conversion type (e.g., PNG to WebP)
- **Compression Tips** — Helpful information about each format and when to use it
- **Server-Side Processing** — Images processed via Sharp for fast, high-quality conversion
- **Privacy Focused** — Files are processed in memory and never stored on the server
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

- Next.js 15 + React 19 + TypeScript + Tailwind CSS
- Sharp for high-performance image processing
- fflate for ZIP file creation
- Next.js API routes for server-side conversion

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

Deploy on [Vercel](https://vercel.com/new) by importing the GitHub repo. No configuration needed.

## License

MIT
