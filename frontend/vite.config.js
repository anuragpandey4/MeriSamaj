import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Vercel deployments set the VERCEL env variable to '1'
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
  const base = isVercel ? '/' : (mode === 'production' ? '/MeriSamaj/' : '/');
  
  return {
    base,
    plugins: [react(), tailwindcss()],
  }
})
