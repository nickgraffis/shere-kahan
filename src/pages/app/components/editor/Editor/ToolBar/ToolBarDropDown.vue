
<template>
  <Menu as="div" class="relative inline-block text-left focus:outline-none active:outline-none ">
    <div>
      <MenuButton
      class="focus:outline-none active:outline-none hover:bg-indigo-400 hover:text-white p-2 rounded-md"
      >
        <ToolBarGroupButton :desc="buttonGroup.desc">
          <I :icon="buttonGroup.icon" />
          <I icon="ri:arrow-drop-down-line" />
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
        <div v-for="(button, index) in buttonGroup.buttons" :key="button.id">
          <MenuItem @click="bmp[button.id].action(editor)">
            <div 
            :class="index === 0 ? 'rounded-tl-md rounded-tr-md' : index === buttonGroup.buttons.length - 1 ? 'rounded-bl-md rounded-br-md' : ''"
            class="flex justify-between px-4 py-2 text-sm group hover:bg-indigo-400 hover:text-white">
              <div class="flex space-x-2">
                <I :icon="button.icon" />
                <span class="whitespace-nowrap">{{button.desc}}</span>
              </div>
              <span class="border px-1 py-0.25 rounded-sm ml-2 border-blue-gray-600 group-hover:border-white">
                {{isMac ? button.hotKey.replace('mod', '⌘') : button.hotKey.replace('mod', 'Ctrl')}}
              </span>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
  import { Buttons, Toolbar } from '../types';
  import { Editor } from "@tiptap/vue-3";
  import ToolBarGroupButton from './ToolBarGroupButton.vue';
  import { ButtonToActionMap as bmp } from './data';
  import { Icon as I } from '@shared/components/Icon';
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { computed } from 'vue';
  const {
    editor,
    buttonGroup
  } = defineProps<{
    editor: Editor,
    buttonGroup: Toolbar,
  }>()
  const isMac = computed(() => window.navigator.userAgent.includes('Mac'))

  const determineActiveState = (id: Buttons) => {
    if (typeof bmp[id]?.isActive === 'function') {
      // Why is typescript forcing me to cast the type
      // when I am checking if the function is defined?
      return bmp[id]?.isActive ? (bmp[id].isActive as (editor: Editor) => boolean)(editor) : false
    }

    return false
  }
</script>