# Our 60 Days 💌

A cinematic, emotional 2-month anniversary website — a digital love scrapbook built with React.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Customize everything

Edit **`src/data/content.js`** — names, dates, timeline, reasons, letters, gallery captions, password answers, and more.

### Password gate

Default unlock answers (change in `content.js`):

- `2026-03-20`
- `03/20/2026`

### Your photos

Replace Unsplash URLs in `content.js` with:

- Local files in `public/images/your-photo.jpg` → use `/images/your-photo.jpg`
- Or your own hosted URLs

### Voice notes

1. Add `.mp3` or `.m4a` files to `public/voice-notes/`
2. In `content.js`, set `src: '/voice-notes/my-message.mp3'` for each note

## Pages

| Route | Section |
|-------|---------|
| `/` | Hero + live counter |
| `/timeline` | Relationship story |
| `/reasons` | Flip cards — why I love you |
| `/voice` | Voice notes player |
| `/letter` | Handwritten love letter |
| `/gallery` | Draggable polaroids |
| `/open-when` | Open when… cards |
| `/games` | Quiz, dates, puzzle, catch hearts |
| `/finale` | Emotional ending |

Click **✦** stars anywhere for hidden love notes.

## Deploy (Vercel)

```bash
npm run build
```

Push to GitHub and import the repo on [vercel.com](https://vercel.com) — framework preset: **Vite**.

## Tech

- React + Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- React Vertical Timeline

Made with love. Make it yours. ❤️
