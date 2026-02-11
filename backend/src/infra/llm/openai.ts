import { env } from "../../config/env";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});

export async function generateStory(prompt: string): Promise<string> {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a professional story writer. Generate engaging, vivid narration text only."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.9,
        max_tokens: 1200
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
        throw new Error("invalid_llm_response");
    }

    return content.trim();
}
