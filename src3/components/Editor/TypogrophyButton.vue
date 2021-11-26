<template>
  <div 
  ref="button"
  :class="isActive ? 
    ' h-7 w-7 flex items-center justify-center rounded-md hover:bg-indigo-400 cursor-pointer hover:text-white ' +
    ' bg-indigo-400 text-white ' +    
    computedClass?.[0] + 
    computedClass?.[1] : 
    ' h-7 w-7 flex items-center justify-center rounded-md hover:bg-indigo-400 cursor-pointer hover:text-white '
    + computedClass?.[0]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { tryOnMounted } from '@vueuse/core'
  import { computed, defineComponent, h, onMounted, ref } from 'vue'
  import { useTippy } from 'vue-tippy'

  const isMac = computed(() => window.navigator.userAgent.includes('Mac'))

  const { isActive, desc, hotKey, className } = defineProps<{ 
    isActive: boolean,
    desc?: string,
    hotKey?: string,
    className?: string, 
  }>()

  const computedClass = computed(() => className && className.split('active:'))
  console.log(computedClass.value)
  const button = ref(null)
  tryOnMounted(() => {
    if (button.value && desc && hotKey) {
      useTippy(button.value, {
        content: h('div', {
          class: 'px-2 py-1 text-sm text-white bg-blue-gray-800 rounded-sm space-x-1'
        }, [
          h('span', {}, desc),
          h(
            'span', 
            { class: 'bg-blue-gray-600 px-1 py-0.25 rounded-sm' }, 
            isMac.value ? hotKey.replace('mod', '⌘') : hotKey.replace('mod', 'Ctrl')
          )
        ])
      })
    }
  })
</script>