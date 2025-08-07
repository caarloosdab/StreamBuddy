import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  
   server: {
    proxy: {
      '/api/taste': {
        target: 'https://tastedive.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/taste/, '/api/similar'),
      },
    },
  },

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