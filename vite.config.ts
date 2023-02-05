import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import renderer from 'vite-plugin-electron-renderer';
import electronConfig from './electron.config';

const pkg = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      assets: path.join(__dirname, 'src/assets'),
    },
  },
  plugins: [
    react(),
    electronConfig,
    renderer({
      nodeIntegration: true,
      optimizeDeps: {
        include: ['electron-store'],
      },
    }),
  ],
  build: {
    minify: false,
    rollupOptions: {
      external: Object.keys(pkg?.dependencies ?? {}),
    },
  },
  server: process.env.VSCODE_DEBUG
    ? {
        host: process.env.VITE_DEV_SERVER_HOSTNAME ?? '127.0.0.1',
        port: parseInt(process.env.VITE_DEV_SERVER_PORT ?? '7777', 10),
      }
    : undefined,
});
