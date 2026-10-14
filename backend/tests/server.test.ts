import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildServer } from '../src/server.js';

let server: FastifyInstance;
beforeAll(async () => { server = buildServer(); await server.ready(); });
afterAll(async () => { await server.close(); });

describe('API papan peringkat melalui HTTP injeksi Fastify', () => {
  it('dimulai dengan papan kosong', async () => {
    const response = await server.inject({ method: 'GET', url: '/api/leaderboard' });
    expect(response.statusCode).toBe(200); expect(response.json()).toEqual({ entries: [] });
  });
  it('menerima hanya nama/skor, mengurutkan skor dan mempertahankan entri selama proses', async () => {
    for (const entry of [{ name: 'Mira', score: 250 }, { name: 'Nara', score: 910 }, { name: 'Mira', score: 910 }]) {
      const posted = await server.inject({ method: 'POST', url: '/api/leaderboard', payload: entry });
      expect(posted.statusCode).toBe(201); expect(Object.keys(posted.json().entry).sort()).toEqual(['name', 'score']);
    }
    const loaded = await server.inject({ method: 'GET', url: '/api/leaderboard' });
    expect(loaded.json().entries).toEqual([{ name: 'Nara', score: 910 }, { name: 'Mira', score: 910 }, { name: 'Mira', score: 250 }]);
  });
  it('menolak payload salah, nama tak valid, skor bukan integer, negatif atau berlebih', async () => {
    const bad = [
      { name: ' ', score: 0 }, { name: '012345678901234567890', score: 1 }, { name: 'Bad\nName', score: 1 },
      { name: 'Pilot', score: -1 }, { name: 'Pilot', score: 1.25 }, { name: 'Pilot', score: 1000001 },
      { name: 'Pilot', score: 5, email: 'extra' },
    ];
    for (const payload of bad) expect((await server.inject({ method: 'POST', url: '/api/leaderboard', payload })).statusCode).toBe(400);
  });
  it('menyajikan paling banyak 100 skor', async () => {
    const isolated = buildServer(); await isolated.ready();
    try {
      for (let i = 0; i < 105; i++) await isolated.inject({ method: 'POST', url: '/api/leaderboard', payload: { name: `Pilot ${i}`, score: i } });
      const result = await isolated.inject({ method: 'GET', url: '/api/leaderboard' });
      expect(result.json().entries).toHaveLength(100); expect(result.json().entries[0].score).toBe(104); expect(result.json().entries.at(-1).score).toBe(5);
    } finally { await isolated.close(); }
  });
  it('mengosongkan leaderboard setelah instance backend baru dibuat', async () => {
    const first = buildServer(); await first.ready();
    await first.inject({ method: 'POST', url: '/api/leaderboard', payload: { name: 'Sesi lama', score: 7 } });
    await first.close();
    const restarted = buildServer(); await restarted.ready();
    try {
      expect((await restarted.inject({ method: 'GET', url: '/api/leaderboard' })).json()).toEqual({ entries: [] });
    } finally { await restarted.close(); }
  });

  it('merespons pemeriksaan kesehatan', async () => {
    const result = await server.inject({ method: 'GET', url: '/api/health' }); expect(result.statusCode).toBe(200); expect(result.json()).toEqual({ status: 'ok' });
  });
});
