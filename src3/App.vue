<template>
  <div class="flex h-screen w-screen">
    <div class="overflow-x-hidden h-full flex flex-col flex-shrink-0" :style="{ width: computedFoldersX + 'px' }">
      <div class="flex-grow flex flex-col">
        <div class="flex-grow overflow-y-scroll p-4 space-y-3">
          <Directory :directory="{
      id: '8439853',
      name: 'Water Polo',
      type: 'directory',
      children: [
        {
          id: 'jkflda;jfkd',
          type: 'directory',
          name: 'Vanguard'
        }
      ]
    }" />
        </div>
        <div class="sticky bottom-0 bg-white p-4">
          <div class="p-4 w-full items-center flex font-semibold space-x-2 px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200">
            <eva:plus-circle-fill class="flex-shrink-0" />
            <span class="whitespace-nowrap">New Folder</span>
          </div>
        </div>
      </div>
    </div>
    <div ref="notes" class="w-1 cursor-move h-full bg-purple-500 flex-shrink-0 z-20"></div>
    <div class="flex-grow p-4 flex flex-col">
      <div class="w-full pb-4 flex items-center justify-between">
        <div class="flex space-x-2 items-center">
          <ri:folder-fill class="flex-shrink-0" />
          <span class="whitespace-nowrap">Water Polo</span>
          <span>/</span>
          <span>Effective Offense for Dummies</span>
        </div>
        <div class="flex space-x-4 items-center">
          <ri:file-text-fill class="w-6 h-6" />
          <ri:file-pdf-fill class="w-6 h-6" />
          <ri:markdown-fill class="w-6 h-6" />
          <ri:share-forward-2-fill class="w-6 h-6" />
          <ri:search-2-line class="w-6 h-6" />
          <div class="flex items-center">
            <div class="h-8 w-8 bg-indigo-400 rounded-full ring-2 ring-white z-10">

            </div>
            <div class="h-8 w-8 bg-indigo-400 rounded-full ring-2 ring-white -ml-2">

            </div>
          </div>
          <ri:settings-2-fill class="w-6 h-6" />
          <div class="h-8 w-8 bg-indigo-400 rounded-full">

          </div>
        </div>
      </div>
      <Editor />
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  useEditor, 
  EditorContent,
  BubbleMenu,
  FloatingMenu, 
} from '@tiptap/vue-3'
import Directory from './components/DirectoryList.vue'
import Editor from './components/Editor.vue'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import { computed, ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()
 

const folders = ref<HTMLElement | null>(null)
const notes = ref<HTMLElement | null>(null)

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  editorProps: {
    attributes: {
      class: 'w-full h-full focus:outline-none p-4',
    },
  },
  extensions: [
    StarterKit,
    Highlight,
    Typography,
  ],
})

const { x: foldersX } = useDraggable(folders, {
  initialValue: { x: 350, y: 40 },
})

const computedFoldersX = computed(() => {
  return foldersX.value > 300 ? foldersX.value : 0
})

const { x: notesX } = useDraggable(notes, {
  initialValue: { x: 700, y: 40 },
})

const computedNotesX = computed(() => {
  const width = notesX.value - foldersX.value
  return width > 300 ? width : 300
})

</script>