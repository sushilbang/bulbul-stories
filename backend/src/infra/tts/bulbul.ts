import { SarvamAIClient } from "sarvamai";
import { env } from "../../config/env";

const client = new SarvamAIClient({
  apiSubscriptionKey: env.BULBUL_API_KEY
});

export async function generateStoryAudio(script: string): Promise<Uint8Array> {
  try {
    const response = await client.textToSpeech.convert({
      text: script,
      target_language_code: "bn-IN",
      model: "bulbul:v3"
    });

    const base64 = response.audios[0];
    const buffer = Buffer.from(base64, "base64");
    return new Uint8Array(buffer);
  } catch (error) {
    throw new Error(
      `Failed to generate story audio: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}