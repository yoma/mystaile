import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev serves at `/`; production/GitHub Pages build keeps `/mystaile/`.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/mystaile/' : '/',
}))
