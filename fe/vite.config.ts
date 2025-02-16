import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8002,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:8001',
      }
    }
  }
})
