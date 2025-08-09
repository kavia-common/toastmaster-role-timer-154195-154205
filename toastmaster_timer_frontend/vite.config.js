import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'vscode-internal-35749-beta.beta01.cloud.kavia.ai',
    ],
    strictPort: true
  }
})
