
<template>
  <div v-if="editor" class="w-full flex items-center justify-between">
    <div class="w-full flex space-x-2 flex-wrap">
      <div v-for="(buttonGroup, index) in toolbar" :key="buttonGroup.id">
        <div 
        v-if="buttonGroup.expanded"
        :class="index === 0 ? 'pr-1' : 'px-1'"
        class="flex space-x-1 items-center border-r-2 border-gray-300"
        >
          <div 
          v-for="button in buttonGroup.buttons.filter(button => button.expanded)" 
          :key="button.id"
          >
            <ToolBarButton 
            @click="bmp[button.id].action(editor)"
            :isActive="determineActiveState(button.id)"
            :desc="button.desc"
            :hotKey="button.hotKey"
            >
              <I :icon="button.icon" />
            </ToolBarButton>
          </div>
          <div 
          v-if="buttonGroup.buttons.filter(button => !button.expanded).length"
          >
            <ToolBarDropDown :editor="editor" :button-group="{
              id: buttonGroup.id,
              buttons: buttonGroup.buttons.filter(button => !button.expanded),
              desc: 'More',
              icon: 'ri:more-fill'
            }" />
          </div>
        </div>
        <div v-else class="flex space-x-1 items-center border-r-2 border-gray-300 pr-2">
          <ToolBarDropDown :editor="editor" :button-group="buttonGroup" />
        </div>
      </div>
      <div v-if="editor.storage.collaborationCursor" class="flex">
        <div v-for="user in editor.storage.collaborationCursor.users">
          <div class="ring-5 ring-white w-8 h-8 rounded-full" :style="{ backgroundColor: user.color }">

          </div>
        </div>
      </div>
    </div>
    <div 
    :class="saved ? 'bg-green-500' : 'bg-rose-500'"
    class="w-3 h-3 animate-pulse rounded-full"></div>
  </div>
</template>

<script setup lang="ts">
  import { Buttons, Toolbar } from '../types';
  import { Editor } from "@tiptap/vue-3";
  import ToolBarButton from './ToolBarButton.vue';
  import ToolBarDropDown from './ToolBarDropDown.vue';
  import { ButtonToActionMap as bmp } from './data';
  import { Icon as I } from '../../Components/Icon';
  import { computed } from 'vue';
  const {
    editor,
    toolbar,
    saved
  } = defineProps<{
    editor: Editor,
    toolbar: Toolbar[],
    saved: boolean
  }>()
  const isMac = computed(() => window.navigator.userAgent.includes('Mac'))
  console.log(editor)
  const determineActiveState = (id: Buttons) => {
    if (typeof bmp[id].isActive === 'function') {
      // Why is typescript forcing me to cast the type
      // when I am checking if the function is defined?
      return (bmp[id].isActive as (editor: Editor) => boolean)(editor)
    }

    return false
  }
</script>