import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.vue'
    ]
  },
  plugins: [
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 500,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ]
})