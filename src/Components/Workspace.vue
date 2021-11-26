<template>
  <div @click="expandWorkspace(workspace.ref.id)" class="w-full items-start flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200">
    <div class="flex space-x-2 items-start flex-grow">
      <ri:server-line class="flex-shrink-0" />
      <div class="space-y-1">
        <p class="whitespace-nowrap">{{ workspace.data.name }}</p>
        <p class="text-xs font-normal">{{workspace.data.lastUpdated.time}}</p>
      </div>
    </div>
    <eva:arrow-down-fill class="transform transition-transform duration-150" :class="expanded.includes(workspace.ref.id) ? 'rotate-0' : '-rotate-90'" />
  </div>
  <div v-if="expanded.includes(workspace.ref.id)" >
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else-if="data">
      <DirectoryList :directories="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDirectories } from "../hooks/useQueries";
import DirectoryList from "./DirectoryList.vue";
const expanded = ref<string[]>([])
const { workspace } = defineProps({
  workspace: {
    type: Object,
    required: true,
  }
})

const { isLoading, data } = useDirectories(workspace.ref.id);
const expandWorkspace = (id) => {
  // if the id is already in the array, remove it, else add it
  if (expanded.value.includes(id)) {
    expanded.value = expanded.value.filter(i => i !== id)
  } else {
    expanded.value.push(id)
  }
}
</script>