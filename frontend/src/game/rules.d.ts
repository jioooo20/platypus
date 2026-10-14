export declare const GAME: {
    readonly width: 34;
    readonly height: 20;
    readonly playerSpeed: 10;
    readonly playerRadius: 0.66;
    readonly playerShotCooldown: 0.19;
    readonly playerShotDamage: 2;
    readonly playerProjectileSpeed: 22;
    readonly enemyProjectileSpeed: 8;
    readonly playerInvulnerability: 1.35;
    readonly maxHealth: 3;
    readonly maxScore: 1000000;
    readonly bossHealth: 220;
    readonly waveBreak: 1.45;
    readonly enemySpawnInterval: 0.92;
    readonly waveSizes: readonly number[];
    readonly maxLeaderboardEntries: 100;
};
export type GameState = 'menu' | 'playing' | 'paused' | 'won' | 'lost';
export type EnemyKind = 'scout' | 'gunship' | 'bomber' | 'boss';
export interface Point {
    x: number;
    y: number;
}
export interface Body extends Point {
    radius: number;
}
export interface Enemy extends Body {
    id: number;
    kind: EnemyKind;
    health: number;
    maxHealth: number;
    age: number;
    speed: number;
    phase: number;
    shootAt: number;
}
export interface Projectile extends Point {
    id: number;
    radius: number;
    velocityX: number;
    velocityY: number;
    damage: number;
    friendly: boolean;
}
export interface GameSnapshot {
    state: GameState;
    score: number;
    health: number;
    wave: number;
    waveCount: number;
    bossHealth: number;
    bossMaxHealth: number;
    player: Point;
    enemies: readonly Enemy[];
    projectiles: readonly Projectile[];
}
export declare function clamp(value: number, min: number, max: number): number;
export declare function overlaps(a: Body, b: Body): boolean;
export declare function boundedScore(current: number, awarded: number): number;
export declare function validScoreName(name: unknown): name is string;
