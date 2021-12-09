<template>
  <div>
    <div
      v-if="user"
      class="w-screen h-screen flex flex-col"
    >
      <div
        v-if="user"
        class="flex px-4 py-1 border-b-2 border-black justify-between"
      >
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
          class="w-0.5 cursor-move h-full bg-black flex-shrink-0 z-20 relative"
        >
          <div 
            :class="computedFoldersX == 0 ? 'ml-4' : '-ml-3.5'"
            class="w-8 h-8 asbolute mt-8 flex items-center justify-center rounded-full bg-black text-white"
            @click="foldersX == 0 ? foldersX = 350 : foldersX = 0"
          >
            <ri:arrow-left-line
              class="transform transition-transform duration-150"
              :class="computedFoldersX == 0 ? 'rotate-180' : 'rotate-0'"
            />
          </div>
        </div>
        <router-view />
      </div>
    </div>
    <Notifaction />
    <VueQueryDevTools />
  </div>
</template>

<script setup lang="ts">
import User from "./components/navigation/User.vue"
import { computed, ref } from "vue"
import { useDraggable } from "@vueuse/core"
import { useWindowSize } from "@vueuse/core"
import { useHead } from "@vueuse/head"
import { VueQueryDevTools } from "vue-query/devtools"
import { useToken } from "@hooks/useTokens"
import Notifaction from "./components/notifications/Notifaction.vue"
import FileSystem from "./components/file-system/FileSystem.vue"
import ToolBar from "./components/editor/Editor/ToolBar/ToolBar.vue"
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
const { width } = useWindowSize()
const bar = ref<HTMLElement | null>(null)
const { x: foldersX } = useDraggable(bar, {
	initialValue: { x: 350, y: 40 },
})

const { data: user } = useToken()
const computedFoldersX = computed(() => {
	return foldersX.value > 200
		? foldersX.value < width.value / 2
			? foldersX.value
			: width.value / 2
		: 0
})

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
