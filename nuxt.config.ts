import { defineNuxtConfig } from 'nuxt/config'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  css: ['ant-design-vue/dist/antd.css', '@/assets/scss/main.scss'],
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  srcDir: 'src/',
  vite: {
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver({
          resolveIcons: true
        })]
      })
    ],
    css: {
      devSourcemap: true
    },
    ssr: {
      noExternal: [
        'ant-design-vue',
        '@ant-design/icons-vue'
      ]
    }
  },
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss'
  }
})
