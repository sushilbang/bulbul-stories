export type RequestContext = {
    requestId: string;
    ip: string;
    identity: {
        type: "anonymous" | "user";
        id: string | null;
    };
};