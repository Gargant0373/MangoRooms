import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { prerender } from './scripts/vite-plugin-prerender.mjs'

// The site is served from the domain root, so assets must use absolute paths.
// A relative base ('./') would break the 404 page, which is served at any depth.
export default defineConfig({
  base: '/',
  plugins: [react(), prerender()],
})
