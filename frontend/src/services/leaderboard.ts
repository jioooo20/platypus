export interface LeaderboardEntry { name: string; score: number; }

const apiBase = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/u, '') ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: { 'content-type': 'application/json', ...init?.headers },
    signal: AbortSignal.timeout(4500),
  });
  if (!response.ok) {
    const message = await response.json().catch(() => ({ error: 'Transmisi tidak berhasil.' })) as { error?: string };
    throw new Error(message.error ?? `Kesalahan jaringan (${response.status}).`);
  }
  return await response.json() as T;
}

export function validateScoreSubmission(name: string, score: number): string | undefined {
  if (!name.trim() || name.length > 20 || /[\u0000-\u001f\u007f]/u.test(name)) return 'Nama pilot wajib diisi (maksimum 20 karakter).';
  if (!Number.isSafeInteger(score) || score < 0 || score > 1_000_000) return 'Skor tidak valid.';
  return undefined;
}

export async function loadLeaderboard(): Promise<LeaderboardEntry[]> {
  const payload = await request<{ entries: LeaderboardEntry[] }>('/api/leaderboard');
  return payload.entries;
}

export async function submitScore(name: string, score: number): Promise<LeaderboardEntry> {
  const error = validateScoreSubmission(name, score);
  if (error) throw new Error(error);
  const payload = await request<{ entry: LeaderboardEntry }>('/api/leaderboard', {
    method: 'POST', body: JSON.stringify({ name: name.trim(), score }),
  });
  return payload.entry;
}
