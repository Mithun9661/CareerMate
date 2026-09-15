import { z } from 'zod';

const text = z.string().max(20000);
const list = z.array(z.string().max(2000)).max(30);
const metric = z.object({ score: z.number().min(0).max(100), feedback: text });
export const outputs = {
  grammar: z.object({ corrected: text, changes: z.array(z.object({ original: z.string().max(800), replacement: z.string().max(800), explanation: text })).max(80), explanation: text, clarification: z.string().max(1000).default('') }),
  ocr: z.object({ text, notes: text }),
  resume: z.object({ isResume: z.boolean(), extractedText: text, skills: list, education: list, projects: list, improvements: list, missingSkills: list, evidence: z.object({ contact: text, education: text, skills: text, experienceOrProjects: text, measurableResults: text }) }),
  courses: z.object({ courses: z.array(z.object({ name: text, level: z.enum(['Beginner','Intermediate','Advanced']), duration: text, reason: text })).length(3) }),
  topic: z.object({ topic: z.string().min(5).max(500) }),
  gd: z.object({ grammar: metric, clarity: metric, content: metric, confidenceFeedback: text, improvements: list }),
};
export type Action = keyof typeof outputs;
export type GrammarResult = z.infer<typeof outputs.grammar>;
export type ResumeResult = z.infer<typeof outputs.resume> & { score: number; rubric: { criterion: string; points: number; maximum: number; evidence: string }[] };
export type AIResult = Record<string, unknown>;
