# Birthday Story Website --- Autonomous Build Specification

## 1. Purpose

Build a polished, cinematic, romantic birthday website for the user's
girlfriend.

The website should feel like an interactive story about the relationship
rather than a conventional birthday landing page.

The story begins with the first meeting in **November 2022**, becomes
official on **13 May 2023**, continues through yearly memories, and ends
with a forward-looking message.

The implementation must be autonomous: an AI coding agent should be able
to read this document, create the complete website, run it locally, and
make reasonable implementation decisions without asking the user
questions.

The only information the user should need to provide is the **path to
photos, videos, audio, and other media assets**.

------------------------------------------------------------------------

# 2. Core Experience

The website follows this narrative:

``` text
Entry / Sound Prompt
        ↓
The Beginning — November 2022
        ↓
Birthday Cake + Candles
        ↓
Birthday Wish
        ↓
"Your Special Message"
        ↓
Personal Birthday Message
        ↓
"Our Story"
        ↓
Timeline / Year Carousel
        ↓
Clickable Year Memory
        ↓
Cinematic Opening Transition
        ↓
Video
        ↓
Short Personal Message
        ↓
Return to Timeline
        ↓
More Years / Memories
        ↓
Final Chapter
        ↓
"To Be Continued..."
        ↓
Final Birthday Message
```

The site must feel cohesive. Every section should visually transition
into the next.

------------------------------------------------------------------------

# 3. Design Direction

## Overall aesthetic

Use a:

**Dark cinematic + warm romantic memory-album aesthetic**

Avoid a generic Valentine's Day design.

Do NOT make the website excessively pink, red, glittery, or childish.

Preferred visual characteristics:

-   Deep black / near-black / dark navy background
-   Warm white typography
-   Subtle gold, champagne, blush, or warm-pink accents
-   Soft glow
-   Cinematic lighting
-   Subtle film grain
-   Very subtle floating particles
-   Elegant typography
-   Large editorial headings
-   Smooth transitions
-   Rounded corners where appropriate
-   Soft shadows
-   Minimal glassmorphism
-   Photos and videos should carry most of the emotional impact

The interface should feel premium, intimate, cinematic, and personal.

------------------------------------------------------------------------

# 4. Technical Requirements

The implementation should be a modern responsive web application.

Preferred stack:

-   React
-   Vite
-   TypeScript
-   CSS / CSS Modules or a clean styling system
-   Framer Motion or another reliable animation library
-   HTML5 video
-   HTML5 Audio

If the coding environment already provides a suitable framework, use the
existing framework rather than unnecessarily changing the project.

No backend is required.

No database is required.

No authentication is required.

No API is required.

All content should be local/static.

The website must work by opening/running the local project after assets
are supplied.

------------------------------------------------------------------------

# 5. Asset Configuration

The user should only have to modify a central asset/content
configuration.

Create a file such as:

``` text
src/config/story.ts
```

or an equivalent clearly documented configuration file.

All personal content and asset paths should be centralized there.

Example:

``` ts
export const storyConfig = {
  girlfriendName: "HER_NAME",

  music: {
    src: "/assets/music/background-song.mp3",
    title: "Song Name"
  },

  opening: {
    firstMeetingDate: "November 2022"
  },

  relationship: {
    officialDate: "13 May 2023"
  },

  years: [
    {
      year: "2023",
      title: "Our First Chapter",
      coverImage: "/assets/photos/2023/cover.jpg",
      video: "/assets/videos/2023.mp4",
      message: "Short personal message..."
    }
  ]
};
```

The agent must make it obvious where the user should replace:

-   Her name
-   Photos
-   Videos
-   Background music
-   Year titles
-   Year messages
-   Optional dates
-   Optional memory descriptions

Do not scatter asset paths throughout components.

------------------------------------------------------------------------

# 6. Entry Experience

The first screen should be a full-screen cinematic entry screen.

Suggested content:

``` text
A little story
for you

November 2022

[ Enter ]

Turn your sound on
```

The exact wording can be adapted if a more elegant equivalent is
appropriate.

## Purpose

This screen solves the browser autoplay restriction.

Do NOT attempt to force autoplay with sound before user interaction.

When the user clicks `Enter`:

1.  Start the background song.
2.  Start the opening animation.
3.  Transition into the story.
4.  Keep the audio playing throughout the experience.

The music should not restart every time the user changes sections.

------------------------------------------------------------------------

# 7. Background Music

A single background song should play continuously across the website.

Requirements:

-   Start only after the user interacts with the entry screen.
-   Continue between sections.
-   Do not restart during normal navigation.
-   Provide a small floating music control.
-   Music control should support:
    -   Play
    -   Pause
    -   Mute
    -   Unmute
-   The current music state should be visually obvious but subtle.
-   Do not let background music interfere with video audio if videos
    contain important sound.

Recommended behavior when opening a memory video:

-   Lower the background music substantially or pause it.
-   Play the video.
-   Restore the background music when returning to the timeline.

The implementation should use a single persistent audio controller/state
rather than creating separate audio elements for every section.

------------------------------------------------------------------------

# 8. Opening --- "The Beginning"

After clicking Enter, transition into the first story section.

Display:

``` text
THE BEGINNING

November 2022

The day our story quietly began.
```

The wording can be refined to match the available content.

## Animation

Use a cinematic reveal.

Suggested sequence:

1.  Dark screen.
2.  Very subtle particles / film grain.
3.  Small text fades in.
4.  `November 2022` appears.
5.  A soft light/glow develops.
6.  Text fades or moves upward.
7.  Transition into the birthday cake section.

Do not make the animation excessively long.

Target transition duration:

**2--4 seconds**

------------------------------------------------------------------------

# 9. Birthday Cake Section

Create a prominent animated birthday cake.

The cake should be centered and visually important.

## Required elements

-   Birthday cake
-   Candles
-   Animated candle flames
-   Birthday heading
-   Birthday wish
-   Optional subtle particles/glow

Example structure:

``` text
Happy Birthday,
HER_NAME

[ Animated Cake ]

May your smile always...
```

The final wording should be configurable.

------------------------------------------------------------------------

# 10. Candle Interaction

The cake should have interactive candles.

Possible implementation:

-   Candles gently flicker.
-   Clicking a `Make a Wish` control extinguishes the candles.
-   If supported reliably, optionally allow microphone/blow interaction,
    but this is NOT required.
-   Do not make microphone permission mandatory.

Primary interaction:

``` text
[ Make a Wish ]
```

When clicked:

1.  Candle flames extinguish.
2.  Small smoke animation appears.
3.  Ambient glow changes.
4.  Birthday text transitions.
5.  Continue to the next part.

The experience must work without microphone access.

------------------------------------------------------------------------

# 11. Birthday Wish

After the candles are extinguished, display the main birthday wish.

The message should feel personal, not generic.

Structure:

``` text
Happy Birthday, HER_NAME

Before I wish you another year of happiness,
I want to take you back through the little moments
that made these years so special.
```

The exact message should be configurable.

Use a typewriter, line-by-line reveal, or elegant fade-in.

Avoid excessive typing effects. The result should feel cinematic.

------------------------------------------------------------------------

# 12. "Your Special Message"

After the cake/wish section, show:

``` text
But there's something
I want you to hear first...

[ Your Special Message ]
```

The button must be visually prominent but elegant.

Suggested interaction:

-   Hover: subtle glow / scale
-   Click: smooth full-screen transition
-   Button disappears during transition

------------------------------------------------------------------------

# 13. Special Message Screen

This is the emotional centerpiece of the website.

Open a dedicated full-screen section.

Display a personal birthday message.

The message should appear gradually.

Possible presentation:

-   Text reveals line-by-line.
-   Background remains dark and cinematic.
-   Very subtle moving particles.
-   Optional blurred relationship photo in the background.
-   Use large elegant typography.
-   Avoid excessive UI.

End with:

``` text
And this is only the beginning...
```

Then transition to the timeline.

The actual message should be configurable in the content configuration.

------------------------------------------------------------------------

# 14. "Our Story" Timeline

Create a section titled:

``` text
OUR STORY
```

Subheading:

``` text
Some moments become memories.
Some memories become a story.
```

The timeline should represent the relationship chronologically.

Minimum conceptual milestones:

### November 2022

**The First Meeting**

Description:

``` text
We didn't know it then,
but this was the beginning.
```

### 13 May 2023

**The Day We Became Us**

Description:

``` text
The day it officially became our story.
```

Then yearly memories:

-   2023
-   2024
-   2025
-   2026

Only render years for which content/assets exist.

The user should be able to add/remove years from the configuration
without modifying components.

------------------------------------------------------------------------

# 15. Timeline Carousel

Use a horizontal carousel for yearly memory cards.

Example:

``` text
        [ 2023 ]
[ 2022 ] [ 2024 ] [ 2025 ]
        [ 2026 ]
```

Actual layout can vary based on screen size.

## Desktop

-   Show multiple cards.
-   Center card should be slightly larger.
-   Adjacent cards should appear slightly smaller.
-   Use horizontal scrolling/swiping.
-   Add subtle depth.

## Mobile

-   Show one primary card at a time.
-   Allow swipe gestures.
-   Keep cards large enough to read.
-   Avoid horizontal page overflow.

------------------------------------------------------------------------

# 16. Memory Card Design

Each year card should feel like a physical memory/photo album card.

Example:

``` text
┌──────────────────────────┐
│                          │
│      COVER PHOTO         │
│                          │
│          2023            │
│     Our First Chapter    │
│                          │
│       Open Memory        │
│                          │
└──────────────────────────┘
```

Each card should contain:

-   Year
-   Title
-   Cover image
-   Optional short description
-   Open/arrow indicator

Hover animation:

-   Slight upward movement
-   Subtle scale
-   Soft glow
-   Image movement/parallax if appropriate

Do not over-animate.

------------------------------------------------------------------------

# 17. Clicking a Memory Card

This is a major cinematic transition.

When a user clicks a card:

### Phase 1 --- Card focus

-   Selected card moves toward center.
-   Other cards fade/dim.
-   Card slightly enlarges.

### Phase 2 --- Expansion

-   Selected card expands toward full screen.
-   Cover image fills the viewport.
-   Background darkens.

### Phase 3 --- Transition

Use a smooth cinematic transition.

Possible effects:

-   Zoom
-   Blur
-   Crossfade
-   Image expansion
-   Light sweep

Avoid cheap-looking spinning/flipping transitions.

### Phase 4 --- Memory page

Show the selected year's memory page.

------------------------------------------------------------------------

# 18. Memory Page

Each year should have its own reusable memory template.

Structure:

``` text
2023

OUR FIRST CHAPTER

[ VIDEO ]

Short personal message...

[ ← Back to Our Story ]
```

Optional elements:

-   Date
-   Location
-   Small memory captions
-   Photos
-   Quotes
-   Short list of meaningful moments

Do not require these optional fields.

------------------------------------------------------------------------

# 19. Video Playback

Every year card may have a pre-made video.

The video should be local/static.

Requirements:

-   Use HTML5 video.
-   Support common formats such as MP4.
-   Show poster/cover image before playback.
-   Provide standard playback controls.
-   Do not automatically play with sound unless browser rules permit it
    after user interaction.
-   Prefer starting playback after the user intentionally opens a
    memory.
-   Preserve aspect ratio.
-   Work on desktop and mobile.

When the video begins:

-   Lower or pause background music.
-   Give video visual priority.

When the user exits:

-   Stop the video.
-   Restore background music.
-   Return smoothly to the timeline.

------------------------------------------------------------------------

# 20. Message Below Each Video

Every memory video should have a short personal message below it.

Example:

``` text
I don't think we realized how many memories
we were about to create together.
```

The message should be:

-   Short
-   Personal
-   Emotionally meaningful
-   Configurable
-   Different for each year

Do not generate fake personal facts.

If no message is supplied, use a tasteful generic placeholder only
during development and make it obvious that it must be replaced.

------------------------------------------------------------------------

# 21. Memory Navigation

The memory page must provide:

``` text
← Back to Our Story
```

When clicked:

1.  Video stops.
2.  Video state resets.
3.  Background music resumes.
4.  Memory page transitions out.
5.  Timeline returns.
6.  The previously selected card remains visually focused if practical.

Browser back navigation is optional but desirable.

If implemented, it should not break the music state.

------------------------------------------------------------------------

# 22. Final Chapter

After the available yearly memories, create a final dedicated section.

Do NOT make the ending another ordinary timeline card.

The transition should become slower and more cinematic.

Suggested content:

``` text
And after everything we've been through...
```

Pause.

``` text
I still wouldn't change
the way our story began.
```

Pause.

Then:

``` text
November 2022
       ↓
13 May 2023
       ↓
Today
       ↓
Whatever comes next
```

Then:

``` text
Happy Birthday, HER_NAME
```

Finally:

``` text
Our story isn't finished yet.

Chapter 1 was only the beginning.
```

------------------------------------------------------------------------

# 23. Ending Animation

Suggested ending:

1.  Fade to dark.
2.  Show first meeting date.
3.  Show official relationship date.
4.  Show "Today".
5.  Show "Whatever comes next".
6.  Fade in final birthday message.
7.  Slowly reveal a subtle heart/glow.
8.  Music reaches an appropriate emotional point.
9.  Keep the page open rather than automatically redirecting anywhere.

Do not use a forced restart.

Optional:

``` text
Replay Our Story
```

button at the very end.

------------------------------------------------------------------------

# 24. Navigation Philosophy

Do not create a conventional navbar with:

``` text
Home | About | Story | Contact
```

This is not a normal website.

Navigation should be story-driven.

Use:

-   Scroll
-   Story transitions
-   Memory cards
-   Back buttons
-   Music control
-   Optional replay button

The interface should disappear when not needed.

------------------------------------------------------------------------

# 25. Scroll Behavior

Use normal vertical scrolling between major sections.

Avoid making the entire website a forced full-page scroll-jacking
experience.

The user must be able to:

-   Scroll normally.
-   Swipe on mobile.
-   Navigate memory cards.
-   Return to previous sections.
-   Access controls easily.

Animations should enhance scrolling rather than prevent it.

------------------------------------------------------------------------

# 26. Responsive Design

The website must be fully responsive.

Test at minimum:

-   Desktop 1920×1080
-   Desktop 1440×900
-   Laptop 1366×768
-   Tablet
-   Mobile 390×844
-   Mobile 360×800

## Mobile requirements

-   No horizontal page overflow.
-   Video must fit viewport width.
-   Carousel must support swipe.
-   Buttons must have comfortable touch targets.
-   Text must remain readable.
-   Animations must remain smooth.
-   Avoid extremely large typography that causes clipping.
-   Music control must remain accessible.

------------------------------------------------------------------------

# 27. Performance

Because the site contains videos, photos, animations, and audio:

-   Lazy-load memory videos where possible.
-   Do not load all videos immediately.
-   Load cover images first.
-   Compress images where appropriate.
-   Avoid huge unoptimized assets where practical.
-   Do not create dozens of simultaneous animation loops.
-   Respect `prefers-reduced-motion`.

The opening section should load quickly.

------------------------------------------------------------------------

# 28. Accessibility

Implement basic accessibility.

Requirements:

-   Semantic HTML.
-   Proper button elements.
-   Keyboard navigation.
-   Visible focus states.
-   Alt text for meaningful images.
-   Decorative images should have empty alt attributes.
-   Video controls must be accessible.
-   Music controls must have accessible labels.
-   Do not rely only on color to communicate state.
-   Respect reduced-motion preferences.

------------------------------------------------------------------------

# 29. Reduced Motion

If:

``` css
@media (prefers-reduced-motion: reduce)
```

is active:

-   Reduce or remove large transitions.
-   Disable excessive particles.
-   Disable parallax.
-   Keep functional navigation intact.
-   Replace cinematic zooms with simple fades.

The website must remain usable.

------------------------------------------------------------------------

# 30. Error Handling

If an asset is missing:

Do not crash the entire website.

Examples:

-   Missing cover image → show tasteful placeholder.
-   Missing video → show image and message.
-   Missing audio → display music control as unavailable.
-   Missing year → do not render that year.

Development mode should log useful asset errors.

Production UI should remain elegant and not expose stack traces.

------------------------------------------------------------------------

# 31. Content Configuration Model

Use a configuration structure similar to:

``` ts
type Memory = {
  id: string;
  year: string;
  title: string;
  coverImage?: string;
  video?: string;
  message?: string;
  description?: string;
  date?: string;
};

type StoryConfig = {
  girlfriendName: string;

  music?: {
    src: string;
    title?: string;
  };

  opening: {
    date: string;
    title: string;
    description?: string;
  };

  officialRelationship: {
    date: string;
    title: string;
    description?: string;
  };

  birthday: {
    wish: string;
    specialMessage: string;
  };

  memories: Memory[];

  ending: {
    message: string;
    finalLine: string;
  };
};
```

The exact implementation may differ, but the principle must remain:

**Content and asset paths are separated from UI components.**

------------------------------------------------------------------------

# 32. Suggested Asset Directory

Create:

``` text
public/
└── assets/
    ├── music/
    │   └── background-song.mp3
    │
    ├── photos/
    │   ├── opening/
    │   │   └── ...
    │   │
    │   ├── 2023/
    │   │   ├── cover.jpg
    │   │   └── ...
    │   │
    │   ├── 2024/
    │   │   ├── cover.jpg
    │   │   └── ...
    │   │
    │   ├── 2025/
    │   │   ├── cover.jpg
    │   │   └── ...
    │   │
    │   └── 2026/
    │       ├── cover.jpg
    │       └── ...
    │
    └── videos/
        ├── 2023.mp4
        ├── 2024.mp4
        ├── 2025.mp4
        └── 2026.mp4
```

The user may change this structure, but the configuration should make
paths easy to update.

------------------------------------------------------------------------

# 33. Recommended Component Architecture

Use reusable components.

Suggested structure:

``` text
src/
├── components/
│   ├── EntryScreen
│   ├── BackgroundMusic
│   ├── StoryIntro
│   ├── BirthdayCake
│   ├── BirthdayWish
│   ├── SpecialMessage
│   ├── StoryTimeline
│   ├── MemoryCarousel
│   ├── MemoryCard
│   ├── MemoryView
│   ├── VideoPlayer
│   ├── FinalChapter
│   └── Transition
│
├── config/
│   └── story.ts
│
├── hooks/
│   ├── useAudio
│   └── ...
│
├── styles/
│   └── ...
│
└── App.tsx
```

The agent may alter this structure if the framework requires it.

------------------------------------------------------------------------

# 34. Animation Principles

Animations must feel intentional.

Use:

-   Fade
-   Scale
-   Blur
-   Opacity
-   Translate
-   Image zoom
-   Soft glow
-   Parallax
-   Staggered text reveal

Avoid:

-   Excessive bouncing
-   Excessive spinning
-   Random particle explosions
-   Rainbow gradients
-   Cheap 3D effects
-   Excessive emojis
-   Constant motion everywhere

Rule:

**The animation should support the emotion, not compete with it.**

------------------------------------------------------------------------

# 35. Typography

Use an elegant combination of:

-   One refined display/serif font for major emotional headings.
-   One clean sans-serif font for supporting text.

If external fonts are used, ensure the site still works if font loading
fails.

Typography should have:

-   Large hero headings
-   Generous line height
-   Strong contrast
-   Comfortable mobile sizing

------------------------------------------------------------------------

# 36. Color System

Use CSS variables.

Example conceptual system:

``` css
--background: #08080c;
--surface: #111117;
--text-primary: #f5f2ed;
--text-secondary: #aaa6a0;
--accent: #d8b48a;
--accent-soft: rgba(...);
--border: rgba(255,255,255,0.1);
```

The exact palette can be adjusted by the AI agent to improve visual
quality.

Avoid overly saturated colors.

------------------------------------------------------------------------

# 37. Desktop Experience

On desktop, prioritize cinematic composition.

Use:

-   Large whitespace
-   Large images
-   Wide video area
-   Centered timeline
-   Depth between cards
-   Subtle background effects

The site should feel like a premium interactive film/photo album.

------------------------------------------------------------------------

# 38. Mobile Experience

Mobile is equally important.

On mobile:

-   Reduce decorative effects.
-   Keep content focused.
-   Use one card at a time in carousel.
-   Make video nearly full-width.
-   Keep controls accessible.
-   Avoid tiny text.
-   Keep transitions short enough to avoid frustration.

------------------------------------------------------------------------

# 39. Initial Placeholder Content

If the user has not yet supplied personal content, create clearly marked
placeholders such as:

``` text
[HER_NAME]
[YOUR_BIRTHDAY_MESSAGE]
[2023_MESSAGE]
[2024_MESSAGE]
```

Do not invent real relationship events.

Do not claim fictional memories happened.

The application should still run with placeholders.

------------------------------------------------------------------------

# 40. Autonomous Agent Rules

The AI coding agent must NOT ask the user for design decisions unless
absolutely necessary.

It should make sensible decisions based on this specification.

The agent should:

1.  Inspect the existing project.
2.  Choose/retain an appropriate framework.
3.  Install required dependencies if possible.
4.  Build the page structure.
5.  Build reusable components.
6.  Implement animations.
7.  Implement audio.
8.  Implement video playback.
9.  Implement responsive layout.
10. Implement asset configuration.
11. Add graceful fallbacks.
12. Run the project.
13. Check for build errors.
14. Fix runtime errors.
15. Check responsive behavior.
16. Verify all major interactions.
17. Leave clear instructions explaining only where the user needs to
    place assets/content.

Do not stop after creating a visual mockup.

The final result must be a functional website.

------------------------------------------------------------------------

# 41. Acceptance Criteria

The project is considered complete only when all of the following work:

### Entry

-   [ ] Entry screen appears.
-   [ ] User can enter the experience.
-   [ ] Background music starts after user interaction.

### Opening

-   [ ] November 2022 introduction appears.
-   [ ] Transition into birthday section works.

### Birthday

-   [ ] Cake appears.
-   [ ] Candle flames animate.
-   [ ] Make-a-Wish interaction works.
-   [ ] Candle extinguishing animation works.
-   [ ] Birthday wish appears.

### Special Message

-   [ ] "Your Special Message" button exists.
-   [ ] Button opens the message experience.
-   [ ] Message displays beautifully.
-   [ ] User can continue to the story.

### Timeline

-   [ ] Story timeline exists.
-   [ ] November 2022 is represented.
-   [ ] 13 May 2023 is represented.
-   [ ] Year cards render from configuration.
-   [ ] Carousel works on desktop.
-   [ ] Carousel works on mobile.

### Memory

-   [ ] Cards are clickable.
-   [ ] Card opening transition works.
-   [ ] Memory page displays correct year.
-   [ ] Video plays.
-   [ ] Background music is appropriately lowered/paused.
-   [ ] Personal message appears below video.
-   [ ] Back button works.
-   [ ] Background music resumes.

### Ending

-   [ ] Final chapter exists.
-   [ ] Final message appears.
-   [ ] Website ends with a clear birthday message.
-   [ ] Optional replay action works if implemented.

### Technical

-   [ ] No console errors during normal use.
-   [ ] No broken asset crashes the application.
-   [ ] Responsive on desktop and mobile.
-   [ ] Reduced-motion behavior exists.
-   [ ] Asset paths are centralized.
-   [ ] No backend/database is required.
-   [ ] Project can be built successfully.

------------------------------------------------------------------------

# 42. Content the User Needs to Provide

The user should only need to provide/edit:

``` text
1. Girlfriend's name/nickname

2. Background song path

3. Opening photo(s), if desired

4. Birthday message

5. Special personal message

6. 2023 cover photo
7. 2023 video
8. 2023 short message

9. 2024 cover photo
10. 2024 video
11. 2024 short message

12. 2025 cover photo
13. 2025 video
14. 2025 short message

15. 2026 cover photo
16. 2026 video
17. 2026 short message

18. Final message
```

The configuration should allow additional years without changing the
component architecture.

------------------------------------------------------------------------

# 43. Important UX Rule

Do not make the website feel like a technical demo.

The visitor should never think:

> "This is a React animation."

They should feel:

> "Someone created this specifically for me."

Technical complexity should remain invisible.

------------------------------------------------------------------------

# 44. Final Product Goal

The final website should feel like an interactive cinematic birthday
letter.

The emotional progression should be:

``` text
Curiosity
   ↓
Warmth
   ↓
Surprise
   ↓
Personal connection
   ↓
Nostalgia
   ↓
Emotion
   ↓
Hope for the future
```

The most important parts are not the number of animations or technical
features.

The most important parts are:

1.  Smooth storytelling.
2.  Personal content.
3.  High-quality transitions.
4.  Strong visual hierarchy.
5.  Excellent video presentation.
6.  Music synchronization.
7.  A memorable ending.

The result should be something the recipient can experience from
beginning to end without needing instructions.

------------------------------------------------------------------------

# 45. Build Philosophy

When making implementation decisions, prioritize in this order:

``` text
1. Emotional storytelling
2. Usability
3. Visual quality
4. Smooth animation
5. Performance
6. Accessibility
7. Code simplicity
```

Do not sacrifice usability for visual effects.

Do not add features merely because they are technically impressive.

Every feature must support the story.
