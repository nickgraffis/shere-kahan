import { icons } from "@iconify-json/jam/icons.json"
import { defineComponent, h } from "vue"

export const Icon = defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "h-6 w-6 flex-shrink-0",
    }
  },
  setup({ icon, className }) {
    const parsedIcon = icon.split(':')
    const name: keyof typeof icons = parsedIcon.length > 0 ? 
      (parsedIcon[1] as keyof typeof icons) : 
      (icon as keyof typeof icons)
    const svgParams = { 
      xmlns: "http://www.w3.org/2000/svg", 
      viewBox: "0 0 24 24",
      class: className
    }
    if (parsedIcon[0] === 'large') {
      svgParams.viewBox = "-6 -7 34 34"
    }
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
      svgParams,
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