import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const resolvePath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url))
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolvePath('./node_modules')],
        additionalData: (source: string, filename: string) => {
          const normalized = filename.replaceAll('\\', '/')

          if (normalized.includes('/shared/assets/styles/')) {
            return source
          }

          return `@use "@/shared/assets/styles/variables" as *;\n@use "@/shared/assets/styles/mixins" as *;\n${source}`
        },
      },
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
