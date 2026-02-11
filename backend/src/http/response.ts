export function jsonResponse(
    status: number,
    body: unknown,
    requestId: string
) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "content-type": "application/json",
            "x-request-id": requestId
        }
    });
}