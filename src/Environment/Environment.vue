<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="w-full px-4 py-3 bg-white flex justify-between border-b-4 border-indigo-400">
      <div class="flex space-x-4 items-center font-bold text-xl">
        <Zelda />
        <span>SHERE KAHAN</span>
        <span class="p-1 ring-2 ring-black text-xs font-semibold rounded-lg">ALPHA</span>
      </div>
      <User />
    </div>
    <div class="flex-grow flex">
      <div class="flex-shrink-0 overflow-hidden" :style="{ width: computedFoldersX + 'px' }">
        <Folders />
      </div>
      <div ref="bar" class="w-1 cursor-move h-full bg-indigo-400 flex-shrink-0 z-20"></div>
      <div class="flex-grow p-2">
        {{ data || 'huh' }}
        <div v-if="data">
          <Editor :document="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Editor from '../Editor/Editor.vue'
  import User from '../Components/User.vue'
  import Zelda from '../Components/Zelda.vue'
  import Folders from '../Components/Folders.vue'
  import { defineComponent } from "vue";
  import { useQuery, useQueryProvider } from "vue-query";
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { computed, ref } from 'vue'
  import { useDraggable } from '@vueuse/core'
  import { useWindowSize } from '@vueuse/core'
  import { useCreateDocument, useCurrentDocument, useDocument, useSetCurrentDocument } from '../hooks/useQueries';
  import { useHead } from '@vueuse/head'
  useHead({
    style: [
      {
        children: `body {background-color: white}`,
      },
    ],
  })

  const { width, height } = useWindowSize()
  const bar = ref<HTMLElement | null>(null)
  const { x: foldersX } = useDraggable(bar, {
    initialValue: { x: 350, y: 40 },
  })
  const setCurrentDoc = useSetCurrentDocument()
  const { data } = useCurrentDocument()
  setTimeout(() => {
    setCurrentDoc.mutate('316295743902057025')
  }, 1000)
  const computedFoldersX = computed(() => {
    return foldersX.value > 300 ? foldersX.value : 0
  })
</script>