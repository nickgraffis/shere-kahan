import { useUpdateDocument,  } from "./useDocuments"
import { reactive, Ref } from "vue"
import { Editor } from "@tiptap/vue-3"
import BubbleMenu from "@tiptap/extension-bubble-menu"
import { ref, toRefs } from "@vue/reactivity"
import { useToken } from "./useTokens"
import * as Y from "yjs"
import { fromBase64, toBase64 } from "@aws-sdk/util-base64-browser"
import { WebrtcProvider } from "y-webrtc"
import { IndexeddbPersistence } from "y-indexeddb"
import { getRandomColor  } from "@/utils/random"
import { AccessToken, Account, CurrentUser, ShereDocument } from "@/types"
import { Collaboration } from "@/editor/Collaboration"
import { CollaborationCursor } from "@/editor/CollaborationCursor"
import StarterKit from "@tiptap/starter-kit"
import CharacterCount from "@tiptap/extension-character-count"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Highlight from "@tiptap/extension-highlight"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import { Mutation } from "react-query/types/core"
import { UseMutationReturnType } from "vue-query"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import Mention from "@tiptap/extension-mention"
import suggestion from "./suggestion"
import TextStyle from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import CustomImage from "./ImageExtension"
import { Figure } from "./figure"
import Focus from "@tiptap/extension-focus"

// Current editor state holds the current editor, the status
// as updated by y-webrtc, and the current user.
// The current state of the document (saved vs not saved) and 
// the provider that is connecting multiple clients to the document
const state = reactive<{
  editor: Editor | null;
  status: string;
  currentUser: CurrentUser | null;
  saved: boolean;
  provider: WebrtcProvider | null;
	document: ShereDocument | null;
	ydoc: Y.Doc | null;
}>({
	editor: null,
	status: "waiting",
	currentUser: null,
	saved: false,
	provider: null,
	document: null,
	ydoc: null,
})

// The useEditor hook returns the state spread into refs that are
// reactive, as-well-as a function to set the editor.
export const useEditor = () => {
	const setEditor = (document: ShereDocument) => {
		const { data: accessToken } = useToken()
		state.document = document
		return _setEditor(document, (accessToken as Ref<{ access: AccessToken; account: Account }>))
	}

	/** We have to pass the save function both the updateDocument mutation hook
	 * and the accessToken query hook, because hooks must be called inside
	 * of setup functions.
	*/
	const save = (updateDocument, accessToken) => {
		if (state.document && state.ydoc && accessToken?.value && accessToken?.value?.account) 
			_saveDocument(state.document, state.ydoc, accessToken, updateDocument)
	}

	return { ...toRefs(state), setEditor, save }
}

const _saveDocument = (
	document: ShereDocument, 
	ydoc: Y.Doc, account: Ref<{ account: Account, access: AccessToken }>,
	updateDocument: UseMutationReturnType<any, unknown, any, void, MutationResult<any, unknown, any, void>> 
) => {
	updateDocument.mutate({ 
		id: document.ref.id, 
		content: toBase64(Y.encodeStateAsUpdate(ydoc)) ,
		lastUpdated: {
			at: new Date().toISOString(),
			by: {
				name: account.value.account.data.name,
				id: account.value.account.ref["@ref"].id,
			}
		} 
	})
	state.saved = true
}

const _setEditor = async (document: ShereDocument, account: Ref<{
  access: AccessToken;
  account: Account;
}>) => {

	const currentUser = {
		name: account.value ? account.value?.account.data.name : "Anonymous",
		color: getRandomColor(),
		id: account.value ? account.value?.account.ref["@ref"].id : "Anonymous",
	}
	const updateDocument = useUpdateDocument()
	// Create the Yjs document and update it with the document data if it has any
	const ydoc = new Y.Doc()
	if (document.data.content) Y.applyUpdate(ydoc, fromBase64(document.data.content))
	state.ydoc = ydoc
	// Destory the previous provider if it exists
	state.provider?.destroy()
	state.provider = new WebrtcProvider(document.ref.id, ydoc)
	new IndexeddbPersistence(document.ref.id, ydoc) 
	// TODO: Call when provider is connected
	// Called when we connect to another user
	state.provider.on("synced", ({ synced }: { synced: boolean}) => {
		console.log("synced!", synced)
	})
  
	// A reference to a debounce of auto-saving the document
	const autoSaving = ref<ReturnType<typeof setTimeout> | null>(null)

	// Called when the ydoc is updated, and every 5 seconds of inactivity
	// it will auto-save the document
	ydoc.on("update", () => { 
		if (state.saved) state.saved = false
		else {
			if (autoSaving.value) clearTimeout(autoSaving.value)
			autoSaving.value = setTimeout(() => {
				_saveDocument(document, ydoc, account, updateDocument)
			}, 5000)
		}
	}) 

	// The actual tiptap editor instance
	state.editor = new Editor({
		editorProps: {
			attributes: {
				class: "w-full h-full focus:outline-none py-4 prose mx-auto",
			},
		},
		extensions: [
			StarterKit.configure({
				codeBlock: false,
				history: false
			}),
			Highlight.configure({ multicolor: true }),
			Typography,
			HorizontalRule,
			Superscript,
			Subscript,
			TaskList,
			Underline,
			Link.configure({
				openOnClick: false,
				autoLink: true,
				linkOnPaste: true,
			}),
			TextStyle,
			Color,
			Figure,
			Focus.configure({
				className: "has-focus",
				mode: "all",
			}),
			CharacterCount,
			TaskItem.configure({
				nested: true
			}),
			CustomImage.configure({
				HTMLAttributes: {
					class: "custom-image"
				}
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Collaboration.configure({
				document: ydoc,
        
			}),
			CollaborationCursor.configure({
				provider: state.provider,
				user: currentUser,
			}),
			Mention.configure({
				HTMLAttributes: {
					class: "mention",
				},
				suggestion,
			}),
			Placeholder.configure({
				placeholder: "My Custom Placeholder"
			})
		]
	})
}