<template>
  <div 
    class="space-y-1 overflow-hidden transition-all duration-150"
    :class="active ? 'h-76' : 'h-20'"
  > 
    <div
      class="flex justify-between items-center border-2 border-black rounded-lg p-2"
      @click="active = !active"
    >
      <div class="flex space-x-4 items-start">
        <div class="p-1 border-2 border-black rounded-lg">
          <I :icon="icon" />
        </div>
        <div class="text-2xl">
          <b>{{ title }}</b>
          <p class="text-xs">
            {{ advancedDesc }}
          </p>
        </div>
      </div>
      <ri:arrow-down-s-line
        class="h-6 w-6 transition-transform duration-150 transform"
        :class="active ? 'rotate-0' : '-rotate-90'"
      />
    </div>
    <div class="py-1">
      <div
        :class="useChecked ? '' : 'text-gray-400'"
        class="flex items-center mr-4 my-2"
      >
        <input
          v-model="useChecked"
          type="checkbox"
          class="opacity-0 absolute h-6 w-6"
        >
        <div class="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <svg
            class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fill-rule="evenodd"
            >
              <g
                transform="translate(-9 -11)"
                fill="#1F73F1"
                fill-rule="nonzero"
              >
                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
              </g>
            </g>
          </svg>
        </div>
        <label class="select-none">
          <p class="text">Use this tool</p>
        </label>
      </div>
      <div
        :class="useBubble ? '' : 'text-gray-400'"
        class="flex items-center mr-4 my-2"
      >
        <input
          v-model="useBubble"
          type="checkbox"
          class="opacity-0 absolute h-6 w-6"
        >
        <div class="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <svg
            class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fill-rule="evenodd"
            >
              <g
                transform="translate(-9 -11)"
                fill="#1F73F1"
                fill-rule="nonzero"
              >
                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
              </g>
            </g>
          </svg>
        </div>
        <label class="select-none">
          <p>Use this tool in bubble menu</p>
        </label>
      </div>
      <div
        :class="useHidden ? '' : 'text-gray-400'"
        class="flex items-center mr-4 my-2"
      >
        <input
          v-model="useHidden"
          type="checkbox"
          class="opacity-0 absolute h-6 w-6"
        >
        <div class="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <svg
            class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fill-rule="evenodd"
            >
              <g
                transform="translate(-9 -11)"
                fill="#1F73F1"
                fill-rule="nonzero"
              >
                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
              </g>
            </g>
          </svg>
        </div>
        <label class="select-none">
          <p>Hide this tool</p>
        </label>
      </div>
      <div
        :class="useNest ? '' : 'text-gray-400'"
        class="flex items-center mr-4 my-2"
      >
        <input
          v-model="useNest"
          type="checkbox"
          class="opacity-0 absolute h-6 w-6"
        >
        <div class="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <svg
            class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fill-rule="evenodd"
            >
              <g
                transform="translate(-9 -11)"
                fill="#1F73F1"
                fill-rule="nonzero"
              >
                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
              </g>
            </g>
          </svg>
        </div>
        <label class="select-none">
          <p>Nest this tool</p>
        </label>
      </div>
      <div class="space-y-1">
        <label class="select-none">
          <p class="">Keyboard Command</p>
        </label>
        <div class="flex text-sm">
          <HotKeyPopUp :hot-key="hotKey" />
        </div>
      </div>
    </div>
    <div v-html="demo" />
  </div>
</template>

<script setup lang="ts">
import { Icon as I} from "@shared/components/Icon"
import { ref } from "@vue/reactivity"
import { toRefs } from "vue"
import HotKeyPopUp from "./HotKeyPopUp.vue"
const props = defineProps({
	title: {
		default: "",
		type: String
	},
	desc: {
		default: "",
		type: String
	},
	icon: {
		default: "ri:signal-wifi-3-fill",
		type: String
	},
	hotKey: {
		default: "",
		type: String
	},
	advancedDesc: {
		default: "",
		type: String
	},
	demo: {
		default: "",
		type: String
	},
	importTool: {
		default: false,
		type: Boolean
	},
	bubble: {
		default: false,
		type: Boolean
	},
	nest: {
		default: false,
		type: Boolean
	},
	hide: {
		default: false,
		type: Boolean
	}
})
const { 
	title,
	desc,
	advancedDesc,
	demo,
	icon,
	hotKey,
	importTool,
	bubble,
	nest,
	hide
} = toRefs(props)

const active = ref(false)
const useChecked = ref(importTool.value)
const useBubble = ref(bubble.value)
const useHidden = ref(hide.value)
const useNest = ref(nest.value)
</script>

<style scoped>
input:checked + div {
  @apply border-blue-500;
}
input:checked + div svg {
  @apply block;
}
</style>
