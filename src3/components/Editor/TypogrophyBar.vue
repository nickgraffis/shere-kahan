<template>
  <div v-if="editor" class="w-full flex space-x-2 flex-wrap">
    <div v-for="buttonGroup in toolbar.sort((a, b) => a.order - b.order)" :key="buttonGroup.order">
      <div class="flex space-x-1 items-center border-r-2 border-gray-300 px-1">
        <div v-for="button in buttonGroup.buttons" :key="button.id">
          <TypogrophyButton 
          @click="button.action(editor)"
          :isActive="button.isActive ? button.isActive(editor) : false"
          :desc="button.desc"
          :hotKey="button.hotKey"
          >
            <component :is="button.icon" />
          </TypogrophyButton>
        </div>
      </div>
    </div>
    <button @click="editor?.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      <div class="flex space-x-1">
        <div class="flex items-center flex-col">
          <ri:text />
          <div class="flex w-full">
            <div class="w-1/4 h-0.75 bg-red-500 rounded-tl-full rounded-bl-full"></div>
            <div class="w-1/4 h-0.75 bg-green-500"></div>
            <div class="w-1/4 h-0.75 bg-orange-500"></div>
            <div class="w-1/4 h-0.75 bg-cyan-500 rounded-tr-full rounded-br-full"></div>
          </div>
        </div>
        <eva:arrow-ios-downward-fill />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { Editor } from "@tiptap/vue-3";
  import { ref } from "@vue/reactivity";
  import TypogrophyButton from "./TypogrophyButton.vue";
  import redo from '~icons/ri/arrow-go-forward-fill'
  import undo from '~icons/ri/arrow-go-back-fill'
  import bold from '~icons/ri/bold'
  import italic from '~icons/ri/italic'
  import underline from '~icons/ri/underline'
  import strike from '~icons/ri/strikethrough'
  import alignLeft from '~icons/ri/align-left'
  import alignRight from '~icons/ri/align-right'
  import alignCenter from '~icons/ri/align-center'
  import alignJustify from '~icons/ri/align-justify'
  import listUnordered from '~icons/ri/list-unordered'
  import listOrdered from '~icons/ri/list-ordered'
  import task from '~icons/ri/task-fill'
  import links from '~icons/ri/links-fill'
  import image from '~icons/ri/image-2-fill'
  import emoji from '~icons/ri/emotion-happy-line'
  import table from '~icons/ri/table-2'
  import column from '~icons/ri/layout-column-line'
  import pre from '~icons/ri/code-view'
  import terminal from '~icons/ri/terminal-box-fill'
  import code from '~icons/ri/code-s-slash-fill'

  import { shallowRef } from "vue";
  const { editor } = defineProps<{ editor: Editor }>()
  export type Button = {
    id: string
    icon: any,
    action: (editor: Editor) => void
    isActive?: (editor: Editor) => boolean,
    desc: string,
    hotKey: string,
  }

  export type ButtonGroup = {
    order: number,
    group: string,
    buttons: Button[]
  }

  const toolbar = ref<ButtonGroup[]>(
    [
      {
        order: 0,
        group: "oops",
        buttons: [
          {
            id: 'undo',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(undo),
            action: (editor) => editor.chain().undo().run()
          },
          {
            id: 'redo',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(redo),
            action: (editor) => editor.chain().redo().run()
          }
        ]
      },
      {
        order: 3,
        group: 'marks',
        buttons: [
          {
            id: 'bold',
            desc: 'Undo',
            hotKey: 'mod + Z',
            icon: shallowRef(bold),
            action: (editor) => editor.chain().focus().toggleBold().run(),
            isActive: (editor) => editor.isActive('bold')
          },
          {
            id: 'italic',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(italic),
            action: (editor) => editor.chain().focus().toggleItalic().run(),
            isActive: (editor) => editor.isActive('italic')
          },
          {
            id: 'underline',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(underline),
            action: () => editor.chain().focus().toggleUnderline().run(),
            isActive: (editor) => editor.isActive('underline')
          },
          {
            id: 'strike',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(strike),
            action: (editor) => editor.chain().focus().toggleStrike().run(),
            isActive: (editor) => editor.isActive('strike')
          },
          {
            id: 'code',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(code),
            action: (editor) => editor.chain().focus().toggleCode().run(),
            isActive: (editor) => editor.isActive('code')
          }
        ]
      },
      {
        order: 4,
        group: 'alignment',
        buttons: [
          {
            id: 'align-left',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(alignLeft),
            action: (editor) => editor.chain().focus().setTextAlign('left').run(),
            isActive: (editor) => editor.isActive({ textAlign: 'left' })
          },
          {
            id: 'align-right',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(alignRight),
            action: (editor) => editor.chain().focus().setTextAlign('right').run(),
            isActive: (editor) => editor.isActive({ textAlign: 'right' })
          },
          {
            id: 'align-center',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(alignCenter),
            action: (editor) => editor.chain().focus().setTextAlign('center').run(),
            isActive: (editor) => editor.isActive({ textAlign: 'center' })
          },
          {
            id: 'align-justify',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(alignJustify),
            action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
            isActive: (editor) => editor.isActive({ textAlign: 'justify' })
          }
        ]
      },
      {
        order: 5,
        group: 'lists',
        buttons: [
          {
            id: 'list-unordered',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(listUnordered),
            action: (editor) => editor.chain().focus().toggleBulletList().run(),
            isActive: (editor) => editor.isActive('bulletList')
          },
          {
            id: 'list-ordered',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(listOrdered),
            action: (editor) => editor.chain().focus().toggleOrderedList().run(),
            isActive: (editor) => editor.isActive('orderedList')
          },
          {
            id: 'task',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(task),
            action: (editor) => editor.chain().focus().toggleTaskList().run(),
            isActive: (editor) => editor.isActive('taskList')
          }
        ]
      },
      {
        order: 6,
        group: 'other',
        buttons: [
          {
            id: 'links',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(links),
            action: (editor) => false,
            isActive: (editor) => editor.isActive('link')
          },
          {
            id: 'image',
            desc: 'Undo',
            hotKey: 'mod+z',
            icon: shallowRef(image),
            action: (editor) => false,
            isActive: (editor) => editor.isActive('link')
          }
        ]
      }
    ]
  )

</script>