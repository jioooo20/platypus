import Fastify from 'fastify';
import cors from '@fastify/cors';
const MAX_SCORE = 1_000_000;
const MAX_ENTRIES = 100;

interface Entry { name: string; score: number; }
export function buildServer() {
  const entries: Entry[] = [];
  const app = Fastify({ logger: false, bodyLimit: 4096 });
  const origins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173').split(',').map((origin) => origin.trim());
  void app.register(cors, { origin: origins, methods: ['GET', 'POST'] });
  app.get('/api/health', async () => ({ status: 'ok' }));
  app.get('/api/leaderboard', async () => ({ entries: [...entries].sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES) }));
  app.post<{ Body: unknown }>('/api/leaderboard', async (request, reply) => {
    const body: unknown = request.body;
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return reply.code(400).send({ error: 'Format permintaan tidak valid.' });
    }
    const record = body as Record<string, unknown>;
    if (Object.keys(record).length !== 2 || !Object.hasOwn(record, 'name') || !Object.hasOwn(record, 'score')) {
      return reply.code(400).send({ error: 'Permintaan harus berisi nama dan skor saja.' });
    }
    const { name, score } = record;
    if (typeof name !== 'string' || name.trim().length === 0) return reply.code(400).send({ error: 'Nama pilot tidak boleh kosong.' });
    if (name.length > 20) return reply.code(400).send({ error: 'Nama pilot maksimal 20 karakter.' });
    if (/[\u0000-\u001f\u007f]/u.test(name)) return reply.code(400).send({ error: 'Nama pilot mengandung karakter yang tidak diizinkan.' });
    if (typeof score !== 'number' || !Number.isSafeInteger(score) || score < 0 || score > MAX_SCORE) {
      return reply.code(400).send({ error: `Skor harus bilangan bulat antara 0 dan ${MAX_SCORE}.` });
    }
    const entry: Entry = { name: name.trim(), score };
    entries.push(entry);
    return reply.code(201).send({ entry });
  });
  return app;
}
