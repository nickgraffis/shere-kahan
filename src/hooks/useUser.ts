import { Account, AccessToken } from "@/types"
import { useMutation } from "vue-query"
import { queryClient } from "./useQueries"
import faunadb, { query as q } from "faunadb"

export const useUpdateUser = () => useMutation(
	async (variables: any) => {
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		const userId = (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.account.ref["@ref"].id
		if (!userId) {
			throw new Error("Missing id")
		}
		const res: any = await client.query(
			q.Call(
				"UpdateUser",
				userId,
				{
					...variables
				}
			)
		)
		return res.data
	},
	{
		onMutate: (data: any) => {
			console.log(data)
			const oldAccess = (queryClient.getQueryData("token") as { account: Account, access: AccessToken})
			queryClient.setQueryData("token", {
				...oldAccess,
				account: {
					...oldAccess.account,
					data: {
						...oldAccess.account.data,
						...data
					}
				}
			})
		},
		onSuccess: (res: any) => {
			console.log(res)
		}
	}
)