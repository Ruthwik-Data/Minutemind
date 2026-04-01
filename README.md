# MinuteMind

**Capture a moment. Reflect with clarity.**

MinuteMind is a calm, premium, privacy-first voice journaling app. Write freely, speak your thoughts, or paste a transcript — then receive a structured reflection: a summary, your emotional tone, recurring themes, and one concrete next step.

**Your data never leaves your device.** MinuteMind uses IndexedDB to store all entries locally in your browser. Nothing is sent to any server.

---

## Features

| Feature | Details |
|---|---|
| **Voice input** | Tap the mic button to transcribe speech live into your entry |
| **Smart reflection** | Summary, emotion, 3 themes, and a next step |
| **Local storage** | All entries saved to IndexedDB — never uploaded |
| **Model selection** | Choose between Demo mode, Cloud AI (your API key), or Local (Ollama) |
| **Settings panel** | Bottom-sheet settings drawer with privacy explanation |
| **Export** | Download all entries as JSON |
| **History** | Real entries from IndexedDB, with skeleton loading and empty state |
| **Premium design** | CSS Modules, warm palette, layered shadows, smooth animations |

---

## Privacy

- No authentication required
- No backend database
- No analytics or telemetry
- API keys (if used) are stored in `localStorage` on your device only
- Entries are stored in IndexedDB on your device only

---

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, TypeScript
- CSS Modules — hand-crafted design system, no Tailwind
- Google Fonts — Inter (via `next/font/google`)
- Web Speech API — browser-native voice transcription
- IndexedDB — local-first entry storage

---

## Architecture

```
app/
├── components/          UI components (each with co-located .module.css)
│   ├── Header           Sticky nav with settings gear
│   ├── Hero             Landing hero with botanical doodle
│   ├── JournalForm      Textarea + voice + Reflect button + result
│   ├── ReflectionCard   Animated AI output card
│   ├── HistorySection   IndexedDB entries list + export
│   ├── SettingsPanel    Bottom-sheet settings drawer
│   └── VoiceButton      Web Speech API mic component
├── lib/
│   ├── types.ts         Shared TypeScript interfaces
│   ├── db.ts            IndexedDB helpers (save, load, export)
│   └── settings.ts      localStorage settings helpers
├── providers/
│   ├── index.ts         Routes to the active provider
│   ├── mockProvider.ts  5 realistic mock reflections
│   ├── cloudProvider.ts Placeholder for Claude / OpenAI
│   └── ollamaProvider.ts Placeholder for local Ollama
├── globals.css          Design tokens + reset
├── layout.tsx
└── page.tsx
```

---

## Local Setup

**Prerequisites:** Node.js 18+

```bash
# Clone and install
git clone https://github.com/Ruthwik-Data/Minutemind.git
cd Minutemind
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

The repo is ready for zero-config Vercel deployment.

### Via dashboard (recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Ruthwik-Data/Minutemind`
3. Leave all settings as default (Next.js auto-detected)
4. Click **Deploy** — no environment variables required for demo mode

### Via CLI

```bash
npm install -g vercel
vercel
```

---

## Adding Real AI

To connect a real AI provider, edit the corresponding file in `app/providers/`:

- **Cloud (OpenAI / Claude / etc.):** `app/providers/cloudProvider.ts` — replace the stub with a real `fetch` call using the `apiKey` argument
- **Local (Ollama):** `app/providers/ollamaProvider.ts` — replace the stub with a fetch to the Ollama REST API

All providers must return:

```ts
{
  summary: string;
  emotion: string;
  themes: string[];
  nextStep: string;
}
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## License

MIT
