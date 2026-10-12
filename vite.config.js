import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  server: { port: Number(process.env.PORT) || 5180, strictPort: false },
  plugins: [react(), compression({ algorithm: 'gzip' })],
  // Split vendor code for better caching and faster initial load
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    // Enable brotli size reporting for monitoring compression effectiveness
    brotliSize: true,
    // Target modern browsers – reduces polyfills and bundle size
    target: 'es2015'
  },
  ssgOptions: {
    script: 'defer',
    formatting: 'none',
    dirStyle: 'nested',
  },
})
