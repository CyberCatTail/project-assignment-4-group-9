import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
function fixAcceptHeader404() {
  return {
      name: 'fix-accept-header-404', // issue with vite dev server: https://github.com/vitejs/vite/issues/9520
      configureServer(server) {
          server.middlewares.use((req, _res, next) => {
              if (req.headers.accept == 'application/json, text/plain, */*') {
                  req.headers.accept = '*/*';
              }
              next();
          });
      },
  };
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), fixAcceptHeader404()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // proxy api for development
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  }
})
