import { HttpError } from "./errors";
import { jsonResponse } from "./response";
import { parseJson } from "./parse";
import type { RequestContext } from "./context";

type Handler = (
    req: Request,
    ctx: RequestContext,
    body: any,
) => Promise<Response>;

const routes = new Map<string, Handler>();

export function register(
    method: string,
    path: string,
    handler: Handler
) {
    routes.set(`${method}:${path}`, handler);
}

export async function route(req: Request, ctx: RequestContext) {
    const key = `${req.method}:${new URL(req.url).pathname}`;
    const handler = routes.get(key);

    if(!handler) {
        throw new HttpError(404, "not_found");
    }

    const body = await parseJson(req);
    return handler(req, ctx, body);
}

export async function handle(req: Request, ctx: RequestContext) {
    try {
        return await route(req, ctx);
    } catch (err: unknown) {
        if(err instanceof HttpError) {
            return jsonResponse(
                err.status,
                { error: err.code },
                ctx.requestId
            );
        }

        return jsonResponse(
            500,
            { error: "internal_error" },
            ctx.requestId
        );
    }
}