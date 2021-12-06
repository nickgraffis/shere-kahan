import { Buttons, ButtonToAction, Toolbar } from "@/types"
export type ToolSetting = {
  id: string,
  desc: string,
  icon: string,
  hotKey: string,
  import: boolean,
  expanded: boolean
}

const ToolBarSettings: ToolSetting[] = [
	{
		id: Buttons.bold,
		desc: "Bold",
		hotKey: "mod+b",
		icon: "ri:bold",
		import: true,
		bubble: true,
		hide: true,
		nest: false,
	},
	{
		id: Buttons.italic,
		desc: "Italic",
		hotKey: "mod+i",
		icon: "ri:italic",
		import: true,
		expanded: true
	},
	{
		id: Buttons.underline,
		desc: "Underline",
		hotKey: "mod+u",
		icon: "ri:underline",
		import: true,
		expanded: true
	},
	{
		id: Buttons.strikethrough,
		desc: "Strikethrough",
		hotKey: "mod+shift+s",
		icon: "ri:strikethrough",
		import: true,
		expanded: true
	},
	{
		id: Buttons.code,
		desc: "Code",
		hotKey: "mod+shift+c",
		icon: "ri:code-fill",
		import: true,
		expanded: false
	},
	{
		id: Buttons.superscript,
		desc: "Superscript",
		hotKey: "mod+shift+x",
		icon: "ri:superscript",
		import: true,
		expanded: false
	},
	{
		id: Buttons.subscript,
		desc: "Subscript",
		hotKey: "mod+shift+y",
		icon: "ri:subscript",
		import: true,
		expanded: false
	},
]

const inlineMarks = [
	"bold",
	"italic",
	"underline",
	"strike",
	"code",
	"superscript",
	"subscript",
	"highlight",
	"font-family",
	"font-size",
	"text-color",
	"links",
	"emojis",
]

const blockTypes = [
	"heading1",
	"heading2",
	"heading3",
	"heading4",
	"heading5",
	"heading6",
	"blockquote",
	"code",
	"numbered-list",
	"bulleted-list",
	"task-list",
	"notice",
	"table",
	"image",
	"layouts",
	"divider",
	"details",
	"horizontal-rule"
]

const alignment = [
	"align-left",
	"align-center",
	"align-right",
	"align-justify"
] 

const autoComplete = {
	colors: true,
	"<3": "❤️"
}

const useMarkDownShortCodes = true