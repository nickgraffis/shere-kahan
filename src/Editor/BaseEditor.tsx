import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/vue-3";
import { defineAsyncComponent, defineComponent, Ref, ref } from "vue";
import { EditorContent } from "@tiptap/vue-3"
import { BubbleMenu } from "./BubbleMenu";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import lowlight from 'lowlight'
import Underline from "@tiptap/extension-underline";
import { toolbarData } from "./ToolBar/data";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { Collaboration } from './Collaboration'
import { CollaborationCursor } from './CollaborationCursor'
import { WebrtcProvider } from 'y-webrtc'

const getRandomElement = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)]
}

export const BaseEditor = defineComponent({
  props: {
    document: {}
  },
  data(): {
    editor: Ref<Editor> | null,
    provider: WebrtcProvider | null,
    indexdb: IndexeddbPersistence | null,
    room: number,
    currentUser: {
      name: string,
      color: string
    },
    status: string,
    saved: boolean,
    selectedText: string,
    selectedCount: number,
    from: number,
    to: number,
    count: string,
    autosaving: ReturnType<typeof setInterval> | null,
  } {
    return {
      provider: null,
      indexdb: null,
      room: 1,
      currentUser: {
        name: 'Nick',
        color: this.getRandomColor(),
      },
      status: 'connecting',
      saved: false,
      selectedText: '',
      selectedCount: 0,
      from: 0,
      to: 0,
      count: 'characters',
      editor: null,
      autosaving: null,
    }
  },
  components: {
    toolbar: defineAsyncComponent(() =>
      import('./ToolBar/ToolBar.vue')
    ),
  },
  methods: {
    updateSelection({ editor }: { editor: Editor }) {
      this.to = editor.view.state.selection.ranges[0].$to.pos
      this.from = editor.view.state.selection.ranges[0].$from.pos
      this.selectedCount = this.to - this.from
      this.selectedText = editor.view.state.doc.textBetween(this.from, this.to, ' ')
    },
    getRandomColor() {
      return getRandomElement([
        '#958DF1',
        '#F98181',
        '#FBBC88',
        '#FAF594',
        '#70CFF8',
        '#94FADB',
        '#B9F18D',
      ])
    },
    autoSave() {
      this.autosaving = setInterval(() => {
        if (!this.saved) {
          this.saved = true
          console.log('saving', this.editor?.view.state.doc.toJSON())
        }
      }, 3000)
    },
    getDocument() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            id: 'jf80a84hnifadsfdaoiabnv'
          })
        }, 1)
      })
    }
  },
  mounted() {
    const id = 'jfkda;ghda'
    const ydoc = new Y.Doc()
    const provider = new WebrtcProvider(id, ydoc)
    this. provider = provider
    this.indexdb = new IndexeddbPersistence(id, ydoc)
    console.log(this.indexdb)
    const editor = new Editor({
      editorProps: {
        attributes: {
          class: 'w-full h-full focus:outline-none py-4',
        },
      },
      onUpdate: () => {
        if (this.saved) this.saved = false
        console.log(this.editor?.storage)
      },
      onSelectionUpdate: (state) => {
        this.updateSelection(state as { editor: Editor, transaction: any })
      },
      onBlur: ({ editor }) => {
        editor.commands.setHighlight({ color: '#c7d2fe' })
      },
      onFocus: ({ editor }) => {
        editor.commands.unsetHighlight()
      },
      content: '<CodeMirrior />',
      extensions: [
        CodeBlockLowlight.configure({
          lowlight,
        }),
        StarterKit.configure({
          codeBlock: false,
          history: false,
        }),
        Highlight.configure({ multicolor: true }),
        Typography,
        HorizontalRule,
        TaskList,
        Underline,
        Link,
        CharacterCount,
        TaskItem.configure({
          nested: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
      ]
    })
    this.editor = ref(editor as any)
    this.autoSave()
  },
  render() {
    return (<>
      { this.editor && this.provider && 
        <div class="relative h-full">
          <toolbar 
          editor={this.editor} 
          toolbar={toolbarData} 
          saved={this.saved}
          />
          <BubbleMenu editor={this.editor} />
          <EditorContent editor={this.editor} />
          <div onClick={() => this.count = this.count === 'characters' ? 'words' : 'characters'} class="flex text-sm font-semibold absolute bottom-4 right-1/2 bg-blue-gray-800 text-white px-4 py-2 rounded-full">
            {
              this.count === 'characters' ?
                this.selectedCount > 0 ? this.selectedCount : this.editor.getCharacterCount() :
                this.selectedCount > 0 ? 
                  this.selectedText.split(/(\s+)/).map(w => w.trim()).filter(Boolean).length : 
                  this.editor.getText().split(/(\s+)/).map(w => w.trim()).filter(Boolean).length
            } { this.count }
          </div>
        </div>
      }
    </>)
  }
})