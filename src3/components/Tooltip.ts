import {
  Editor,
  posToDOMRect,
  isTextSelection,
  isNodeSelection,
} from '@tiptap/core'
import { EditorState, Plugin, PluginKey } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import tippy, { Instance, Props } from 'tippy.js'

export interface BubbleMenuPluginProps {
  pluginKey: PluginKey | string,
  editor: Editor,
  element: HTMLElement,
  tippyOptions?: Partial<Props>,
  shouldShow?: ((props: {
    editor: Editor,
    view: EditorView,
    state: EditorState,
    oldState?: EditorState,
    from: number,
    to: number,
  }) => boolean) | null,
}

export type BubbleMenuViewProps = BubbleMenuPluginProps & {
  view: EditorView,
}

export class BubbleMenuView {
  public editor: Editor

  public element: HTMLElement

  public view: EditorView

  public preventHide = false

  public tippy: Instance | undefined

  public tippyOptions?: Partial<Props>

  public shouldShow: Exclude<BubbleMenuPluginProps['shouldShow'], null> = ({ state, from, to }) => {
    const { doc, selection } = state
    const { empty } = selection

    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock = !doc.textBetween(from, to).length
      && isTextSelection(state.selection)

    if (empty || isEmptyTextBlock) {
      return false
    }

    return true
  }

  constructor({
    editor,
    element,
    view,
    tippyOptions = {},
    shouldShow,
  }: BubbleMenuViewProps) {
    this.editor = editor
    this.element = element
    this.view = view

    if (shouldShow) {
      this.shouldShow = shouldShow
    }
    this.tippyOptions = tippyOptions
    // Detaches menu content from its current parent
    this.element.remove()
    this.element.style.visibility = 'visible'
  }

  createTooltip() {
    const { element: editorElement } = this.editor.options
    const editorIsAttached = !!editorElement.parentElement

    if (this.tippy || !editorIsAttached) {
      return
    }

    this.tippy = tippy(editorElement, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: 'manual',
      placement: 'top',
      hideOnClick: 'toggle',
      ...this.tippyOptions,
    })
  }

  show() {
    this.tippy?.show()
  }

  hide() {
    this.tippy?.hide()
  }

  destroy() {
    this.tippy?.destroy()
  }
}
