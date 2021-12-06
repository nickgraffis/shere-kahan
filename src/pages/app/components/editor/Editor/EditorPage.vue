<template>
  <!-- <ToolBar 
    :editor="editor"
    :toolbar="toolbarData"
    :saved="saved"
    /> -->
  <div v-if="editor"> 
    <div
      v-if="data && data.familyTree"
      class="flex space-x-2 p-2"
    >
      <div
        v-for="(item, index) in data.familyTree"
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
    <div class="flex-grow px-2">
      {{ status }}
      {{ provider?.roomName }}
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ToolBar from "./ToolBar/ToolBar.vue"
import { toolbarData } from "./ToolBar/data"
import { EditorContent} from "@tiptap/vue-3"
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

/* Placeholder (on every new line) */
.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}
</style>