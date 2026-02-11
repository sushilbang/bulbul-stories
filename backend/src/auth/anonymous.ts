import { randomUUID } from "crypto";

const COOKIE_NAME = "anon_id";

export function getOrCreateAnonymousId(req: Request): string {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
        const match = cookieHeader.split(";").map(v => v.trim()).find(v => v.startsWith(`${COOKIE_NAME}=`));
        if(match) {
            return match.split("=")[1];
        }
    }
    return  randomUUID();
}

export function anonymousCookiesHeader(id: string) {
    return `${COOKIE_NAME}=${id}; HttpOnly; Path=/; SameSite=Lax`;
}