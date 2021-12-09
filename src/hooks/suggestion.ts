import { useCurrentDocument } from "./useDocuments"
import { VueRenderer } from "@tiptap/vue-3"
import tippy from "tippy.js"
import MentionList from "./MentionList.vue"
import { queryClient } from "./useQueries"

export default {
	items: ({ query }) => {
		const { currentDocument } = useCurrentDocument()
		const document = queryClient.getQueryData(["documents", currentDocument.value])
		const familyTree = document.familyTree.slice(0, -1)
		console.log(familyTree)
		const collaborators = []
		familyTree.forEach(branch => {
			if (branch.data.accounts?.length) {
				collaborators.push(...branch.data.accounts.map(account => {
					console.log(account)
					return account.data?.name || "Unknown"
				}))
			}
		})
		return collaborators.filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
	},

	render: () => {
		let component
		let popup

		return {
			onStart: props => {
				component = new VueRenderer(MentionList, {
					// using vue 2:
					// parent: this,
					// propsData: props,
					props,
					editor: props.editor,
				})

				popup = tippy("body", {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: component.element,
					showOnCreate: true,
					interactive: true,
					trigger: "manual",
					placement: "bottom-start",
				})
			},

			onUpdate(props) {
				component.updateProps(props)

				popup[0].setProps({
					getReferenceClientRect: props.clientRect,
				})
			},

			onKeyDown(props) {
				if (props.event.key === "Escape") {
					popup[0].hide()

					return true
				}

				return component.ref?.onKeyDown(props)
			},

			onExit() {
				popup[0].destroy()
				component.destroy()
			},
		}
	},
}