import { HttpError } from "../http/errors";
import type { StoryNarrationRequest } from "./story";

const MAX_DURATION = 60;

export function validateStoryRequest(input: any): StoryNarrationRequest {
    if(!input || typeof input.genre !== "string" || typeof input.tone !== "string" || typeof input.language !== "string" || typeof input.maxDurationSeconds !== "number") {
        throw new HttpError(400, "invalid_story_request");
    }

    if(input.maxDurationSeconds <= 0 || input.maxDurationSeconds > MAX_DURATION) {
        throw new HttpError(400, "invalid_duration");
    }

    return {
        genre: input.genre,
        tone: input.tone,
        language: input.language,
        maxDurationSeconds: input.maxDurationSeconds
    };
}