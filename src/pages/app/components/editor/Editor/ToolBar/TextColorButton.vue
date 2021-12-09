<template>
  <Popover
    v-slot="{ open }"
    class="relative"
  >
    <PopoverButton
      :class="[
        open ? '' : 'text-opacity-90',
        false ? 'p-1 rounded-md text-gray-300 cursor-pointer' : editor?.isActive('highlight') ? 
          ' p-1 rounded-md hover:bg-black cursor-pointer hover:text-white ' +
          ' bg-black text-white ' +    
          computedClass?.[0] + 
          computedClass?.[1] : 
          ' p-1 rounded-md hover:bg-black cursor-pointer hover:text-white '
          + computedClass?.[0]
      ]"
    >
      <div ref="button">
        <slot />
      </div>
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="absolute"
        style="z-index: 200;"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div
            class="bg-white text-black shadow-xl px-4 py-3"
          >
            <div class="flex space-x-2">
              <div
                v-for="color in colors"
                :key="color"
              >
                <div
                  class="w-8 h-8 flex items-center justify-center text-white rounded-lg"
                  :style="{ backgroundColor: color }"
                  @click="editor?.chain().focus().setColor(color).run()"
                >
                  <ri:check-fill
                    v-if="editor?.isActive('textStyle', { color })"
                    class="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/vue-3"
import { tryOnMounted } from "@vueuse/core"
import { computed, h, ref, toRefs } from "vue"
import { useTippy } from "vue-tippy"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
const colors = [
	"#ffc078",
	"#8ce99a",
	"#74c0fc",
	"#b197fc",
	"#ffa8a8"]
const isMac = computed(() => window.navigator.userAgent.includes("Mac"))
const props = defineProps<{ 
  desc?: string,
  hotKey?: string,
  className?: string, 
  editor?: Editor
}>()
const { desc, hotKey, className, editor } = toRefs(props)
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