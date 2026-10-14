const apiBase = import.meta.env.VITE_API_URL?.replace(/\/$/u, '') ?? '';
async function request(path, init) {
    const response = await fetch(`${apiBase}${path}`, {
        ...init,
        headers: { 'content-type': 'application/json', ...init?.headers },
        signal: AbortSignal.timeout(4500),
    });
    if (!response.ok) {
        const message = await response.json().catch(() => ({ error: 'Transmisi tidak berhasil.' }));
        throw new Error(message.error ?? `Kesalahan jaringan (${response.status}).`);
    }
    return await response.json();
}
export function validateScoreSubmission(name, score) {
    if (!name.trim() || name.length > 20 || /[\u0000-\u001f\u007f]/u.test(name))
        return 'Nama pilot wajib diisi (maksimum 20 karakter).';
    if (!Number.isSafeInteger(score) || score < 0 || score > 1_000_000)
        return 'Skor tidak valid.';
    return undefined;
}
export async function loadLeaderboard() {
    const payload = await request('/api/leaderboard');
    return payload.entries;
}
export async function submitScore(name, score) {
    const error = validateScoreSubmission(name, score);
    if (error)
        throw new Error(error);
    const payload = await request('/api/leaderboard', {
        method: 'POST', body: JSON.stringify({ name: name.trim(), score }),
    });
    return payload.entry;
}
