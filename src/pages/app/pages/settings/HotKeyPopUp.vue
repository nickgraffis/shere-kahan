<template>
  <div>
    <div
      class="px-2 py-1 rounded-md bg-gray-100 cursor-pointer"
      @click="openModal"
    >
      {{ formatHotKey(hotKeyRef) }}
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
        <div class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
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
                class="inline-block w-full rounded-3xl overflow-hidden align-middle transition-all transform"
              >
                <div class="flex flex-col items-center">
                  <div class="px-4 py-2 rounded-3xl bg-black text-white font-bold text-10xl">
                    {{ hotKeyRef }}
                  </div>
                  <div class="flex space-x-4 my-4 justify-between">
                    <button
                      class="bg-black flex-grow text-white font-semibold px-4 py-2 rounded-lg flex space-x-3 items-center justify-center"
                      @click="saveModal"
                    >
                      <span>Save</span> 
                      <span class="ring-2 ring-white rounded-sm py-0.5 px-1.5 text-xs">Enter</span>
                    </button>
                    <button
                      class="bg-black text-white font-semibold px-4 py-2 rounded-lg flex space-x-3 items-center"
                      @click="closeModal"
                    >
                      <span>Cancel</span> 
                      <span class="ring-2 ring-white rounded-sm py-0.5 px-1.5 text-xs">Esc</span>
                    </button>
                  </div>
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
import { computed, ref, toRefs } from "vue"
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogOverlay,
} from "@headlessui/vue"

const props = defineProps({
	hotKey: {
		default: "",
		type: String,
	},
})

const { hotKey } = toRefs(props)

const isOpen = ref(false)
const closeModal = () => {
	isOpen.value = false
	listen()
}
const openModal = () => {
	isOpen.value = true
	listen()
}
const saveModal = () => {
	closeModal()
}

const isMac = computed(() => window.navigator.userAgent.includes("Mac"))
const formatHotKey = (keys: string) => {
	return keys
		.replace(/Meta*/g, "⌘")
		.replace(/Control*/g, "Ctrl")
		.replace(/Left*/g, "")
		.replace(/Right*/g, "")
		.replace(/Key*/g, "")
		.replace(/mod*/g, `${isMac.value ? "⌘" : "Ctrl"}`)
		.toUpperCase()
}
const hotKeyRef = ref<string>(formatHotKey(hotKey.value))
const keysHeld = ref<string[]>([])
const listening = ref(false)
const listen = () => {
	if (listening.value) return listening.value = false
	else listening.value = true
	document.body.addEventListener("keyup", (e) => {
		console.log(e)
		e.preventDefault()
		e.stopPropagation()
		keysHeld.value = keysHeld.value.splice(keysHeld.value.indexOf(e.key), 1)
	})
	document.body.addEventListener("keypress", (e) => {
		e.preventDefault()
		e.stopPropagation()
	})
	document.body.addEventListener("keydown", (e) => {
		if (e.key === "S" && e.metaKey) {
			e.preventDefault()
			e.stopPropagation()
		}
		if (e.key === "Escape") {
			return closeModal()
		} else if (e.key === "Enter") {
			return saveModal()
		}
		e.preventDefault()
		e.stopPropagation()
		keysHeld.value.push(e.key)
		hotKeyRef.value = formatHotKey(Array.from(new Set(keysHeld.value)).join("+"))
		return false
	})
}
</script>