import { register } from "../router";
import { getAudio } from "../../infra/audio/registry";
import { HttpError } from "../errors";

register("GET", "/api/audio", async (req, ctx) => {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if(!id) {
        throw new HttpError(400, "missing_audio_id");
    }

    const audio = getAudio(id);

    if(!audio) {
        throw new HttpError(404, "audio_not_found");
    }

    return new Response(audio, {
        status: 200,
        headers: {
            "content-type": "audio/mpeg",
            "cache-control": "no-store",
            "x-request-id": ctx.requestId
        }
    });
});