import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Make environment variables available in the client-side code
    // FIX: Aligned with Gemini API guidelines by defining `process.env.API_KEY`
    // for the client, while still reading `VITE_API_KEY` from the .env file.
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})
