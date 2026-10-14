export interface LeaderboardEntry {
    name: string;
    score: number;
}
export declare function validateScoreSubmission(name: string, score: number): string | undefined;
export declare function loadLeaderboard(): Promise<LeaderboardEntry[]>;
export declare function submitScore(name: string, score: number): Promise<LeaderboardEntry>;
