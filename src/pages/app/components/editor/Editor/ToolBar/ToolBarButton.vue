<template>
  <button 
    ref="button"
    :class="!editor?.view.focused ? 'p-2 rounded-md text-gray-300 cursor-pointer' : isActive ? 
      ' p-2 rounded-md hover:bg-black cursor-pointer hover:text-white ' +
      ' bg-black text-white ' +    
      computedClass?.[0] + 
      computedClass?.[1] : 
      ' p-2 rounded-md hover:bg-black cursor-pointer hover:text-white '
      + computedClass?.[0]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/vue-3"
import { tryOnMounted } from "@vueuse/core"
import { computed, h, ref, toRefs } from "vue"
import { useTippy } from "vue-tippy"

const isMac = computed(() => window.navigator.userAgent.includes("Mac"))
const props = defineProps<{ 
  isActive: boolean,
  desc?: string,
  hotKey?: string,
  className?: string, 
  editor?: Editor
}>()
const { isActive, desc, hotKey, className, editor } = toRefs(props)
const computedClass = computed(() => className?.value && className.value.split("active:"))
const button = ref(null)
tryOnMounted(() => {
	if (button.value && desc) {
		useTippy(button.value, {
			content: h("div", {
				class: className?.value || "px-2 py-1 text-sm text-white bg-blue-gray-800 rounded-sm space-x-1"
			}, [
				h("span", {}, desc.value),
				hotKey?.value && h(
					"span", 
					{ class: "bg-blue-gray-600 px-1 py-0.25 rounded-sm" }, 
					isMac.value ? hotKey?.value.replace("mod", "⌘") : hotKey?.value.replace("mod", "Ctrl")
				)
			])
		})
	}
})
</script>