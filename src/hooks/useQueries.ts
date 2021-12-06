import { QueryClient, useMutation, useQuery, useQueryClient } from "vue-query"
import faunadb, { query as q, Call, Client, CurrentIdentity, Tokens } from "faunadb"
import safeAwait from "../../utils/safeAwait"
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnReconnect: false,
			refetchIntervalInBackground: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
})

export const useDirectories = (workspaceId) => useQuery(
	["directories", workspaceId],
	() => {
		const client = new faunadb.Client({ secret: "fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL" })
		return client.query(
			q.Call("GetWorkspace", workspaceId)
		).then((res : any) => {
			console.log(res)
			return res
		})
	}
)

export const useCreateDirectory = (workspaceId) => useMutation(
	["directories", workspaceId],
	{
		onMutate: (variables: any) => {
			const client = new faunadb.Client({ secret: "fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL" })
			return client.query(
				q.Create(
					q.Collection("directories"),
					{
						data: {
							name: variables.name,
							parent: variables.parent,
							lastUpdatedAt: {
								account: "jfkdla;fj",
								time: Date.now()
							},
						},
					},
				)
			).then((res : any) => {
				console.log(res)
				return res
			})
		},
	}
)

export const useDirectory = (directoryId) => useQuery(
	["directory", directoryId],
	() => {
		const client = new faunadb.Client({ secret: "fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL" })
		return client.query(
			q.Get(
				q.Match(q.Index("workspaces"))
			)
		).then((res : any) => {
			return res.data
		})
	}
)

// export const useDocument = (documentId) => useQuery(
//   ["documents", documentId],
//   () => {
//     const client = new faunadb.Client({ secret: 'fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL' });
//     console.log(documentId)
//     return documentId ? client.query(
//       q.Get(
//         q.Collection('documents', documentId)
//       )
//     ).then((res : any) => {
//       return res.data
//     }) : false
//   }
// )

export const useCurrentDocument = () => useQuery(
	["currentDocument"],
	() => {
		return queryClient.getQueryData(["currentDocument"]) || false
	}
)

export const useSetCurrentDocument = () => {
	return useMutation(
		["currentDocument"],
		async (variables: string) => {
			const client = new faunadb.Client({ secret: "fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL" })
			console.log(variables)
			const res = await client.query(
				q.Get(
					q.Ref(q.Collection("documents"), `${variables}`)
				)
			)
			console.log(res)
			return res.data
		},
		{
			onError: (err: Error) => {
				console.log(err)
				queryClient.setQueryData(["currentDocument"], false)
			},
			onSuccess: (data) => {
				console.log("settled", data)
				queryClient.setQueryData("currentDocument", (d) => {
					return {
						...data
					}
				})
				const dd = queryClient.getQueryData(["currentDocument"])
				console.log("new data", dd)
				queryClient.invalidateQueries("currentDocument")
				console.log(queryClient)
			}
		}
	)
}


export const useCreateDocument = () => useMutation(
	["directories"],
	(variables: any) => {
		const client = new faunadb.Client({ secret: "fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL" })
		return client.query(
			q.Create(
				q.Collection("documents"),
				{
					data: {
						name: variables.name,
						parent: variables.parent,
						lastUpdatedAt: {
							account: "jfkdla;fj",
							time: Date.now()
						},
					},
				}
			)
		).then((res : any) => {
			return res.data
		})
	},
)

