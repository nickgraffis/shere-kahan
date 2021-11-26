<template>
  <div>
    <div v-for="dir in directories">
      <div 
      v-if="dir"
      >
        <div @click="expandFolder(dir.ref.id)" class="w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200">
          <div class="flex space-x-2 items-center flex-grow">
            <ri:folder-line class="flex-shrink-0" />
            <span class="whitespace-nowrap">{{ dir?.data.name }}</span>
          </div>
          <eva:arrow-down-fill 
          class="transform transition-transform duration-150" 
          :class="expanded.includes(dir.ref.id) ? 'rotate-0' : '-rotate-90'"/>
        </div>
        <div 
        class="ml-4 transition-all duration-150" 
        v-if="dir?.children.length && expanded.includes(dir.ref.id)">
          <DirectoryList :directories="dir?.children"/>
        </div>
      </div>
      <div v-else>
        <div class="w-full items-center space-y-2 px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200">
          <p 
          class="font-bold whitespace-nowrap truncate"
          >
          {{ dir.data.name }}
          </p>
          <p class="text-xs text-purple-300 whitespace-nowrap">11:34 AM</p>
          <p class="text-sm truncate-overflow">This is the most recent</p>
        </div>
      </div>
    </div>
    <div v-if="creatingDirectory" class="w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 bg-purple-200">
      <div class="flex space-x-2 items-center flex-grow">
        <ri:folder-line class="flex-shrink-0" />
        <input ref="directoryInput" class="appearance-none bg-purple-200" />
      </div>
    </div>
    <div v-else @click="createDirectory()" class="w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200">
      <div class="flex space-x-2 items-center flex-grow">
        <ri:add-box-line class="flex-shrink-0" />
        <span class="whitespace-nowrap">Create Directory</span>
      </div>
    </div>
    <div class="w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200">
      <div class="flex space-x-2 items-center flex-grow">
        <ri:file-add-line class="flex-shrink-0" />
        <span class="whitespace-nowrap">Create Document</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const { directories } = defineProps<{ directories: any }>()
const expanded = ref<string[]>([])
const creatingDirectory = ref<boolean>(false)
const directoryInput = ref<HTMLInputElement | null>(null)
const expandFolder = (id: string) => {
  if (expanded.value.includes(id)) {
    expanded.value = expanded.value.filter(i => i !== id)
  } else {
    expanded.value.push(id)
  }
}

const createDirectory = () => {
  creatingDirectory.value = true
  setTimeout(() => {
    directoryInput.value?.focus() 
  }, 10)
}
</script>