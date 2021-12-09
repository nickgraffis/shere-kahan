import { queryClient } from "./useQueries"
import { useMutation, useQuery } from "vue-query"
import faunadb, { query as q } from "faunadb"
import { reactive, Ref, ref, toRefs } from "vue"
import { AccessToken, Account, ShereDocument } from "../types"
import safeAwait from "@root/utils/safeAwait"

/** currentDocument Ref is Deprecated. Use useCurrentDocument hook instead. */
export const currentDocument = ref<string | null>(null)

/** A reactive state that holds the currentDocumentId */
const state = reactive<{
  currentDocument: string;
}>({
	currentDocument: ""
})

/** A hook to set the current document id and fetch it */
export const useCurrentDocument = () => {

	const setCurrentDocument = (documentId: string) => {
		state.currentDocument = documentId
	}

	return { ...toRefs(state), setCurrentDocument }
}

/** 
 * A hook to fetch a document 
 * The documents change shape often though;
 * the life cycle of a document is:
 * - we fetch the document preview after a workspace is fetched
 * 	-- see useWorkspace
 * - we fetch the document after it is selected and that contains children
 * - if the document is already set to be expanded we keep that flag
 * 	-- see useExpandDocument
 */
export const useDocument = (documentId: Ref<string>) => useQuery<ShereDocument>(
	["documents", documentId.value ],
	async () => {
		// const { key } = useCurrentToken()
		// const client = safeAwait(faunaClient())
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		const document = queryClient.getQueryData(["documents", documentId.value]) as ShereDocument
		if (typeof document === "object" && "expanded" in document) 
			queryClient.setQueryData(["documents", documentId.value], { ...document, expanded: document.expanded })
		const res: ShereDocument = await client.query(
			q.Call(
				"GetDocument",
				documentId.value
			)
		)
		
		if (typeof document === "object" && "expanded" in document) res.expanded = document.expanded
		return res
	}
)

/** A simple hook that flags a doucment as expanded or not */
export const useExpandDocument = (documentId: Ref<string>) => useMutation(
	async (expand?: { expand: boolean }) => {
		const document = queryClient.getQueryData(["documents", documentId.value]) as ShereDocument
		if (expand) {
			document.expanded = expand.expand
		} else if (!document.expanded) {
			document.expanded = true
		} else {
			document.expanded = false
		}
		queryClient.setQueryData(["documents", documentId.value], document)
	}
)

export const useCreateDocument = () => useMutation(
	["documents"],
	async (variables: any) => {
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		console.log(variables)
		const res: any = await client.query(
			q.Call(
				"CreateDocument",
				{
					data: {
						name: variables.name,
						parent: variables.parent,
						accounts: [],
						public: false,
						lastUpdated: {
							at: new Date().toISOString(),
							by: {
								name: queryClient.getQueryData<{ access: AccessToken, account: Account }>("token")?.account.data.name,
								id: queryClient.getQueryData<{ access: AccessToken, account: Account }>("token")?.account.ref["@ref"].id,
							}
						}
					}
				}
			)
		)
		return res
	},
	{
		onSuccess: (res) => {
			queryClient.setQueryData(["documents", res.ref.id], res)
			state.currentDocument = res.ref.id
		}
	}
)

export const useUpdateDocument = () => useMutation(
	["documents"],
	async (variables: any) => {
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		if (!variables.id) {
			throw new Error("Missing id")
		}
		const res: any = await client.query(
			q.Call(
				"UpdateDocument",
				variables.id,
				{
					content: variables.content,
					lastUpdated: variables.lastUpdated
				}
			)
		)
		return res.data
	},
	{
		onMutate: (data: any) => {
			console.log(data)
		},
		onSuccess: (res: any) => {
			console.log(res)
		}
	}
)