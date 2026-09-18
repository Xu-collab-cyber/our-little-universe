1import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // 相对路径：部署到任何域名 / 子路径（如 GitHub Pages）都能正常运行
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Our Little Universe',
        short_name: 'Little Universe',
        description: 'A tiny universe made for you.',
        lang: 'zh-CN',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#05060f',
        background_color: '#05060f',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // 缓存构建产物；以后放入音乐后也会自动缓存（离线可用）
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2,mp3,jpg,jpeg,webp}'],
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024, // 为未来的音乐文件留出空间
      },
    }),
  ],
})
