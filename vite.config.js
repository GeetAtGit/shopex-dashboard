import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

  ],
  build: {
    chunkSizeWarningLimit: 5000, // or higher

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('chart.js')) return 'chartjs-vendor';
            // Add more libraries as needed
            return 'vendor';
          }
        }
      }
    }
  },
  base: '/',
});
