export interface ReflectionResult {
  summary: string;
  emotion: string;
  themes: string[];
  nextStep: string;
}

export interface JournalEntry {
  id: string;
  text: string;
  createdAt: string; // ISO string
  reflection: ReflectionResult | null;
}

export type ModelMode = "mock" | "cloud" | "local";

export interface AppSettings {
  modelMode: ModelMode;
  apiKey: string;
  localEndpoint: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  modelMode: "mock",
  apiKey: "",
  localEndpoint: "http://localhost:11434",
};
