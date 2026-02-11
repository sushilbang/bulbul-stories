import { serve } from "bun";
import { RequestContext } from "./context";
import { handle } from "./router";
import { getOrCreateAnonymousId } from "../auth/anonymous";
import "./routes/story";
import "./routes/audio";

serve({
    port: 3000,
    fetch(req) {
        const requestId = crypto.randomUUID();
        const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "unknown";
        const anonId = getOrCreateAnonymousId(req);
        const ctx: RequestContext = {
            requestId,
            ip,
            identity: {
                type: "anonymous",
                id: anonId
            }
        };

        return handle(req, ctx);
    }
});