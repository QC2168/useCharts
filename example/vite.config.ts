import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [vue(),
  viteMockServe({
    // default
    mockPath: './mock',
    supportTs: true,
    watchFiles: true, // 监视文件更改
  }),
  ]
})
