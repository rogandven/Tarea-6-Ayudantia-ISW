import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.VITE_PORT || 443;
// const BASE = process.env.VITE_BASE_URL || "http://localhost:80";
// console.log(PORT);

export default defineConfig({
  base: "/",
  server: {
    host: '0.0.0.0',
    port: PORT,
    strictPort: true,
    cors: true
  },
  preview: {
    host: '0.0.0.0',
    port: PORT,
    strictPort: true,
    cors: true
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@helpers': path.resolve(__dirname, './src/helpers')
    }
  }
});
