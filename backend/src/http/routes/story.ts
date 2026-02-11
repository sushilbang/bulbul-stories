import { register } from "../router";
import { validateStoryRequest } from "../../domain/validateStory";
import { generateNarration } from "../../infra/bulbul/adapter";
import { jsonResponse } from "../response";
import { checkAndConsumeAnonymousQuota } from "../../domain/quota";
import { anonymousCookiesHeader } from "../../auth/anonymous";
import { storeAudio } from "../../infra/audio/registry";

register("POST", "/api/story/generate", async (_req, ctx, body) => {
    const storyRequest = validateStoryRequest(body);

    if (ctx.identity.type === "anonymous") {
        await checkAndConsumeAnonymousQuota(
            ctx.identity.id!,
            storyRequest.maxDurationSeconds
        );
    }

    const result = await generateNarration(storyRequest);
    const audioId = storeAudio(result.audioBuffer);

    const response = jsonResponse(
        200,
        {
            audio_url: `/api/audio?id=${audioId}`,
            duration_seconds: result.durationSeconds,
            audio_ready: true
        },
        ctx.requestId
    );

    if (ctx.identity.type === "anonymous") {
        response.headers.set(
            "set-cookie",
            anonymousCookiesHeader(ctx.identity.id!)
        );
    }

    return response;
});
    