import type { ReflectionResult } from "../lib/types";
import { reflect as mockReflect } from "./mockProvider";

/**
 * Local Ollama provider — placeholder for local model integration.
 * Currently falls back to mock output.
 * To integrate: replace the body with a real fetch to the Ollama REST API.
 */
export async function reflect(
  text: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _endpoint: string
): Promise<ReflectionResult> {
  // TODO: replace with real Ollama call, e.g.:
  // const res = await fetch(`${endpoint}/api/generate`, {
  //   method: "POST",
  //   body: JSON.stringify({ model: "llama3", prompt: buildPrompt(text) })
  // });
  return mockReflect(text);
}
