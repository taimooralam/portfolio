import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  server: {
    port: 3000,
    host: true, // This allows external connections (important for Docker)
    open: false // Don't auto-open browser
  },
  build: {
    outDir: '../dist',
    sourcemap: true,
    emptyOutDir: true
  },
  preview: {
    port: 3000,
    host: true
  }
})