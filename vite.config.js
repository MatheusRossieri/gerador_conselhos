import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base configurada para GitHub Pages (nome do repositório)
export default defineConfig({
  // Use base relative to avoid absolute paths that podem causar 404 no GitHub Pages
  base: './',
  plugins: [react()],
})
