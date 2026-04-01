import type { AppSettings, ReflectionResult } from "../lib/types";
import { reflect as mockReflect } from "./mockProvider";
import { reflect as cloudReflect } from "./cloudProvider";
import { reflect as ollamaReflect } from "./ollamaProvider";

export async function runReflection(
  text: string,
  settings: AppSettings
): Promise<ReflectionResult> {
  switch (settings.modelMode) {
    case "cloud":
      return cloudReflect(text, settings.apiKey);
    case "local":
      return ollamaReflect(text, settings.localEndpoint);
    case "mock":
    default:
      return mockReflect(text);
  }
}
