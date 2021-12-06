import { icons } from "@iconify-json/ri/icons.json"
import { defineComponent, h } from "vue"

export const Icon = defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "h-5 w-5 flex-shrink-0",
    }
  },
  setup({ icon, className }) {
    const name: keyof typeof icons = icon.split(':').length > 0 ? 
      (icon.split(':')[1] as keyof typeof icons) : 
      'link'
    const fillRegExp = icons[name]?.body.match(/fill="(.*?)"/)
    const fill = fillRegExp && fillRegExp.length > 0 ? 
      fillRegExp[1] :
      ''
    const dRegExp = icons[name]?.body.match(/d="(.*?)"/)
    const d = dRegExp && dRegExp.length > 0 ? 
    dRegExp[1] :
        ''
    return () => h(
      "svg", 
      { 
        xmlns: "http://www.w3.org/2000/svg", 
        viewBox: "0 0 24 24",
        class: className || "h-5 w-5 flex-shrink-0"
      }, 
      h(
        "path",
        {
          fill: fill,
          d: d
        }
      )
    )
  }
})