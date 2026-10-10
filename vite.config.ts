import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const resolvePath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url))
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },

  build: {
    rolldownOptions: {
      output: {
        minify: {
          compress: {
            dropConsole: true,
            dropDebugger: true,
          },
        },
      },
    },
  },
})
  

