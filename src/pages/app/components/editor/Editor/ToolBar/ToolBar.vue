
<template>
  <div class="w-full flex items-center justify-between p-2">
    <div class="w-full flex space-x-2 flex-wrap">
      <div
        v-for="(buttonGroup, index) in toolbar"
        :key="buttonGroup.id"
      >
        <div 
          v-if="!buttonGroup.nested && !buttonGroup.hidden && buttonGroup.import"
          :class="index === 0 ? 'pr-1' : 'px-1'"
          class="flex space-x-1 items-center border-r-2 border-gray-300"
        >
          <div 
            v-for="button in buttonGroup.buttons.filter(button => !button.nest && !button.hide && button.import)" 
            :key="button.id"
          >
            <ToolBarButton 
              :is-active="determineActiveState(button.id)"
              :desc="button.desc" 
              :hot-key="button.hotKey"
              :editor="editor"
              @click="bmp[button.id].action(editor)"
            >
              <I :icon="button.icon" />
            </ToolBarButton>
          </div>
          <div 
            v-if="buttonGroup.buttons.filter(button => button.nest).length"
          >
            <ToolBarDropDown
              :editor="editor"
              :button-group="{
                id: buttonGroup.id,
                buttons: buttonGroup.buttons.filter(button => button.nest),
                desc: 'More',
                icon: 'ri:more-fill'
              }"
            />
          </div>
        </div>
        <div
          v-else
          class="flex space-x-1 items-center border-r-2 border-gray-300 pr-2"
        >
          <ToolBarDropDown
            :editor="editor"
            :button-group="buttonGroup"
          />
        </div>
      </div>
      <div
        v-if="editor?.storage?.collaborationCursor"
        class="flex items-center"
      >
        <div v-for="user in editor?.storage?.collaborationCursor.users">
          <div class="relative">
            <img
              :style="{ borderColor: user.color}"
              class="w-8 h-8 border-3 rounded-full ring-4 ring-white"
              :src="`
              https://bavel-avatar.netlify.app/api/hello-world?seed=
            ${user.id}
            `"  
            >
            <div
              class="-bottom-1 z-30 -right-0.75 absolute h-4 w-4 flex items-center justify-center rounded-md font-semibold text-[12px]"
              :style="{backgroundColor: user.color}"
            >
              {{ user.name.substring(0, 1) }}
            </div>
          </div>
        </div>
        <div class="relative z-50 inline-block text-left">
          <Menu>
            <MenuButton
              ref="trigger"
            >
              <div class="w-5 relative z-30 h-5 flex items-center justify-center text-white bg-black rounded-full ring-4 ring-white">
                <ri:add-line class="w-4 h-4 rounded-full" />
              </div>
            </MenuButton>
            <div
              ref="container"
              class="w-56"
            >
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="z-50 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div>
                    <MenuItem>
                      <p>test</p>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </div>
          </Menu>
        </div>
      </div>
    </div>
    <div 
      :class="saved ? 'bg-green-500' : 'bg-rose-500'"
      class="py-1 px-2 text-white rounded-lg cursor-pointer text-xs font-semibold whitespace-nowrap"
    >
      {{ saved ? saved !== 'mounting' ? 'Saved' : 'Loading' : 'Save' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Buttons, Toolbar } from "../types"
import { Editor } from "@tiptap/vue-3"
import ToolBarButton from "./ToolBarButton.vue"
import ToolBarDropDown from "./ToolBarDropDown.vue"
import { ButtonToActionMap as bmp } from "./data"
import { Icon as I } from "@shared/components/Icon"
import { computed } from "vue"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import { usePopper } from "@hooks/usePopper"
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}

let [trigger, container] = usePopper({
	placement: "bottom-end",
	strategy: "fixed",
	modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
})
function resolveClass({ active, disabled }: { active: boolean; disabled: string }) {
	return classNames(
		"flex justify-between w-full px-4 py-2 text-sm leading-5 text-left",
		active ? "bg-gray-100 text-gray-900" : "text-gray-700",
		disabled && "cursor-not-allowed opacity-50"
	)
}
const {
	toolbar,
	saved
} = defineProps<{
    toolbar: Toolbar[],
    saved: boolean | string
  }>()
const isMac = computed(() => window.navigator.userAgent.includes("Mac"))
import { useEditor } from "@hooks/useEditor"
import useTest from "@hooks/useTest"
const { state } = useTest()
import { reactive } from "vue"
const { editor, loading } =  useEditor()
//test
console.log("EDITOR FROM TOOLBAR", editor)
const determineActiveState = (id: Buttons) => {
	if (typeof bmp[id]?.isActive === "function") {
		// Why is typescript forcing me to cast the type
		// when I am checking if the function is defined?
		return bmp[id]?.isActive ? (bmp[id].isActive as (editor: Editor) => boolean)(editor.value) : false
	}

	return false
}
</script>