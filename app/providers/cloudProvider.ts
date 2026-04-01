import type { ReflectionResult } from "../lib/types";
import { reflect as mockReflect } from "./mockProvider";

/**
 * Cloud AI provider — placeholder for real API integration.
 * Currently falls back to mock output.
 * To integrate: replace the body of this function with a real API call
 * using the provided apiKey. The response must be shaped as ReflectionResult.
 */
export async function reflect(
  text: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _apiKey: string
): Promise<ReflectionResult> {
  // TODO: replace with real API call, e.g.:
  // const res = await fetch("https://api.anthropic.com/v1/messages", {
  //   method: "POST",
  //   headers: { "x-api-key": apiKey, "content-type": "application/json" },
  //   body: JSON.stringify({ ... })
  // });
  return mockReflect(text);
}
