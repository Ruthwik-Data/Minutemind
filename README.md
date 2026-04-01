# MinuteMind

**Capture a moment. Reflect with clarity.**

MinuteMind is a calm, mobile-first voice journal app that lets you write freely, paste a voice transcript, and instantly receive a structured reflection — summary, emotion, themes, and one next step.

This is a polished frontend MVP with mocked reflection output. No backend, no database, no authentication.

---

## Features

- **Journal entry form** — write freely or paste a voice transcript
- **Instant reflection** — mocked AI output with summary, emotion, themes, and a next step
- **Entry history** — three sample past entries shown as premium cards
- **Mobile-first design** — optimized for phone screens, looks great on desktop too
- **Premium aesthetic** — warm off-white palette, elegant typography, refined shadows and spacing

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- TypeScript
- CSS Modules (no Tailwind, no component library)
- Google Fonts — Inter

---

## Local Setup

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/minutemind.git
cd minutemind/minutemind

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
minutemind/
├── app/
│   ├── components/
│   │   ├── Header.tsx              # Sticky nav with logo
│   │   ├── Header.module.css
│   │   ├── Hero.tsx                # Landing hero section
│   │   ├── Hero.module.css
│   │   ├── JournalForm.tsx         # Textarea + Reflect button + result
│   │   ├── JournalForm.module.css
│   │   ├── ReflectionCard.tsx      # Mocked AI reflection output card
│   │   ├── ReflectionCard.module.css
│   │   ├── HistorySection.tsx      # Past entries list
│   │   └── HistorySection.module.css
│   ├── globals.css                 # Design tokens + reset + base styles
│   ├── layout.tsx                  # Root layout with font loading
│   ├── page.tsx                    # Main page
│   └── page.module.css
├── public/
├── package.json
└── README.md
```

---

## Deploy to Vercel

The easiest way to deploy MinuteMind is with [Vercel](https://vercel.com).

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual deploy

```bash
# Install the Vercel CLI
npm install -g vercel

# From inside the minutemind directory
vercel

# Follow the prompts — no environment variables required
```

Or connect your GitHub repository in the [Vercel dashboard](https://vercel.com/dashboard):

1. Import the repository
2. Set the **Root Directory** to `minutemind` (if deploying from the monorepo root)
3. Leave all other settings as default — Next.js is auto-detected
4. Click **Deploy**

---

## Scripts

| Command         | Description                     |
|-----------------|---------------------------------|
| `npm run dev`   | Start local development server  |
| `npm run build` | Build for production            |
| `npm run start` | Start production server locally |
| `npm run lint`  | Run ESLint                      |

---

## Design Decisions

- **No Tailwind** — all styles are written in CSS Modules with a centralized design token system in `globals.css`
- **No component library** — every UI element is hand-crafted for full control over aesthetics
- **Mocked AI** — reflection output cycles through three realistic responses, no API key required
- **No auth or database** — this is a pure frontend MVP, ready to layer backend features onto

---

## License

MIT
