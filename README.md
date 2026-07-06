# Codemm

**Find your coding gaps. Follow one clear path.**

Codemm is a guided coding-practice platform for Filipino developers. Most self-learners jump between tutorials and AI answers and still feel lost. Codemm starts with a quick **diagnostic** that pinpoints your weak topics, then builds a **personalized path** of lessons and hands-on coding — with an AI mentor that explains the *why*, not just the fix.

## Unique value proposition

- **Target user:** CS/IT students and self-taught developers who practice code but don't retain it.
- **Core problem:** Scattered, unstructured practice with no clear path and no feedback on *why* an answer is wrong.
- **What's different:** A diagnostic-first flow. You always know which topics to work on next and why.
- **Outcome:** You leave with a clear skill breakdown, your focus areas, and a recommended path to close the gaps.

## Main user flow

1. **Landing** — the problem, the promise, and a sample result.
2. **Onboarding** — pick your level, focus area, goal, and pace (a few taps, no forms).
3. **Diagnostic** — five quick questions that map your skills.
4. **Results** — readiness score, per-skill breakdown, strengths, focus areas, and a recommended path.
5. **Dashboard & path** — resume lessons, run coding activities in the sandbox, and ask the AI mentor for hints.

The full demo runs end-to-end in about a minute.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (build & dev server)
- **Tailwind CSS v4** (design tokens + dark/light themes)
- **Motion** (animations) and **lucide-react** (icons)

No backend, no database, no API keys. All content is centralized demo data in [`src/data/demo-data.ts`](src/data/demo-data.ts), and the AI mentor is a local, offline responder in [`src/services/geminiService.ts`](src/services/geminiService.ts).

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build to /dist
npm run preview  # serve the production build locally
npm run lint     # TypeScript type-check (tsc --noEmit)
```

## Deploy to Vercel

The app is a static Vite build and needs **no environment variables**.

**Option A — Dashboard:**
1. Push this repo to GitHub and import it at [vercel.com/new](https://vercel.com/new).
2. Vercel auto-detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Deploy.

**Option B — CLI:**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

## Project structure

```
src/
  App.tsx                 # screen routing + app state
  data/demo-data.ts       # centralized demo data (single source of truth)
  services/geminiService.ts  # local AI-mentor responder (no network)
  components/
    LandingScreen.tsx
    OnboardingScreen.tsx
    DiagnosticScreen.tsx  # 5-question skill diagnostic
    ResultsScreen.tsx     # score, skill breakdown, recommended path
    DashboardScreen.tsx
    LessonScreen.tsx
    CodingScreen.tsx      # in-browser coding sandbox (mock runtime)
    LibraryScreen.tsx  ProgressScreen.tsx  ReviewScreen.tsx
    SyllabusScreen.tsx  SettingsScreen.tsx  SupportScreen.tsx
    AppLayout.tsx         # sidebar, top bar, AI mentor drawer
```
