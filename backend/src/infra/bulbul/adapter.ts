import type {
  StoryNarrationRequest,
  StoryNarrationResult
} from "../../domain/story";

import { generateStory } from "../llm/openai";
import { generateStoryAudio } from "../tts/bulbul";

export async function generateNarration(
  request: StoryNarrationRequest
): Promise<StoryNarrationResult> {
  try {
    const prompt = buildNarrationPrompt(request);
    const script = await generateStory(prompt);
    const audioBuffer = await generateStoryAudio(script);

    return {
      audioBuffer,
      durationSeconds: request.maxDurationSeconds
    };
  } catch (error) {
    throw new Error(
      `Failed to generate narration: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

function buildNarrationPrompt(request: StoryNarrationRequest): string {
  return `
Create a ${request.tone} ${request.genre} story in ${request.language}.
It should be suitable for narration lasting approximately ${request.maxDurationSeconds} seconds.
Keep it vivid, engaging, and natural for spoken delivery.
Do not include titles, explanations, or formatting.
Return only the narration text.
`.trim();
}