import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Enables global test functions like `describe`, `it`
    environment: 'jsdom', // Simulates a browser-like environment
    setupFiles: 'tests/setup.ts', // Setup file (optional)
  },
});
