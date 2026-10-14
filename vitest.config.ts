import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['frontend/src/**/*.test.ts', 'backend/tests/**/*.test.ts'],
    testTimeout: 15000,
  },
});
