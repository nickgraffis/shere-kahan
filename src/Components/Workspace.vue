<template>
  <div @click="expandWorkspace(workspace.ref.id)" class="group cursor-pointer w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-black hover:text-white">
    <div 
    class="flex space-x-2 items-start flex-grow border-l-5 pl-3"
    :style="{borderColor: workspace.data.color }"
    >
      <div class="space-y-1">
        <p class="whitespace-nowrap">{{ workspace.data.name }}</p>
        <p class="text-xs font-normal">{{workspace.data.lastUpdated.time}}</p>
      </div>
    </div>
    <div class="flex space-x-2 items-center">
      <div class="p-1 rounded-md hover:bg-gray-600">
        <ri:add-box-line class="flex-shrink-0" />
      </div>
      <eva:arrow-down-fill class="transform transition-transform duration-150" :class="expanded.includes(workspace.ref.id) ? 'rotate-0' : '-rotate-90'" />
    </div>
  </div>
  <div v-if="expanded.includes(workspace.ref.id)" >
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <DirectoryList :directories="data" :workspace="workspace" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import { useDirectories } from "../hooks/useQueries";
import DirectoryList from "./DirectoryList.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'
import { useRouter } from "vue-router";
const expanded = ref<string[]>([])
const isOpen = ref(false)
const closeModal = () => isOpen.value = false
const openModal = () => isOpen.value = true
const { workspace } = defineProps({
  workspace: {
    type: Object,
    required: true,
  }
})
const router = useRouter()
const { isLoading, data } = useDirectories(workspace.ref.id);
const expandWorkspace = (id: string) => {
  router.push({
    name: "workspace",
    params: {
      id: id
    }
  })
  // if the id is already in the array, remove it, else add it
  if (expanded.value.includes(id)) {
    expanded.value = expanded.value.filter(i => i !== id)
  } else {
    expanded.value.push(id)
  }
}
</script>