<template>
  <div 
    ref="button"
    class="flex items-center"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { tryOnMounted } from "@vueuse/core"
import { computed, h, ref, toRefs } from "vue"
import { useTippy } from "vue-tippy"

const isMac = computed(() => window.navigator.userAgent.includes("Mac"))
const props = defineProps<{ 
    isActive?: boolean,
    desc?: string,
    hotKey?: string,
    className?: string, 
  }>()
const { desc, hotKey, className } = toRefs(props) 

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
					isMac.value ? hotKey.value?.replace("mod", "⌘") : hotKey.value?.replace("mod", "Ctrl")
				)
			])
		})
	}
})
</script>