export const GAME = {
  width: 34, height: 20, playerSpeed: 10, playerRadius: 0.66,
  playerShotCooldown: 0.19, playerShotDamage: 2, playerProjectileSpeed: 22,
  enemyProjectileSpeed: 8, playerInvulnerability: 1.35, maxHealth: 3, maxScore: 1_000_000,
  bossHealth: 220, waveBreak: 1.45, enemySpawnInterval: 0.92,
  waveSizes: [6, 9, 12] as readonly number[], maxLeaderboardEntries: 100,
} as const;

export type GameState = 'menu' | 'playing' | 'paused' | 'won' | 'lost';
export type EnemyKind = 'scout' | 'gunship' | 'bomber' | 'boss';
export interface Point { x: number; y: number; }
export interface Body extends Point { radius: number; }
export interface Enemy extends Body {
  id: number; kind: EnemyKind; health: number; maxHealth: number; age: number;
  speed: number; phase: number; shootAt: number;
}
export interface Projectile extends Point { id: number; radius: number; velocityX: number; velocityY: number; damage: number; friendly: boolean; }
export interface GameSnapshot {
  state: GameState; score: number; health: number; wave: number; waveCount: number;
  bossHealth: number; bossMaxHealth: number; player: Point;
  enemies: readonly Enemy[]; projectiles: readonly Projectile[];
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function overlaps(a: Body, b: Body): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const radius = a.radius + b.radius;
  return dx * dx + dy * dy <= radius * radius;
}

export function boundedScore(current: number, awarded: number): number {
  return clamp(Math.floor(current + awarded), 0, GAME.maxScore);
}

export function validScoreName(name: unknown): name is string {
  return typeof name === 'string' && name.trim().length > 0 && name.length <= 20 && !/[\u0000-\u001f\u007f]/u.test(name);
}
