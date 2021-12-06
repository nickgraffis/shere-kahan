<template>
  <div>
    <div
      class="group cursor-pointer w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-black hover:text-white"
      @click="expandWorkspace(workspace.ref.id)"
    >
      <div 
        class="flex space-x-2 items-start flex-grow border-l-5 pl-3"
        :style="{borderColor: workspace.data.color }"
      >
        <div class="space-y-1">
          <p class="whitespace-nowrap">
            {{ workspace.data.name }}
          </p>
          <p class="text-xs font-normal">
            Desription?
          </p>
        </div>
      </div>
      <div class="flex space-x-2 items-center">
        <div class="p-1 rounded-md hover:bg-gray-600">
          <ri:add-box-line class="flex-shrink-0" />
        </div>
      </div>
    </div>
    <div v-if="expanded.includes(workspace.ref.id)">
      <div v-if="isLoading">
        Loading...
      </div>
      <div v-else>
        <DirectoryList
          :directories="data?.doucments"
          :workspace="workspace"
          :width="width"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue"
import { useWorkspace } from "@hooks/useWorkspaces"
import DirectoryList from "./DirectoryList.vue"
import { useRouter } from "vue-router"
const expanded = ref<string[]>([])
const props = defineProps({
	workspace: {
		type: Object,
		required: true,
	},
	width: {
		type: Number,
		default: 0,
	}
})
const { workspace, width } = toRefs(props)
const router = useRouter()
const { isLoading, data } = useWorkspace(workspace.value.ref.id)
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