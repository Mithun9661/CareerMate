# CareerMate AI

Responsive student career-assistant prototype built with React, TypeScript, Tailwind CSS and Vinext.

## Current status

This is a UI prototype, not a fully integrated AI application.

- Grammar checker applies a small set of hard-coded rules, not general AI grammar checking.
- Resume upload selects a file but does not extract PDF/DOCX contents; the ATS score (82) and profile are static samples.
- Course cards are samples and are not personalized from the resume or career goal.
- GD topics rotate through a small list; scores and feedback are static examples, not evaluations.
- Image selection does not perform OCR.
- Activity history is in memory for the current page session.
- WhatsApp, Telegram and Discord are future integrations.

## Local setup

Use Node.js 22.13 or later and the pnpm version specified in package.json.

```sh
pnpm install
pnpm dev
```

Production build:

```sh
pnpm build
```

The bundled build targets Cloudflare Workers through Vinext. The hosting manifest is sanitized for this source export; it is not linked to the original private Site.

## Next implementation work

Connect a server-side AI provider with protected API credentials, implement document extraction and OCR, validate upload limits, derive explainable resume-readiness scores, personalize courses, and evaluate GD text without claiming to measure spoken confidence.

Never commit API keys, uploaded resumes, or environment secrets.
