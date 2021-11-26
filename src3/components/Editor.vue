<template>
  <Loading v-if="loading" />
  <div v-if="!loading" class="w-full flex-grow flex flex-col">
    <bubble-menu
    v-if="editor && linking"
    :editor="editor"
    :onHide="hide"
    >
      <input ref="linkInput" class="bg-blue-500" />
    </bubble-menu>
    <bubble-menu
    class="flex text-white justify-center bg-blue-gray-800 rounded-md p-2"
    :editor="editor"
    v-if="editor && !linking"
    :onHide="hide"
    >
      <div class="space-x-4 flex">
        <div class="space-x-3 flex pr-2 border-r border-blue-gray-300">
          <TypogrophyButton 
            @click="editor.chain().focus().toggleBold().run()"
            :isActive="editor.isActive('bold')"
            className="hover:bg-blue-gray-300 hover:text-black active: bg-blue-gray-300 text-black"
            >
              <ri:bold />
          </TypogrophyButton>
          <TypogrophyButton 
            @click="editor.chain().focus().toggleStrike().run()"
            :isActive="editor.isActive('strike')"
            className="hover:bg-blue-gray-300 hover:text-black active: bg-blue-gray-300 text-black"
            >
              <ri:strikethrough />
          </TypogrophyButton>
        </div>
        <div class="space-x-3 flex pr-2 border-r border-blue-gray-300">
          <TypogrophyButton 
            @click="startLinking()"
            :isActive="editor.isActive('link')"
            className="hover:bg-blue-gray-300 hover:text-black active: bg-blue-gray-300 text-black"
            >
              <ri:links-fill />
          </TypogrophyButton>
        </div>
      </div>
    </bubble-menu>
    <floating-menu
      class="px-4 py-2 space-x-4"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        Bullet List
      </button>
      <button @click="test('woah world', 4)">
        Woah
      </button>
    </floating-menu>
    <BaseEditor />
  </div>
</template>

<script setup lang="ts">
import TypographyBar from './Editor/TypogrophyBar.vue'
import { BaseEditor } from '../../src2/Editor/BaseEditor'
import { 
  Editor,
  useEditor, 
  EditorContent,
  FloatingMenu, 
} from '@tiptap/vue-3'
import { BubbleMenu } from '../../src2/Editor/BubbleMenu/BubbleMenu'
import Loading from './Loading.vue'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import { BubbleCustMenuPlugin } from './CustomBubbleMenu'
import { CustomBubbleMenu } from './CustomMenuComp'
import { Extension } from '@tiptap/core'
import SelectPlugin from './SelectPlugin'
import { defineComponent, h, onBeforeUnmount, onMounted, PropType, ref, Ref, unref, VNode } from 'vue'
import { onClickOutside, onKeyStroke, tryOnMounted } from '@vueuse/core'
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const CustomDocument = Document.extend({
  content: 'taskList',
})
const CustomTaskItem = TaskItem.extend({
  content: 'inline*',
})
const linkInput = ref<HTMLInputElement>()
const startLinking = () => {
  linking.value = true;
  setTimeout(() => {
    linkInput.value?.focus() 
  }, 100)
}
const hide = () => {
  console.log('hiding')
  linking.value = false;
  editor.value.chain().focus().setTextSelection({
    from: editor.value.view.state.selection.ranges[0].$from.pos,
    to: editor.value.view.state.selection.ranges[0].$to.pos,
  }).toggleHighlight({ color: '#c7d2fe' }).run()
}


const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'w-full h-full focus:outline-none py-4',
    },
  },
  extensions: [
    CustomDocument,
    StarterKit,
    Highlight.configure({ multicolor: true }),
    Typography,
    TaskList,
    Link,
    TaskItem.configure({
      nested: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  content: `<p>
          This is still the text editor you’re used to, but enriched with node views.

        <p>
          Did you see that? That’s a Vue component. We are really living in the future.
        </p>`,
})
const linking = ref(false)

const linkConfirm = ref<HTMLElement>()
  const createLink = () => {
    linking.value = true
    setTimeout(() => {
      linkInput.value?.focus() 
    }, 0)
  }

  onKeyStroke('Enter', (e) => {
    addLink()
  }, { target: linkInput.value })
  
  onClickOutside(linkInput, (event) => {
    if (event.target !== linkConfirm.value) {
      linking.value = false
    }
  })

const addLink = () => {
  editor.value
  .chain()
  .focus()
  .extendMarkRange('link')
  .setLink({ href: linkInput.value?.value || '' })
  .run()

  linking.value = false
}

  const loading = ref(false)
  const insertText = (text) => unref(editor).commands.insertContent(text);
  // sleep(2000).then(() => {
  //   loading.value = false
  //   insertText('<vue-component count="0"></vue-component>')
  // })

  const test = (content, iterations) => {
    unref(editor).commands.setTextSelection({ from: 5, to: 10 })
    unref(editor).commands.insertContent(content)
    // unref(editor).commands.forEach(Array(iterations).fill(content), (item, { commands }) => {
    //   console.log(item)
    //   return commands.insertContent(item)
    // })
  }
</script>

<style lang="css">
  .ProseMirror ::selection {
    @apply bg-indigo-200;
  }

  .ProseMirror pre {
    @apply bg-blue-gray-800 rounded-sm p-2;
  }

  .ProseMirror {
    @apply caret-indigo-200;
  }
  ul[data-type="taskList"] {
	 list-style: none;
	 padding: 0;
  }
  ul[data-type="taskList"] p {
    margin: 0;
  }
  ul[data-type="taskList"] li {
    display: flex;
  }
  ul[data-type="taskList"] li > label {
    flex: 0 0 auto;
    margin-right: 0.5rem;
    user-select: none;
  }
  ul[data-type="taskList"] li > div {
    flex: 1 1 auto;
  }
 

  /* Dracula Theme v1.2.5
 *
 * https://github.com/dracula/highlightjs
 *
 * Copyright 2016-present, All rights reserved
 *
 * Code licensed under the MIT license
 *
 * @author Denis Ciccale <dciccale@gmail.com>
 * @author Zeno Rocha <hi@zenorocha.com>
 */

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #282a36;
}

.hljs-built_in,
.hljs-selector-tag,
.hljs-section,
.hljs-link {
  color: #8be9fd;
}

.hljs-keyword {
  color: #ff79c6;
}

.hljs,
.hljs-subst {
  color: #f8f8f2;
}

.hljs-title,
.hljs-attr,
.hljs-meta-keyword {
  font-style: italic;
  color: #50fa7b;
}

.hljs-string,
.hljs-meta,
.hljs-name,
.hljs-type,
.hljs-symbol,
.hljs-bullet,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #f1fa8c;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion {
  color: #6272a4;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-title,
.hljs-section,
.hljs-doctag,
.hljs-type,
.hljs-name,
.hljs-strong {
  font-weight: bold;
}

.hljs-literal,
.hljs-number {
  color: #bd93f9;
}

.hljs-emphasis {
  font-style: italic;
}


</style>