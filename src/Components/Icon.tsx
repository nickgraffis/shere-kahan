import { icons } from "@iconify-json/ri/icons.json"
import { defineComponent, h } from "vue"

export const Icon = defineComponent({
  props: {
    icon: String,
    className: {
      type: String,
      default: "h-5 w-5 flex-shrink-0",
    }
  },
  setup({ icon, className }, { slots }) {
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
          fill: icons[icon.split(':')[1]]?.body.match(/fill="(.*?)"/)[1],
          d: icons[icon.split(':')[1]]?.body.match(/d="(.*?)"/)[1]
        }
      )
    )
  }
})