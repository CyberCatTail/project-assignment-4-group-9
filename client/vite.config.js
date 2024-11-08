import path from "path"
import fs from "fs"
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
    https: {
      key: fs.readFileSync(__dirname + '/.certs/localhost.key'),
      cert: fs.readFileSync(__dirname + '/.certs/localhost.crt'),
    },
    proxy: {
      // proxy api for development
      '/api/v1': {
        target: 'https://localhost:3000',
        secure: false,
      },
    },
  },
  build: {
    outDir: '../server/dist',
    emptyOutDir: true,
  }
})
