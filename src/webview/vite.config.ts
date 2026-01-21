import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "../../webview-dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // format: 'iife',
        entryFileNames: 'index.js',
        assetFileNames: 'assetrs.[ext]'
      }
    }
  }
})
