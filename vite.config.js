import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [vue()],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
        { find: '~bootstrap', replacement: path.resolve(__dirname, './node_modules/bootstrap') },
      ]
    },
    base: env.VITE_PRIVATE_BASE_URL,
    server: {
      proxy: {
        '/api': {
          target: env.VITE_PRIVATE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/imauthapi': {
          target: env.VITE_PRIVATE_IMAUTH_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/imauthapi/, '')
        },
      },
    },
    build:{
      sourcemap: false,
      cssCodeSplit:true,
      chunkSizeWarningLimit:500,
      rollupOptions:{
        output:{
          manualChunks(id){
            if(id.includes('node_modules')){
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/'): []
            const fileName =facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name].[hash].js`
          }
        }
      },
      terserOptions:{
        compress: {
          // กำหนดการบีบอัดไฟล์
          drop_console: true,
          drop_debugger: true,
          ecma: 2015,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_undefined: true,
        },
      }
    }
  }
})

