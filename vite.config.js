import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Markdown from 'vite-plugin-md'

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
          const token = tokens[idx]
          const hrefIndex = token.attrIndex('href')
          const href = token.attrs[hrefIndex][1]
          
          if (href.startsWith('http')) {
            token.attrPush(['target', '_blank'])
            token.attrPush(['rel', 'noopener noreferrer'])
          }
          
          return self.renderToken(tokens, idx, options)
        }
      },
      builders: []
    }),
  ],
})
