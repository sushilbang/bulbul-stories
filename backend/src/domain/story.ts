export type StoryNarrationRequest = {
    genre: string;
    tone: string;
    language: string;
    maxDurationSeconds: number;
};

export type StoryNarrationResult = {
    audioBuffer: Uint8Array;
    durationSeconds: number;
    transcript?: string;
};