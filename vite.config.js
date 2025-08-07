import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        watchlist: resolve(__dirname, 'watchlist.html'),
        details: resolve(__dirname, 'details.html'),
        spinner: resolve(__dirname, 'spinner.html')
      }
    }
  }
})