import { useUpdateDocument,  } from "./useDocuments"
import { reactive, Ref } from "vue"
import { Editor } from "@tiptap/vue-3"
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
}>({
	editor: null,
	status: "waiting",
	currentUser: null,
	saved: false,
	provider: null
})

// The useEditor hook returns the state spread into refs that are
// reactive, as-well-as a function to set the editor.
export const useEditor = () => {
	const setEditor = (document: ShereDocument) => {
		const { data: accessToken } = useToken()
		return _setEditor(document, (accessToken as Ref<{ access: AccessToken; account: Account }>))
	}

	return { ...toRefs(state), setEditor }
}

const _setEditor = async (document: ShereDocument, account: Ref<{
  access: AccessToken;
  account: Account;
}>) => {

	const updateDocument = useUpdateDocument()
	const currentUser = {
		name: account.value ? account.value?.account.data.name : "Anonymous",
		color: getRandomColor(),
		id: account.value ? account.value?.account.ref["@ref"].id : "Anonymous",
	}

	// Create the Yjs document and update it with the document data if it has any
	const ydoc = new Y.Doc()
	if (document.data.content) Y.applyUpdate(ydoc, fromBase64(document.data.content))
	// Destory the previous provider if it exists
	state.provider?.destroy()
	state.provider = new WebrtcProvider(document.ref.id, ydoc)
	new IndexeddbPersistence(document.ref.id, ydoc) 
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
				state.saved = true
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
			TaskList,
			Underline,
			Link,
			CharacterCount,
			TaskItem.configure({
				nested: true,
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
		]
	})
}