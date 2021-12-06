<template>
  <div 
  ref="button"
  class="flex space-x-0.5 items-center"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { tryOnMounted } from '@vueuse/core'
  import { computed, h, ref } from 'vue'
  import { useTippy } from 'vue-tippy'

  const isMac = computed(() => window.navigator.userAgent.includes('Mac'))

  const { desc, hotKey, className } = defineProps<{ 
    isActive?: boolean,
    desc?: string,
    hotKey?: string,
    className?: string, 
  }>()

  const button = ref(null)
  tryOnMounted(() => {
    if (button.value && desc) {
      useTippy(button.value, {
        content: h('div', {
          class: className || 'px-2 py-1 text-sm text-white bg-blue-gray-800 rounded-sm space-x-1'
        }, [
          h('span', {}, desc),
          hotKey && h(
            'span', 
            { class: 'bg-blue-gray-600 px-1 py-0.25 rounded-sm' }, 
            isMac.value ? hotKey?.replace('mod', '⌘') : hotKey?.replace('mod', 'Ctrl')
          )
        ])
      })
    }
  })
</script>