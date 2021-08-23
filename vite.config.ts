import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import ViteComponents from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    // Vue main entry
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
      syncIndex: false,
      replaceSquareBrackets: true,
      nuxtStyle: true
    }),
    
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    
    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // generate `components.d.ts` for ts support with Volar
      globalComponentsDeclaration: true
    })
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
    ]
  }
})
