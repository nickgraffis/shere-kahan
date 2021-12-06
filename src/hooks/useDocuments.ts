import { queryClient } from "./useQueries"
import { useMutation, useQuery } from "vue-query"
import faunadb, { query as q } from "faunadb"
import { computed, reactive, Ref, ref, toRefs } from "vue"
import { AccessToken, Account } from "../types"

export const currentDocument = ref<string | null>(null)
const enabled = computed(
	() => 
		!!currentDocument.value
)

const state = reactive<{
  currentDocument: string;
}>({
	currentDocument: ""
})

export const useCurrentDocument = () => {

	const setCurrentDocument = (documentId: string) => {
		state.currentDocument = documentId
	}

	return { ...toRefs(state), setCurrentDocument }
}

export const useDocument = (documentId: Ref<string>) => useQuery(
	["documents", documentId.value ],
	async () => {
		console.log("DOCUMENT CURRENT", documentId.value)
		console.log(queryClient.getQueryData("token"))
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		const res: any = await client.query(
			q.Call(
				"GetDocument",
				documentId.value
			)
		)
		return res
	},
	reactive(
		{
			enabled
		}
	)
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
						parent: q.Ref(q.Collection("workspaces"), variables.parent),
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
		onSuccess: (res: any) => {
			queryClient.setQueryData(["documents", res.ref.id], res)
			currentDocument.value = res.ref.id
		},
		// onMutate: async (data: any) => {
		//   console.log(data)
		//   const fakeId = Math.random()
		//   currentDocument.value = fakeId;
		//   queryClient.setQueryData(["documents", fakeId], {});
		//   queryClient.setQueryData(["directories", ], (old) => {
        
		//   })
		// }
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