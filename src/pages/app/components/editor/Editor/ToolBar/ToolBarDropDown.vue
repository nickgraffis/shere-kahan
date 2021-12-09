
<template>
  <Menu
    as="div"
    class="relative inline-block text-left focus:outline-none active:outline-none "
  >
    <div>
      <MenuButton
        class="focus:outline-none active:outline-none hover:bg-black hover:text-white p-1 rounded-md"
      >
        <ToolBarGroupButton :desc="buttonGroup.desc">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-6 -6 24 24"
            class="h-5.5 w-5.5"
            fill="currentColor"
          ><path d="M12,1 L12,3 C12,3.55228475 11.5522847,4 11,4 C10.4477153,4 10,3.55228475 10,3 L10,2 L7,2 L7,10 L8,10 C8.55228475,10 9,10.4477153 9,11 C9,11.5522847 8.55228475,12 8,12 L4,12 C3.44771525,12 3,11.5522847 3,11 C3,10.4477153 3.44771525,10 4,10 L5,10 L5,2 L2,2 L2,3 C2,3.55228475 1.55228475,4 1,4 C0.44771525,4 0,3.55228475 0,3 L0,1 C0,0.44771525 0.44771525,0 1,0 L11,0 C11.5522847,0 12,0.44771525 12,1 Z" /></svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-8 -11 30 30"
            class="w-4 h-4 -ml-2 mt-1"
            fill="currentColor"
          ><path d="M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z" /></svg>
        </ToolBarGroupButton>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute mt-2 origin-top-right z-50 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div
          v-for="(button, index) in buttonGroup.buttons"
          :key="button.id"
        >
          <MenuItem @click="bmp[button.id].action(editor)">
            <div 
              :class="[
                index === 0 ? 'rounded-tl-md rounded-tr-md' : index === buttonGroup.buttons.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                determineActiveState(button.id) ? 'bg-black text-white' : ''
              ]"
              class="flex justify-between px-4 py-2 text-sm group hover:bg-black hover:text-white"
            >
              <div class="flex space-x-2">
                <I :icon="button.icon" />
                <span class="whitespace-nowrap">{{ button.desc }}</span>
              </div>
              <span 
                :class="determineActiveState(button.id) ? 'border-white' : 'border-black'"
                class="border px-1 py-0.25 rounded-sm ml-2 group-hover:border-white"
              >
                {{ isMac ? button.hotKey.replace('mod', '⌘') : button.hotKey.replace('mod', 'Ctrl') }}
              </span>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Buttons, Toolbar } from "../types"
import { Editor } from "@tiptap/vue-3"
import ToolBarGroupButton from "./ToolBarGroupButton.vue"
import { ButtonToActionMap as bmp } from "./data"
import { Icon as I } from "@shared/components/Icon"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import { computed, toRefs } from "vue"
const props = defineProps<{
    editor: Editor,
    buttonGroup: Toolbar,
  }>()
const {
	editor,
	buttonGroup
}  = toRefs(props)
const isMac = computed(() => window.navigator.userAgent.includes("Mac"))

const determineActiveState = (id: Buttons) => {
	if (typeof bmp[id]?.isActive === "function") {
		// Why is typescript forcing me to cast the type
		// when I am checking if the function is defined?
		return bmp[id]?.isActive ? (bmp[id].isActive as (editor: Editor) => boolean)(editor.value) : false
	}

	return false
}
</script>