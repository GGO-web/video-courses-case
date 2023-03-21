import { defineNuxtConfig } from 'nuxt/config'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  css: [
    '@/assets/scss/main.scss',
    'video.js/dist/video-js.css'
  ],
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  plugins: [
    '~/plugins/videoPlayer.ts'
  ],
  srcDir: 'src/',
  vite: {
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver({
          importStyle: true,
          resolveIcons: true
        })]
      })
    ],
    css: {
      devSourcemap: true
    },
    ssr: {
      noExternal: [
        '@ant-design/icons-vue'
      ]
    }
  },
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss'
  }
})
