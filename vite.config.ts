import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/testovoe-at-work/',
  plugins: [react()],
});
