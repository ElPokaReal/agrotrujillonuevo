import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_PRODUCTORES_URL': JSON.stringify(env.REACT_APP_PRODUCTORES_URL),
      'process.env.REACT_APP_CREDITOS_URL': JSON.stringify(env.REACT_APP_CREDITOS_URL),
      'process.env.REACT_APP_TECNICOS_URL': JSON.stringify(env.REACT_APP_TECNICOS_URL),
      'process.env.REACT_APP_CONFIG_URL': JSON.stringify(env.REACT_APP_CONFIG_URL)
    },
    plugins: [react()],
  }
})