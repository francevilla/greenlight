import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Su Vercel Services il proxy /api -> backend è gestito dalla piattaforma
// (rewrite `/(.*)` -> `{ "service": "backend" }`), quindi il proxy di Vite va
// disattivato: in `vercel dev` i servizi girano insieme e Vercel instrada /api.
// Con `npm run dev` classico, invece, il proxy punta al backend locale.
const isVercel = Boolean(process.env.VERCEL)
const apiProxyTarget = process.env.BACKEND_DEV_URL || 'http://localhost:8000'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: isVercel
      ? undefined
      : {
          '/api': {
            target: apiProxyTarget,
            changeOrigin: true,
          },
        },
  },
})
