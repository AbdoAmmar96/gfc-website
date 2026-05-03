import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// For GitHub Pages: site is served at https://username.github.io/repo-name/
// so we need a base prefix matching the repo name. Set VITE_BASE_PATH at build time.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    port: 5173,
    proxy: {
      '/api':     { target: 'http://localhost:8000', changeOrigin: true },
      '/storage': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
});
