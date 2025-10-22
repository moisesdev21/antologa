import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // ← AÑADE ESTO
    }
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'antologa.local',
      'admins.antologa.local', 
      'business.antologa.local',
      'localhost',
      'ureterointestinal-orville-louvred.ngrok-free.dev'
    ],
  },
  assetsInclude: ['**/*.svg']
})