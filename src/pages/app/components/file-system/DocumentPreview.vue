<template>
  <div v-if="!isLoading && document">
    <div
      :class="currentDocument === document.ref.id && 'bg-black text-white'"
      class="w-full items-center space-y-2 px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-black hover:text-white"
      @click="(e) => openDocument(document.ref.id, e)"
    >
      <div class="w-full flex items-center justify-between">
        <svg
          v-if="isLoading"
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <div
          class="space-y-2"
          :style="{ width: (width - 140) + 'px'}"
        >
          <div class="flex space-x-2">
            <p class="font-bold whitespace-nowrap truncate">
              {{ document.data.name }}
            </p>
          </div>
          <div class="text-xs whitespace-nowrap flex items-end">
            <span>Updated {{ simpleDate(document.data?.lastUpdated?.at) }} by</span>
            <Avatar 
              :id="document.data?.lastUpdated?.by.id" 
              class-name="h-4 w-4 rounded-full mx-1"
            />
            <span>{{ document.data?.lastUpdated?.by.name }}</span>
          </div>
        </div>
        <div class="flex space-x-2">
          <div
            class="p-1 rounded-md text-white hover:bg-gray-800"
          >
            <ri:more-fill />
          </div>
          <div
            class="p-1 rounded-md text-white hover:bg-gray-800"
            @click="createDocument"
          >
            <ri:add-box-line />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="document?.children && document?.expanded" 
      class="ml-4 transition-all duration-150"
    >
      <DirectoryList
        :documents="document?.children"
        :workspace="workspace"
        :width="width"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DirectoryList from "./DirectoryList.vue"
import { useCurrentDocument, useDocument, useExpandDocument, useCreateDocument } from "@/hooks/useDocuments"
import { ShereDocument, Workspace } from "@/types"
import Avatar from "@shared/components/Avatar.vue"
import { simpleDate } from "@root/utils/dates"
import { toRefs } from "@vue/reactivity"
import { useRouter } from "vue-router"
import { query as q } from "faunadb"

const props = defineProps<{
  documentId: string,
  width: number,
  workspace: Workspace
}>()

const { currentDocument, setCurrentDocument } = useCurrentDocument()
const createNewDocument = useCreateDocument()

const { documentId, width, workspace } = toRefs(props)

const { isLoading, data: document, refetch } = useDocument(documentId)
const expandDocument = useExpandDocument(documentId)
const router = useRouter()

const createDocument = () => {
	createNewDocument.mutate({
		name: "New Document",
		parent: q.Ref(q.Collection("documents"), documentId.value),
	})
}

const openDocument = (id: string, e) => {
	setCurrentDocument(id)
	expandDocument.mutate(undefined)
	refetch.value()
	router.push({
		name: "document",
		params: {
			documentId: id,
			id: workspace.value.ref.id,
		},
	})
}
</script>