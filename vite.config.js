import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: { port: Number(process.env.PORT) || 5180, strictPort: false },
  plugins: [react()],
  build: {
    // es2020 = every phone and browser from the last ~5 years; smaller output than es2015
    target: 'es2020',
    rollupOptions: {
      output: {
        // Use function form for manualChunks (required by Rolldown in Vite 8+)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router-dom') || id.match(/\/react\//)) {
              return 'vendor'
            }
          }
        }
      }
    }
  },
  ssgOptions: {
    script: 'defer',
    formatting: 'none',
    dirStyle: 'nested',
  },
})
