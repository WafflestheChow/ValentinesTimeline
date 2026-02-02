import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Framer Motion provides polished animations with minimal API surface.
export default defineConfig({
  plugins: [react()]
});
