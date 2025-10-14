import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base configurada para GitHub Pages (nome do repositório)
export default defineConfig({
  base: '/gerador_conselhos/',
  plugins: [react()],
})
