import { defineConfig } from 'vite';

const apiTarget = process.env.API_PROXY_TARGET ?? `http://127.0.0.1:${process.env.API_PORT ?? '3001'}`;

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: { '/api': { target: apiTarget, changeOrigin: true } },
  },
  preview: { proxy: { '/api': { target: apiTarget, changeOrigin: true } } },
  build: { target: 'es2022' },
});

// Relative frontend API requests work through both Vite dev and preview servers.
// Set API_PROXY_TARGET to override the backend address (default: 127.0.0.1:3001).
