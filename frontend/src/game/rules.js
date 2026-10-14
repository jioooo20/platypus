export const GAME = {
    width: 34, height: 20, playerSpeed: 10, playerRadius: 0.66,
    playerShotCooldown: 0.19, playerShotDamage: 2, playerProjectileSpeed: 22,
    enemyProjectileSpeed: 8, playerInvulnerability: 1.35, maxHealth: 3, maxScore: 1_000_000,
    bossHealth: 220, waveBreak: 1.45, enemySpawnInterval: 0.92,
    waveSizes: [6, 9, 12], maxLeaderboardEntries: 100,
};
export function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
export function overlaps(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const radius = a.radius + b.radius;
    return dx * dx + dy * dy <= radius * radius;
}
export function boundedScore(current, awarded) {
    return clamp(Math.floor(current + awarded), 0, GAME.maxScore);
}
export function validScoreName(name) {
    return typeof name === 'string' && name.trim().length > 0 && name.length <= 20 && !/[\u0000-\u001f\u007f]/u.test(name);
}
