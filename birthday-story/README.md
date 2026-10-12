# 🎂 Birthday Story Website

A cinematic, interactive birthday story website for your girlfriend.

---

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in a browser.

---

## ✏️ Personalizing the Site

**You only need to edit ONE file:**

```
src/config/story.ts
```

Every placeholder is clearly marked with a comment like `─── REPLACE: ... ───`.

### What to fill in

| Field | Location in config | Example |
|---|---|---|
| Her name | `girlfriendName` | `"Priya"` |
| Background music | `music.src` | `"/assets/music/our-song.mp3"` |
| Birthday wish | `birthday.wish` | Multi-line text |
| Special message | `birthday.specialMessage` | Multi-line text (use `\n` for line breaks) |
| 2023 message | `memories[0].message` | Short personal line |
| 2024 message | `memories[1].message` | Short personal line |
| 2025 message | `memories[2].message` | Short personal line |
| 2026 message | `memories[3].message` | Short personal line |
| Final message | `ending.message` | Closing cinematic line |

---

## 📁 Where to Put Your Assets

Place files in `public/assets/` — they are served as-is:

```
public/
└── assets/
    ├── music/
    │   └── background-song.mp3     ← rename or update path in config
    │
    ├── photos/
    │   ├── 2023/
    │   │   └── cover.jpg           ← 2023 memory card photo
    │   ├── 2024/
    │   │   └── cover.jpg
    │   ├── 2025/
    │   │   └── cover.jpg
    │   └── 2026/
    │       └── cover.jpg
    │
    └── videos/
        ├── 2023.mp4
        ├── 2024.mp4
        ├── 2025.mp4
        └── 2026.mp4
```

Then update the paths in `src/config/story.ts` to match your file names.

**Supported formats:** MP3 / AAC for audio · JPG / PNG / WebP for photos · MP4 for videos.

---

## 🎬 Experience Flow

```
Entry screen (sound prompt)
    ↓
The Beginning — November 2022
    ↓
Birthday Cake + animated candles
    ↓
Make a Wish interaction
    ↓
Birthday Wish text
    ↓
Your Special Message (full-screen overlay)
    ↓
Our Story — timeline
    ↓
Year Memory Cards (2023 → 2026)
    ↓
Click card → Memory page with video
    ↓
Final Chapter
    ↓
"Our story isn't finished yet."
```

---

## 🎵 Music Notes

- Music starts only when the visitor clicks **Enter** (browser autoplay policy).
- Music continues across all sections.
- When a memory video is played, music volume automatically lowers.
- Music restores when the visitor returns to the timeline.
- The floating control (top-right) lets the visitor play/pause/mute at any time.

---

## Adding or Removing Years

In `src/config/story.ts`, the `memories` array drives the year cards.

- **Add a year:** append a new object to the `memories` array.
- **Remove a year:** delete its entry from the array.
- **No component changes needed.**

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Host it on any static hosting (Netlify, Vercel, GitHub Pages, etc.) — no backend needed.
