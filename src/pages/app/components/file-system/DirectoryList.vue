<template>
  <div v-if="documents">
    <div
      v-for="(document , i) in documents"
      :key="i"
    >
      <div
        v-if="document"
        class="ml-4"
      >
        <DocumentPreview 
          :document-id="document.ref.id"
          :width="width"
          :workspace="workspace"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocumentPreview from "./DocumentPreview.vue"
import { ref, toRefs } from "vue"
import { useCreateDocument } from "@hooks/useDocuments"
import { ShereDocument, Workspace } from "@/types"

const props = defineProps<{
  documents: ShereDocument[] | undefined,
  workspace: Workspace,
  width: number
}>()

const { documents, workspace, width } = toRefs(props)

const expanded = ref<string[]>([])
const creatingDirectory = ref<boolean>(false)
const directoryInput = ref<HTMLInputElement | null>(null)


const expandFolder = (id: string) => {
	if (expanded.value.includes(id)) {
		expanded.value = expanded.value.filter((i) => i !== id)
	} else {
		expanded.value.push(id)
	}
}
const createDoc = useCreateDocument()
const createDocument = () => {
	createDoc.mutate({
		name: "New Document",
		parent: workspace.value.ref.id,
	})
}

// const childIdArray = (children: any, array: string[] = []) => {
// 	if (children.length === 0) {
// 		return array
// 	}
// 	children.forEach((child) => {
// 		array.push(child.ref.id)
// 		childIdArray(child.children, array)
// 	})

// 	return array
// }
</script>
