import { defineComponent, PropType, ref, onMounted, onBeforeUnmount, h } from "vue"
import { BubbleCustMenuPlugin } from "./CustomBubbleMenu"
import { BubbleMenuPluginProps } from "./Tooltip"

export const CustomBubbleMenu = defineComponent({
  name: 'customBubbleMenu',

  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<BubbleMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: 'bubbleMenu',
    },

    editor: {
      type: Object as PropType<BubbleMenuPluginProps['editor']>,
      required: true,
    },

    tippyOptions: {
      type: Object as PropType<BubbleMenuPluginProps['tippyOptions']>,
      default: () => ({}),
    },

    shouldShow: {
      type: Function as PropType<Exclude<Required<BubbleMenuPluginProps>['shouldShow'], null>>,
      default: null,
    },
    
    onHide: {
      type: Function,
      default: () => ({}),
    }
  },

  setup(props, { slots }) {
    const root = ref<HTMLElement | null>(null)

    onMounted(() => {
      const {
        pluginKey,
        editor,
        tippyOptions,
        shouldShow,
        onHide
      } = props

      editor.registerPlugin(BubbleCustMenuPlugin({
        pluginKey,
        editor,
        element: root.value as HTMLElement,
        tippyOptions,
        shouldShow,
        onHide
      }))
    })

    onBeforeUnmount(() => {
      const { pluginKey, editor } = props

      editor.unregisterPlugin(pluginKey)
    })

    return () => h('div', { ref: root }, slots.default?.())
  },
})