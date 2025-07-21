import { fileURLToPath } from 'url';
import path from 'path';

// Convert the current module URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = path.dirname(__filename);

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './core'),
      '@src': path.resolve(__dirname, './src')
    }
  }
});
