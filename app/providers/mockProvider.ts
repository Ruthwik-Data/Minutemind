import type { ReflectionResult } from "../lib/types";

const REFLECTIONS: ReflectionResult[] = [
  {
    summary:
      "You're navigating a meaningful transition — your words carry both the weight of what you're releasing and a quiet anticipation of what's ahead. This tension is productive; it means you're taking the change seriously.",
    emotion: "Hopeful",
    themes: ["Change & transition", "Self-trust", "Uncertainty"],
    nextStep:
      "Write down one small, concrete action you can take this week toward the thing that excites you most.",
  },
  {
    summary:
      "There's a recurring thread of feeling stretched across too many commitments. You're already aware of the pattern, which is more than most people reach. The clarity you're searching for may come from identifying what you'd protect first if you had to choose.",
    emotion: "Overwhelmed",
    themes: ["Boundaries", "Priorities", "Energy management"],
    nextStep:
      "List your top three commitments and honestly note which one energizes you and which one quietly drains you.",
  },
  {
    summary:
      "Today's reflection carries gratitude woven underneath some surface frustration. You seem to hold more perspective than you're giving yourself credit for. The frustration itself may be pointing toward something worth addressing directly.",
    emotion: "Reflective",
    themes: ["Gratitude", "Self-awareness", "Growth"],
    nextStep:
      "Reach out to one person you felt grateful for while writing — even a short message can shift your whole energy.",
  },
  {
    summary:
      "A steady sense of presence runs through this entry. You're not rushing toward answers; you're sitting with the questions, which takes a kind of courage people often underestimate.",
    emotion: "Grounded",
    themes: ["Presence", "Patience", "Inner calm"],
    nextStep:
      "Spend five unscheduled minutes outside today — no phone, no destination. Just notice what you observe.",
  },
  {
    summary:
      "Something here feels like a turning point. The words you've chosen suggest you already know what the right move is; you may just need permission to trust that knowing.",
    emotion: "Resolute",
    themes: ["Clarity", "Decision-making", "Self-trust"],
    nextStep:
      "Write the decision you've been postponing at the top of a blank page, then ask: what am I actually afraid of?",
  },
];

export async function reflect(
  // text will be used when real AI is integrated
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _text: string
): Promise<ReflectionResult> {
  // Simulate a brief processing delay
  await new Promise((r) => setTimeout(r, 1600 + Math.random() * 600));
  return REFLECTIONS[Math.floor(Math.random() * REFLECTIONS.length)];
}
