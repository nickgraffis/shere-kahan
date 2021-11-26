import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.vue'
    ]
  }
})