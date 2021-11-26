import { Editor } from "@tiptap/vue-3"

export type Toolbar = {
  id: string,
  icon: string,
  desc: string,
  expanded?: boolean,
  buttons: Button[]
}

export type Button = {
  id: Buttons,
  icon: string,
  desc: string,
  hotKey: string,
  expanded?: boolean,
}

export enum Buttons {
  undo = 'undo',
  redo ='redo',
  bold = 'bold',
  italic = 'italic',
  underline = 'underline',
  strikethrough = 'strikethrough',
  code = 'code',
  alignLeft = 'align-left',
  alignCenter = 'align-center',
  alignRight = 'align-right',
  alignJustify = 'align-justify',
  bulletList = 'bullet-list',
  orderedList = 'ordered-list',
  task = 'task',
  sink = 'sink',
  lift = 'lift',
  json = 'json',
  pdf = 'pdf',
  word = 'word',
  markdown = 'markdown',
  publish = 'publish',
  html = 'html',
  lock = 'lock',
  save = 'save',
  share = 'share',
}

export type ButtonToAction = {
  [key in Buttons]: {
    action: (editor: Editor) => void,
    isActive?: (editor: Editor) => boolean,
  }
}
