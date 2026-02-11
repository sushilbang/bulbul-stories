type AudioEntry = {
    buffer: Uint8Array;
    expiresAt: number;
};

const audioStore = new Map<string, AudioEntry>();

const TLS_MS = 60_000;

export function storeAudio(buffer: Uint8Array): string {
    const id = crypto.randomUUID();
    audioStore.set(id, {
        buffer, 
        expiresAt: Date.now() + TLS_MS
    });
    return id;
}

export function getAudio(id: string): Uint8Array | null {
    const entry = audioStore.get(id);
    if(!entry) {
        return null;
    }
    if(Date.now() > entry.expiresAt) {
        audioStore.delete(id);
        return null;
    }

    return entry.buffer;
}