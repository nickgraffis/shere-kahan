
<template>
  <div class="flex items-center justify-between p-2">
    <div class="flex space-x-2 flex-wrap">
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
            <div v-if="button.id === 'highlight'">
              <HighlightButton
                :desc="button.desc" 
                :hot-key="button.hotKey"
                :editor="editor"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-5 -5 34 34"
                  class="w-6 h-6"
                  fill="currentColor"
                ><path d="M8.038 11.06l-1.035 3.207 1.776 1.775 3.165-1.077-3.906-3.906zm1.24-1.59l4.242 4.243 6.364-6.364a2 2 0 0 0 0-2.829L18.47 3.106a2 2 0 0 0-2.829 0L9.277 9.47zm-3.503 6.4L3.88 17.765l1.653 1.151 1.644-1.644-1.402-1.402zM19.884 1.692l1.414 1.414a4 4 0 0 1 0 5.657l-7.778 7.778-4.22 1.437-3.536 3.535L.778 18.04l4.291-4.292L6.45 9.47l7.778-7.778a4 4 0 0 1 5.657 0z" /></svg>
              </HighlightButton>
            </div>
            <div v-else-if="button.id === 'color'">
              <TextColorButton
                :desc="button.desc" 
                :hot-key="button.hotKey"
                :editor="editor"
              >
                <div class="px-0.25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-6 -7.5 24 24"
                    class="h-5.5 w-5.5"
                    fill="currentColor"
                  ><path d="M6.327 6.99H2.672l-.477 1.306c-.191.524-.826.812-1.417.642-.59-.17-.915-.734-.723-1.258l2.304-6.312C2.743.32 4.011-.256 5.193.084 5.88.282 6.418.76 6.64 1.368L8.945 7.68c.191.524-.133 1.088-.724 1.258-.59.17-1.225-.118-1.417-.642l-.477-1.307zm-.729-1.998L4.5 1.984 3.4 4.992h2.197zM10 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></svg>
                  <div class="flex items-center w-fulls">
                    <div class="h-0.5 flex-grow bg-blue-400 rounded-tl-sm rounded-bl-sm" />
                    <div class="h-0.5 flex-grow bg-red-400" />
                    <div class="h-0.5 flex-grow bg-orange-400" />
                    <div class="h-0.5 flex-grow bg-green-400 rounded-tr-sm rounded-br-sm" />
                  </div>
                </div>
              </TextColorButton>
            </div>
            <div v-else-if="button.id === 'image'">
              <ImageButton
                :desc="button.desc" 
                :hot-key="button.hotKey"
                :editor="editor"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-6 -7 34 34"
                  class="w-6 h-6"
                  fill="currentColor"
                ><path d="M14.846 9.334l-3.985-6.762a1 1 0 0 0-1.723 0L7.11 6.015c.202 1.979.943 2.783 2.387 2.783 2.005 0 3.816.176 5.35.536zm1.555 2.637c-1.547-.767-3.977-1.173-6.905-1.173-1.819 0-3.11-.832-3.813-2.364l-3.57 6.058A1 1 0 0 0 2.975 16h14.05a1 1 0 0 0 .861-1.508l-1.485-2.52zM12.584 1.556l7.025 11.92A3 3 0 0 1 17.025 18H2.975A3 3 0 0 1 .39 13.477l7.025-11.92a3 3 0 0 1 5.17 0z" /></svg>
              </ImageButton>
            </div>
            <div v-else-if="button.id === 'link'">
              <LinkButton
                :desc="button.desc" 
                :hot-key="button.hotKey"
                :editor="editor"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-6 -7 34 34"
                  class="w-6 h-6"
                  fill="currentColor"
                ><path d="M3.19 9.345a.97.97 0 0 1 1.37 0 .966.966 0 0 1 0 1.367l-2.055 2.052a1.932 1.932 0 0 0 0 2.735 1.94 1.94 0 0 0 2.74 0l4.794-4.787a.966.966 0 0 0 0-1.367.966.966 0 0 1 0-1.368.97.97 0 0 1 1.37 0 2.898 2.898 0 0 1 0 4.103l-4.795 4.787a3.879 3.879 0 0 1-5.48 0 3.864 3.864 0 0 1 0-5.47L3.19 9.344zm11.62-.69a.97.97 0 0 1-1.37 0 .966.966 0 0 1 0-1.367l2.055-2.052a1.932 1.932 0 0 0 0-2.735 1.94 1.94 0 0 0-2.74 0L7.962 7.288a.966.966 0 0 0 0 1.367.966.966 0 0 1 0 1.368.97.97 0 0 1-1.37 0 2.898 2.898 0 0 1 0-4.103l4.795-4.787a3.879 3.879 0 0 1 5.48 0 3.864 3.864 0 0 1 0 5.47L14.81 8.656z" /></svg>
              </LinkButton>
            </div>
            <div v-else>
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
                icon: 'jam:more-horizontal'
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
  </div>
</template>

<script setup lang="ts">
import { Buttons, Toolbar } from "../types"
import { Editor } from "@tiptap/vue-3"
import ToolBarButton from "./ToolBarButton.vue"
import HighlightButton from "./HighlightButton.vue"
import TextColorButton from "./TextColorButton.vue"
import ToolBarDropDown from "./ToolBarDropDown.vue"
import ImageButton from "./ImageButton.vue"
import LinkButton from "./LinkButton.vue"
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