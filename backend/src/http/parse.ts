import { HttpError } from "./errors";

export async function parseJson(req: Request) {
    if(req.method === "GET" || req.method === "HEAD") {
        return null;
    }

    const contentType = req.headers.get("content-type");
    if(!contentType || !contentType.includes("application/json")) {
        throw new HttpError(415, "unsupported_media_type");
    }

    try {
        return await req.json();
    } catch {
        throw new HttpError(400, "invalid_json");
    }
}