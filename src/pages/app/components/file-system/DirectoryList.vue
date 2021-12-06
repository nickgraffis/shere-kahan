<template>
  <div>
    <div
      v-for="dir in directories"
      :key="dir.ref.id"
    >
      <div class="ml-4">
        <div
          :class="currentDocument === dir.ref.id && 'bg-black text-white'"
          class="w-full items-center space-y-2 px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-black hover:text-white"
          @click="(e) => setCurrentDocument(dir.ref.id, e)"
        >
          <div class="w-full flex items-center justify-between">
            <div
              class="space-y-2"
              :style="{ width: (width - 140) + 'px'}"
            >
              <div class="flex space-x-2">
                <p class="font-bold whitespace-nowrap truncate">
                  {{ dir.data.name }}
                </p>
              </div>
              <div class="text-xs whitespace-nowrap flex items-end">
                <span>Updated {{ simpleDate(dir.data?.lastUpdated?.at || null) }} by</span>
                <Avatar 
                  :id="dir.data?.lastUpdated?.by.id" 
                  class-name="h-4 w-4 rounded-full mx-1"
                />
                <span>{{ dir.data?.lastUpdated?.by.name }}</span>
              </div>
            </div>
            <div class="flex space-x-2">
              <div
                class="p-1 rounded-md text-white hover:bg-gray-800"
                @click="openModal"
              >
                <ri:more-fill />
              </div>
              <div
                class="p-1 rounded-md text-white hover:bg-gray-800"
              >
                <ri:add-box-line />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="dir?.children?.length && (expanded.includes(dir.ref.id) || childIdArray(dir.children).includes(curDoc))"
          class="ml-4 transition-all duration-150"
        >
          <DirectoryList
            :directories="dir?.children"
            :workspace="workspace"
            :width="width"
          />
        </div>
      </div>
    </div>
    <TransitionRoot
      appear
      :show="isOpen"
      as="template"
    >
      <Dialog
        as="div"
        @close="closeModal"
      >
        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0" />
            </TransitionChild>

            <span
              class="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>



            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div
                class="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Document Title
                </DialogTitle>
                <div class="mt-2">
                  <p>
                    A short description of the document. It's looking pretty great!
                    You have <b>759</b> characters and <b>98</b> words.
                  </p>
                </div>
                <div class="mt-2">
                  <p />
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    @click="closeModal"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { simpleDate } from "@root/utils/dates"
import { reactive, ref, toRefs } from "vue"
import { useCreateDocument, useCurrentDocument } from "@hooks/useDocuments"
import { useRouter } from "vue-router"
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogOverlay,
} from "@headlessui/vue"
import Avatar from "@shared/components/Avatar.vue"
const isOpen = ref(false)
const openModal = () => {
	isOpen.value = true
}
const closeModal = () => {
	isOpen.value = false
}
const { currentDocument, setCurrentDocument: setCurDoc } = useCurrentDocument()
const props = defineProps({
	directories: {
		type: Array,
		required: true,
	},
	workspace: {
		type: Object,
		required: true,
	},
	width: {
		type: Number,
		required: true,
	},
})
const { directories, workspace, width } = toRefs(props)
console.log(width.value)
const expanded = ref<string[]>([])
const creatingDirectory = ref<boolean>(false)
const directoryInput = ref<HTMLInputElement | null>(null)

const goToSettings = () => window.history.pushState(null, "", "/settings/id")
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
		parent: workspace.ref.id,
	})
}

const childIdArray = (children: any, array: string[] = []) => {
	if (children.length === 0) {
		return array
	}
	children.forEach((child) => {
		array.push(child.ref.id)
		childIdArray(child.children, array)
	})

	return array
}
const router = useRouter()
const setCurrentDocument = (id: string, e) => {
	expandFolder(id)
	setCurDoc(id)
	router.push({
		name: "document",
		params: {
			documentId: id,
			id: workspace.value.ref.id,
		},
	})
}

const createDirectory = () => {
	creatingDirectory.value = true
	setTimeout(() => {
		directoryInput.value?.focus()
	}, 10)
}
</script>
