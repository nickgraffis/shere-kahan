import { Editor } from "@tiptap/core/dist/packages/core/src/Editor"
import { Buttons, ButtonToAction, Toolbar } from "../types.d"

export const ButtonToActionMap: ButtonToAction = {
  undo: {
    action: (editor) => editor.chain().undo().run()
  },
  redo: {
    action: (editor) => editor.chain().redo().run()
  },
  bold: {
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
  },
  italic: {
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
  },
  underline: {
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('underline'),
  },
  strikethrough: {
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
  },
  code: {
    action: (editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor) => editor.isActive('code'),
  },
  'align-left': {
    action: (editor) => editor.chain().focus().setTextAlign('left').run(),
    isActive: (editor) => editor.isActive('align', 'left'),
  },
  'align-center': {
    action: (editor) => editor.chain().focus().setTextAlign('center').run(),
    isActive: (editor) => editor.isActive('align', 'center'),
  },
  'align-right': {
    action: (editor) => editor.chain().focus().setTextAlign('right').run(),
    isActive: (editor) => editor.isActive('align', 'right'),
  },
  'align-justify': {
    action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
    isActive: (editor) => editor.isActive('align', 'justify'),
  },
  'bullet-list': {
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  'ordered-list': {
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  task: {
    action: (editor) => editor.chain().focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive('task'),
  },
  sink: {
    action: (editor) => {
      const item = editor.isActive('listItem') ? 'listItem' : 'taskItem'
      editor.chain().focus().sinkListItem(item).run()
    },
    isActive: (editor) => editor.isActive('sink'),
  },
  lift: {
    action: (editor) => {
      const item = editor.isActive('listItem') ? 'listItem' : 'taskItem'
      editor.chain().focus().liftListItem(item).run()
    },
    isActive: (editor) => editor.isActive('lift'),
  },
  json: {
    action: (editor) => editor.chain().focus().toggleMark('json').run(),
  },
  pdf: {
    action: (editor) => editor.chain().focus().toggleMark('pdf').run(),
  },
  word: {
    action: (editor) => editor.chain().focus().toggleMark('word').run(),
  },
  markdown: {
    action: (editor) => editor.chain().focus().toggleMark('markdown').run(),
  },
  publish: {
    action: (editor) => editor.chain().focus().toggleMark('publish').run(),
  },
  html: {
    action: (editor) => editor.chain().focus().toggleMark('html').run(),
  },
  lock: {
    action: (editor) => editor.chain().focus().toggleMark('lock').run(),
  },
  save: {
    action: (editor) => editor.chain().focus().toggleMark('unlock').run(),
  },
  share: {
    action: (editor) => editor.chain().focus().toggleMark('share').run(),
  },
}

export const toolbarData: Toolbar[] = [
  {
    id: 'oops',
    icon: 'ri:eraser-fill',
    desc: 'Oops',
    expanded: true,
    buttons: [
      {
        id: Buttons['undo'],
        icon: 'ri:arrow-go-back-fill',
        desc: 'Undo',
        hotKey: 'mod+z',
        expanded: true,
      },
      {
        id: Buttons['redo'],
        icon: 'ri:arrow-go-forward-fill',
        desc: 'Redo',
        hotKey: 'mod+shift+z',
        expanded: true,
      },
    ]
  },
  {
    id: 'text',
    icon: 'ri:text',
    desc: 'Text',
    expanded: true,
    buttons: [
      {
        id: Buttons['bold'],
        icon: 'ri:bold',
        desc: 'Bold',
        hotKey: 'mod+B',
        expanded: true,
      },
      {
        id: Buttons['italic'],
        icon: 'ri:italic',
        desc: 'Italic',
        hotKey: 'mod+I',
        expanded: true,
      },
      {
        id: Buttons['underline'],
        icon: 'ri:underline',
        desc: 'Underline',
        hotKey: 'mod+U'
      },
      {
        id: Buttons['strikethrough'],
        icon: 'ri:strikethrough',
        desc: 'Strike',
        hotKey: 'mod+S'
      },
      {
        id: Buttons['code'],
        icon: 'ri:code-fill',
        desc: 'Code',
        hotKey: 'mod+C'
      }
    ]
  },
  {
    id: 'alignment',
    icon: 'ri:align-left',
    desc: 'Alignment',
    expanded: true,
    buttons: [
      {
        id: Buttons['alignLeft'],
        icon: 'ri:align-left',
        desc: 'Align left',
        hotKey: 'mod+L',
        expanded: true,
      },
      {
        id: Buttons.alignCenter,
        icon: 'ri:align-center',
        desc: 'Align center',
        hotKey: 'mod+E',
        expanded: true,
      },
      {
        id: Buttons.alignRight,
        icon: 'ri:align-right',
        desc: 'Align right',
        hotKey: 'mod+R',
        expanded: true,
      },
      {
        id: Buttons.alignJustify,
        icon: 'ri:align-justify',
        desc: 'Align justify',
        hotKey: 'mod+J',
        expanded: true,
      },
    ],
  },
  {
    id: 'lists',
    icon: 'ri:list-unordered',
    desc: 'Lists',
    buttons: [
      {
        id: Buttons['bulletList'],
        icon: 'ri:list-unordered',
        desc: 'Bullet list',
        hotKey: 'mod+U'
      },
      {
        id: Buttons['orderedList'],
        icon: 'ri:list-ordered',
        desc: 'Ordered list',
        hotKey: 'mod+O'
      },
      {
        id: Buttons['task'],
        icon: 'ri:checkbox-fill',
        desc: 'Task list',
        hotKey: 'mod+T'
      },
      {
        id: Buttons['sink'],
        icon: 'ri:indent-increase',
        desc: 'Sink',
        hotKey: 'mod+S'
      },
      {
        id: Buttons['lift'],
        icon: 'ri:indent-decrease',
        desc: 'Lift',
        hotKey: 'mod+L'
      },
    ],
  },
  {
    id: 'export',
    icon: 'ri:share-box-line',
    desc: 'Export',
    buttons: [
      {
        id: Buttons['json'],
        icon: 'ri:code-fill',
        desc: 'JSON',
        hotKey: 'mod+J'
      },
      {
        id: Buttons['html'],
        icon: 'ri:html5-fill',
        desc: 'HTML',
        hotKey: 'mod+H'
      },
      {
        id: Buttons['pdf'],
        icon: 'ri:file-pdf-fill',
        desc: 'PDF',
        hotKey: 'mod+P'
      },
      {
        id: Buttons['word'],
        icon: 'ri:file-word-fill',
        desc: 'Word',
        hotKey: 'mod+W'
      },
      {
        id: Buttons['markdown'],
        icon: 'ri:markdown-fill',
        desc: 'Markdown',
        hotKey: 'mod+M'
      },
      {
        id: Buttons['publish'],
        icon: 'ri:file-cloud-fill',
        desc: 'Publish',
        hotKey: 'mod+P'
      },
    ],
  },
  {
    id: 'security',
    expanded: true,
    icon: 'ri:lock-fill',
    desc: 'Security',
    buttons: [
      {
        id: Buttons['lock'],
        icon: 'ri:lock-fill',
        desc: 'Lock',
        hotKey: 'mod+L'
      },
      {
        id: Buttons['save'],
        icon: 'ri:save-3-line',
        desc: 'Save version',
        hotKey: 'mod+S'
      },
      {
        id: Buttons['share'],
        icon: 'ri:share-fill',
        desc: 'Share',
        hotKey: 'mod+S'
      },
    ]
  }
]