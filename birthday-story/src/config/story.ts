// ============================================================
// STORY CONFIGURATION — Edit this file to personalize the site
// ============================================================

export type Memory = {
  id: string;
  year: string;
  title: string;
  /** Path relative to /public — e.g. "/assets/photos/2023/cover.jpg" */
  coverImage?: string;
  /** Path relative to /public — e.g. "/assets/videos/2023.mp4" */
  video?: string;
  /** Short personal message shown below the video */
  message?: string;
  /** Optional short description shown on the memory card */
  description?: string;
  /** Optional date string, e.g. "May 13, 2023" */
  date?: string;
};

export type StoryConfig = {
  /** ─── REPLACE: Her name or nickname ─── */
  girlfriendName: "Suppuu";

  /** Background music that plays throughout the experience */
  music?: {
    /** Path relative to /public — e.g. "/assets/music/background-song.mp3" */
    src: string;
    title?: string;
  };

  /** First section — the very beginning of the story */
  opening: {
    date: string;
    title: string;
    description?: string;
  };

  /** The moment the relationship became official */
  officialRelationship: {
    date: string;
    title: string;
    description?: string;
  };

  /** Birthday section content */
  birthday: {
    /** ─── REPLACE: Main birthday wish text ─── */
    wish: string;
    /** ─── REPLACE: Personal special message (multi-line, use \n) ─── */
    specialMessage: string;
  };

  /** Array of yearly memories — add/remove years freely */
  memories: Memory[];

  /** Final chapter content */
  ending: {
    /** ─── REPLACE: Message in final chapter ─── */
    message: string;
    finalLine: string;
  };
};

// ============================================================
// CONTENT — Replace placeholders with real content
// ============================================================

export const storyConfig: StoryConfig = {
  // ─── REPLACE: Her name ───────────────────────────────────
  girlfriendName: "Suppuu",

  // ─── REPLACE: Background music path ─────────────────────
  music: {
    src: "/assets/music/music.mp3",
    title: "Our Song",
  },

  opening: {
    date: "November 2022",
    title: "The Beginning",
    description: "The day our story quietly began.",
  },

  officialRelationship: {
    date: "13 May 2023",
    title: "The Day We Became Us",
    description: "The day it officially became our story.",
  },

  birthday: {
    // ─── REPLACE: Birthday wish ───────────────────────────
    wish: "Before I wish you another year of happiness,\nI want to take you back through the little moments\nthat made these years so special.",

    // ─── REPLACE: Special personal message ───────────────
    specialMessage:
      "Every day with you feels like a chapter\nI never want to finish reading.\n\nYou have this way of making ordinary moments\nfeel like they matter — and they do.\n\nThank you for being exactly who you are.\n\nHappy Birthday, [HER_NAME].\n\nAnd this is only the beginning...",
  },

  // ─── REPLACE: Add/remove years and fill in real content ──
  memories: [
    {
      id: "2023",
      year: "2023",
      title: "Our First Chapter",
      // ─── REPLACE: Path to 2023 cover photo ───────────────
      coverImage: "/assets/photos/2023/cover.jpg",
      // ─── REPLACE: Path to 2023 video ──────────────────────
      video: "/assets/videos/2023.mp4",
      // ─── REPLACE: Short message for 2023 ──────────────────
      message:
        "[2023_MESSAGE] — I don't think we realized how many memories we were about to create together.",
      description: "Where everything started.",
      date: "2023",
    },
    {
      id: "2024",
      year: "2024",
      title: "Growing Together",
      // ─── REPLACE: Path to 2024 cover photo ───────────────
      coverImage: "/assets/photos/2024/cover.jpg",
      // ─── REPLACE: Path to 2024 video ──────────────────────
      video: "/assets/videos/2024.mp4",
      // ─── REPLACE: Short message for 2024 ──────────────────
      message:
        "[2024_MESSAGE] — Every year I find more reasons to be grateful you're in my life.",
      description: "Every day a little more.",
      date: "2024",
    },
    {
      id: "2025",
      year: "2025",
      title: "Making Memories",
      // ─── REPLACE: Path to 2025 cover photo ───────────────
      coverImage: "/assets/photos/2025/cover.jpg",
      // ─── REPLACE: Path to 2025 video ──────────────────────
      video: "/assets/videos/2025.mp4",
      // ─── REPLACE: Short message for 2025 ──────────────────
      message:
        "[2025_MESSAGE] — Some years you look back and realize they shaped everything.",
      description: "Moments that stayed.",
      date: "2025",
    },
    {
      id: "2026",
      year: "2026",
      title: "Right Now",
      // ─── REPLACE: Path to 2026 cover photo ───────────────
      coverImage: "/assets/photos/2026/cover-copy.jpeg",
      // ─── REPLACE: Path to 2026 video ──────────────────────
      video: "/assets/videos/2026.mp4",
      // ─── REPLACE: Short message for 2026 ──────────────────
      message:
        "[2026_MESSAGE] — And here we are. Still writing the story.",
      description: "And still going.",
      date: "2026",
    },
  ],

  ending: {
    // ─── REPLACE: Final chapter message ──────────────────
    message:
      "And after everything we've been through... I still wouldn't change the way our story began.",
    finalLine:
      "Our story isn't finished yet.\nChapter 1 was only the beginning.",
  },
};
