<template>
  <div
    v-if="user"
    class="w-screen h-screen flex flex-col py-1"
  >
    <div
      v-if="user"
      class="flex px-4 border-b-2 border-black"
    >
      <!-- <div class="flex space-x-4 items-center font-black text-2xl">
        <Shere />
        <span>SHERE</span>
        <span class="p-1 ring-2 ring-black text-xs font-semibold rounded-lg">ALPHA</span>
      </div> -->
      <ToolBar 
        :editor="editor"
        :toolbar="user?.account.data.settings.tools"
        :saved="'mounting'"
      />
      <User />
    </div>
    <div class="flex-grow flex overflow-hidden">
      <div
        class="folders flex-shrink-0 overflow-x-hidden overflow-y-auto"
        :style="{ width: computedFoldersX + 'px' }"
      >
        <FileSystem :width="computedFoldersX" />
      </div>
      <div 
        ref="bar" 
        class="w-1 cursor-move h-full bg-black flex-shrink-0 z-20"
      />
      <router-view />
    </div>
  </div>
  <Notifaction />
  <VueQueryDevTools />
  <div class="absolute bottom-4 right-4">
    {{ currentDocument }}
  </div>
</template>

<script setup lang="ts">
import Shere from "@shared/components/Shere.vue"
import User from "./components/navigation/User.vue"
import Navigation from "./components/navigation/Navigation.vue"
import { computed, reactive, ref } from "vue"
import { onKeyStroke, useDraggable } from "@vueuse/core"
import { useWindowSize } from "@vueuse/core"
import { useHead } from "@vueuse/head"
import { useDocument, useCurrentDocument } from "@hooks/useDocuments"
import { VueQueryDevTools } from "vue-query/devtools"
import { useToken } from "@hooks/useTokens"
import { useRoute, useRouter } from "vue-router"
import { queryClient } from "@hooks/useQueries"
import Notifaction from "./components/notifications/Notifaction.vue"
import FileSystem from "./components/file-system/FileSystem.vue"
import ToolBar from "./components/editor/Editor/ToolBar/ToolBar.vue"
import { toolbarData } from "./components/editor/Editor/ToolBar/data"
import { useEditor } from "@hooks/useEditor"
// because we set the background color in the head to black for the alpha
// view. we do this because then there is no white flash. but we then need
// to change the background color back to white when we get out of the alpha
// view, because the head style will take precedence over the windi styles.
useHead({
	style: [
		{
			children: "body {background-color: white}",
		},
	],
})

const editor = useEditor()
const route = useRoute()
const test = ref(queryClient.getQueryData("token"))
const { width, height } = useWindowSize()
const bar = ref<HTMLElement | null>(null)
const { x: foldersX } = useDraggable(bar, {
	initialValue: { x: 350, y: 40 },
})
// const curDoc = reactive(currentDocument)
const { data: user } = useToken()
const computedFoldersX = computed(() => {
	return foldersX.value > 200
		? foldersX.value < width.value / 2
			? foldersX.value
			: width.value / 2
		: 0
})

const { currentDocument } = useCurrentDocument()
const search = ref<HTMLInputElement | null>(null)
const router = useRouter()

// onKeyStroke('Enter', (_) => {
//     // why is ts making me check with twice?
//     router.push({
//         name: 'workspace',
//         params: {
//             id: search.value?.value
//         }
//     })
//     curDoc.value = search.value?.value;
//   })
</script>

<style lang="css">
/* width */
.folders::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.folders::-webkit-scrollbar-track {
  @apply bg-gray-300;
}

/* Handle */
.folders::-webkit-scrollbar-thumb {
  @apply bg-gray-600;
}

/* Handle on hover */
.folders::-webkit-scrollbar-thumb:hover {
  @apply bg-black;
}
</style>
