<template>
  <div class="w-full p-2">
    <div
      v-if="isLoading"
      class="space-y-4"
    >
      <div
        v-for="(_, i) in Array(6)"
        :key="i"
      >
        <div class="w-full h-16 bg-gray-200 animate-pulse rounded-lg" />
      </div>
    </div>
    <div v-else>
      <div
        v-for="workspace in data"
        :key="workspace.ref.id"
      >
        <Workspace 
          :workspace="workspace" 
          :width="width"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkspaces } from "@hooks/useWorkspaces"
import { toRefs } from "vue"
import Workspace from "./Workspace.vue"
const { isLoading, data } = useWorkspaces()

const props = defineProps({
	width: {
		type: Number,
		default: 0,
	}
})

const { width } = toRefs(props)
</script>