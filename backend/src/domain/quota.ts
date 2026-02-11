import { redis } from "../infra/redis/client";
import { HttpError } from "../http/errors";

const ANON_TOTAL_SECONDS = 250;

export async function checkAndConsumeAnonymousQuota(anonId: string, requestedSeconds: number) {
    const key = `anon:${anonId}:remaining_seconds`;
    const remaining = await redis.get(key);
    if(remaining === null) {
        if(requestedSeconds > ANON_TOTAL_SECONDS) {
            throw new HttpError(403, "quota_exceeded");
        }
        await redis.set(key, ANON_TOTAL_SECONDS - requestedSeconds);
        return;
    }

    const remainingSeconds = Number(remaining);
    if(remainingSeconds < requestedSeconds) {
        throw new HttpError(403, "quota_exceeded");
    }

    await redis.decrby(key, requestedSeconds);
}