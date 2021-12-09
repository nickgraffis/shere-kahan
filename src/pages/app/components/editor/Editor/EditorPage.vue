<template>
  <!-- <ToolBar 
    :editor="editor"
    :toolbar="toolbarData"
    :saved="saved"
    /> -->
  <div
    v-if="editor"
    class="h-full flex flex-col"
  > 
    <div
      v-if="data && data.familyTree"
      class="flex space-x-2 p-2"
    >
      <div
        v-for="(item, index) in data.familyTree"
        :key="index"
        class="flex space-x-2"
      >
        <span v-if="index !== data.familyTree.length - 1">{{ item.data.name }}</span> 
        <input 
          v-else 
          class="apperance-none" 
          :style="{ width: item.data.name.length * 9 + 'px' }"
          :value="item.data.name" 
        >
        <span v-if="index !== data.familyTree.length - 1">/</span>
      </div>
    </div>
    <div class="flex-grow px-2 flex flex-col">
      {{ editor.isActive('link') }}
      <bubble-menu
        v-if="editor"
        :should-show="() => editor.isActive('link')"
        :on-state-change="(e) => console.log(e)"
        plugin-key="links"
        class="bubble-menu"
        :tippy-options="{ animation: false }"
        :editor="editor"
      >
        {{ editor.getAttributes('link').href }}
      </bubble-menu>
      <bubble-menu
        v-if="editor"
        v-show="editor.isActive('figure') || editor.isActive('custom-image')"
        plugin-key="images"
        class="bubble-menu"
        :tippy-options="{ animation: false }"
        :editor="editor"
      >
        <button
          @click="editor.chain().focus().imageToFigure().run()"
        >
          Fig
        </button>
        <button
          :class="{
            'is-active': editor.isActive('custom-image', {
              size: 'small'
            })
          }"
          @click="
            editor
              .chain()
              .focus()
              .setImage({ size: 'small' })
              .run()
          "
        >
          Small
        </button>
        <button
          :class="{
            'is-active': editor.isActive('custom-image', {
              size: 'medium'
            })
          }"
          @click="
            editor
              .chain()
              .focus()
              .setImage({ size: 'medium' })
              .run()
          "
        >
          Medium
        </button>
        <button
          :class="{
            'is-active': editor.isActive('custom-image', {
              size: 'large'
            })
          }"
          @click="
            editor
              .chain()
              .focus()
              .setImage({ size: 'large' })
              .run()
          "
        >
          Large
        </button>
        <span style="color: #aaa">|</span>
        <button
          :class="{
            'is-active': editor.isActive('custom-image', {
              float: 'left'
            })
          }"
          @click="
            editor
              .chain()
              .focus()
              .setImage({ float: 'left' })
              .run()
          "
        >
          Left
        </button>
        <button
          :class="{
            'is-active': editor.isActive('custom-image', {
              float: 'none'
            })
          }"
          @click="
            editor
              .chain()
              .focus()
              .setImage({ float: 'none' })
              .run()
          "
        >
          No float
        </button>
        <button
          :class="{
            'is-active': editor.isActive('custom-image', {
              float: 'right'
            })
          }"
          @click="
            editor
              .chain()
              .focus()
              .setImage({ float: 'right' })
              .run()
          "
        >
          Right
        </button>
        <span style="color: #aaa">|</span>
        <button @click="addImage">
          Change
        </button>
      </bubble-menu>
      <EditorContent
        :editor="editor"
        class="flex-grow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ToolBar from "./ToolBar/ToolBar.vue"
import { toolbarData } from "./ToolBar/data"
import { EditorContent } from "@tiptap/vue-3"
import { BubbleMenu } from "./BubbleMenu/BubbleMenu"
import { fromBase64, toBase64 } from "@aws-sdk/util-base64-browser"
import CharacterCount from "@tiptap/extension-character-count"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Highlight from "@tiptap/extension-highlight"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import StarterKit from "@tiptap/starter-kit"
import { Editor } from "@tiptap/vue-3"
import { useEditor } from "@hooks/useEditor"
import { tryOnUnmounted } from "@vueuse/core"
import { ref, reactive, provide, Ref, watch } from "vue"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebrtcProvider } from "y-webrtc"
import { currentDocument, useUpdateDocument } from "@hooks/useDocuments"
import { useToken } from "@hooks/useTokens"
import { Collaboration } from "./Collaboration"
import { CollaborationCursor } from "./CollaborationCursor"
import lowlight from "lowlight"
import quotes from "./quotes.json"
import * as Y from "yjs"
import useTest from "@hooks/useTest"
const { increment } = useTest()
const { data } = defineProps({
	data: {
		type: Object,
		required: true,
	}
})

const { editor, status, provider, setEditor } = useEditor()
const shouldShow = ({editor: e}) => { 
	console.log(editor.value?.isActive("custom-image") || false)
	return editor.value?.isActive("custom-image") || editor.value?.isActive("figure")
}

// console.log('NEW EDITOR', data)

// const getRandomElement = (list: any[]) => {
//   return list[Math.floor(Math.random() * list.length)]
// }

// const getRandomColor = () => {
//   return getRandomElement([
//     '#958DF1',
//     '#F98181',
//     '#FBBC88',
//     '#FAF594',
//     '#70CFF8',
//     '#94FADB',
//     '#B9F18D',
//   ])
// }
// const { data: account } = useToken()

// const currentUser = ref({
//   name: account.value ? account.value?.account.data.name : 'Anonymous',
//   color: getRandomColor(),
//   id: account.value ? account.value?.account.ref['@ref'].id : 'Anonymous',
// })
// const status = ref('connecting')
// const saved = ref(false)
// const selectedText = ref('')
// const selectedCount = ref(0)
// const from = ref(0)
// const to = ref(0)
// const count = ref('characters')
// const autoSaving = ref<number | null>(null)

// const updateSelection = ({ editor }: { editor: any }) => {
//   to.value = editor.view.state.selection.ranges[0].$to.pos
//   from.value = editor.view.state.selection.ranges[0].$from.pos
//   selectedCount.value = to.value - from.value
//   selectedText.value = editor.view.state.doc.textBetween(from.value, to.value, ' ')
// }

// const updateDocument = useUpdateDocument()
// const testContent = ref<any>(null)
// const testContent2 = ref<any>(null)
// const ydoc = new Y.Doc()
// console.log(data.data.conent)
// if (data.data.content) {
//   Y.applyUpdate(ydoc, fromBase64(data.data.content)) 
//   console.log('YJS', ydoc)
//   testContent.value = ydoc.get('content')
//   testContent2.value = fromBase64(data.data.content)
// }
// console.log(data.ref.id)
// const provider = new WebrtcProvider(data.ref.id, ydoc)
// console.log(provider)
// const indexddb = new IndexeddbPersistence(reactive(data)?.ref.id, ydoc)
// indexddb.on('synced', () => {
//   console.log('INDEXDDB SYNCED')
// })
// provider.on('destroy', () => {
//    console.log('PROVIDER DESTROYED')
// })
// provider.on('connected', () => {
//    console.log('PROVIDER CONNECTED')
// })
// ydoc.on('destroy', () => {
//   console.log('DOCUMENT DESTORYED')
// })
// watch(currentDocument, (old, newDoc) => {
//   console.log('NEW DOCUMENT', old, newDoc)
//   provider?.destroy()
//   // ydoc?.destroy()
// })
// ydoc.on('update', (update: any) => { 
//   if (saved.value) saved.value = false
//     else {
//       if (autoSaving.value) clearTimeout(autoSaving.value)
//       autoSaving.value = setTimeout(() => {
//         saved.value = true
//         updateDocument.mutate({ 
//           id: reactive(data)?.ref.id, 
//           content: toBase64(Y.encodeStateAsUpdate(ydoc)) ,
//           lastUpdated: {
//             at: new Date().toISOString(),
//             by: {
//               name: currentUser.value.name,
//               id: currentUser.value.id,
//             }
//           } 
//         })
//       }, 5000)
//     }
// }) 

// provider.on('update', (update) => {
//   console.log('UPDATE', update)
// })

// setEditor({
//   editorProps: {
//     attributes: {
//       class: 'w-full h-full focus:outline-none py-4',
//     },
//   },
//   onUpdate: () => {
    
//   },
//   onSelectionUpdate: (state) => {
//     updateSelection(state as { editor: Editor, transaction: any })
//   },
//   onBlur: ({ editor }) => {
//     editor.commands.setHighlight({ color: '#c7d2fe' })
//   },
//   onFocus: ({ editor }) => {
//     editor.commands.unsetHighlight()
//   },
//   extensions: [
//     CodeBlockLowlight.configure({
//       lowlight,
//     }),
//     StarterKit.configure({
//       codeBlock: false,
//       history: false
//     }),
//     Placeholder.configure({
//       placeholder: ({ node }) => {
//         return getRandomElement(quotes)
//       },
//     }),
//     Highlight.configure({ multicolor: true }),
//     Typography,
//     HorizontalRule,
//     TaskList,
//     Underline,
//     Link,
//     CharacterCount,
//     TaskItem.configure({
//       nested: true,
//     }),
//     TextAlign.configure({
//       types: ['heading', 'paragraph'],
//     }),
//     Collaboration.configure({
//       document: ydoc,
//     }),
//     CollaborationCursor.configure({
//       provider: provider,
//       user: currentUser.value,
//     }),
//   ]
// })
setEditor(data)
console.log("EDITOR DATa", data)
console.log(editor.value)

tryOnUnmounted(() => {
	// ydoc.destroy()
	// editor.value?.destroy()
	// editor.value?.commands.blur()
	// indexddb.destroy()
	console.log("UNMOUNTED", provider.value)
})
</script>

<style lang="css" scoped>
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0D0D0D;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}

/* width */
.editor::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.editor::-webkit-scrollbar-track {
  @apply bg-gray-300;
}
 
/* Handle */
.editor::-webkit-scrollbar-thumb {
  @apply bg-gray-600;
}

/* Handle on hover */
.editor::-webkit-scrollbar-thumb:hover {
  @apply bg-black;
}
::v-deep ul[data-type="taskList"] {
	list-style: none;
	padding: 0;
}
::v-deep ul[data-type="taskList"] p {
	margin: 0;
}
::v-deep ul[data-type="taskList"] li {
	display: flex;
}
::v-deep ul[data-type="taskList"] li > label {
	flex: 0 0 auto;
	margin-right: 0.5rem;
	user-select: none;
}
::v-deep ul[data-type="taskList"] li > div {
	flex: 1 1 auto;
}
::v-deep .prose > ul > li > *:first-child {
  margin-top: 0;
 }

 ::v-deep .prose > ul[data-type="taskList"] > li::before {
   visibility: hidden;
 }

  ::v-deep .prose > ul[data-type="taskList"] li::before {
   visibility: hidden;
 }

 ::v-deep .mention {
  border: 1px solid #000;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
  box-decoration-break: clone;
}
::v-deep hr.ProseMirror-selectednode {
  border-top: 1px solid #68CEF8;
}

::v-deep hr {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}

::v-deep mark {
  background-color: #ffe066;
  padding: 0.125em;
  border-radius: 0.25em;
  box-decoration-break: clone;
}

::v-deep img {
	 width: 100%;
	 height: auto;
	 display: block;
	 margin-left: auto;
	 margin-right: auto;
}
 ::v-deep img.ProseMirror-selectednode {
	 outline: 3px solid #68cef8;
}
 ::v-deep .custom-image-small {
	 max-width: 200px;
}
 ::v-deep .custom-image-medium {
	 max-width: 500px;
}
 ::v-deep .custom-image-large {
	 max-width: 100%;
}
 ::v-deep .custom-image-float-none {
	 float: none;
}
 ::v-deep .custom-image-float-left {
	 float: left;
}
 ::v-deep .custom-image-float-right {
	 float: right;
}

::v-deep .has-focus {
  outline: 3px solid #68cef8;
}
</style>