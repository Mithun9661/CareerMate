# CareerMate AI

Student career assistant with a Gemini-backed API, React dashboard, and Cloudflare Workers-compatible Vinext build.

## Connect Gemini

Open the app, paste your Gemini API key in the **Connect Gemini** password field, then click **Connect Gemini**. The key is held only in current page memory, sent to the same-origin backend using a request header, and forwarded to Google. It is not saved to browser storage, files, logs, or GitHub by the application. Refresh clears it.

Connection checks Google model access; it does not guarantee available generation quota. Google API usage may incur charges depending on your project.

An operator can alternatively configure `GEMINI_API_KEY` as a hosting runtime secret and optionally `GEMINI_MODEL`. The default discovers an available compatible Flash model. Never use a NEXT_PUBLIC key. The hosted Site is owner-private; preserve access controls when using a shared server key. Add authentication and rate limits before exposing a server-owned key on another public host.

## Features

- Grammar: Gemini correction with original-text highlights and explanations. Ambiguous wording such as “wont” asks for clarification first. A guard rejects changes to numbers and negation; AI is instructed to preserve names, tense and meaning. These checks reduce errors but cannot guarantee semantic equivalence.
- Resume: PDF sent inline to Gemini for document reading, including scanned PDFs; DOCX text extracted server-side. PDF/DOCX limit: 5 MB; extracted DOCX text limit: 20,000 characters. Legacy .doc is not supported.
- Resume score: transparent completeness rubric (contact 10, education 20, skills 20, experience/projects 30, measurable results 20). Points require supporting quotes in the AI-extracted text. This is not a commercial ATS score, job-match guarantee, or hiring prediction. Review extraction for AI errors.
- Courses: three personalized learning topics using your career goal, entered skills and the analyzed resume in the current session. Study durations are estimates; these are not verified provider listings.
- GD: generated topics and text-based grammar, clarity and content evaluation. Confidence feedback addresses wording; spoken confidence is not measurable from text.
- OCR: PNG/JPEG/WebP image transcription through Gemini vision, up to 5 MB.
- History and analysis remain in current-page memory. Files are processed transiently and not retained by this app. Google processes submitted content under its API terms.
- WhatsApp, Telegram and Discord remain future integrations.

All panels use `POST /api/assist`; there are no fixed scores or fabricated success fallbacks. Input/upload validation, timeout, schema validation, quota and authentication failures return clear errors.

## Local setup

Use Node.js >=22.13 and pnpm from `packageManager`.

```sh
pnpm install
pnpm dev
```

For a local server-owned key, put `GEMINI_API_KEY` in an ignored `.dev.vars` file for Wrangler; using the session-only connection form needs no local secret file.

```sh
pnpm build
node scripts/test-ai.mjs
```

Build output targets Cloudflare Workers through Vinext. GitHub's hosting manifest is sanitized so this export does not claim the original Site identity.

## API

Submit multipart form data containing `action` and optional fields:

| Action | Fields |
| --- | --- |
| connect | none |
| grammar | text |
| resume | file, goal (optional) |
| courses | goal, profile |
| topic | topic (previous topic, optional) |
| gd | topic, text |
| ocr | file |

Use `x-careermate-key` for a session key or configure the server runtime secret. Responses use `Cache-Control: no-store`. Files and text are untrusted data, never instructions to the application.

## Verification

TypeScript and production build checked. Backend tests use mocked Google responses to cover validation, file parsing, DOCX expansion limits, missing credentials, error redaction, JSON format, and evidence scoring. A real successful Gemini generation requires the user's key and quota and was not verified during implementation.

API references: https://ai.google.dev/api/generate-content and https://ai.google.dev/gemini-api/docs/document-processing
