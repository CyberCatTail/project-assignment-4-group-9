import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // proxy api for development
      '/api/v1': {
        target: 'http://localhost:8080',
      },
    },
  },
  build: {
    outDir: '../server/dist',
    emptyOutDir: true,
  }
})
