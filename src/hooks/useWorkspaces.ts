import { queryClient } from "./useQueries"
import { useQuery } from "vue-query"
import faunadb, { query as q } from "faunadb"
import { AccessToken, Account } from "../types"

export const useWorkspaces = () => useQuery(
	["workspaces"],
	async () => {
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		const res: any = await client.query(
			q.Call(
				"GetWorkspacesByAccount"
			)
		)
		return res.data
	}
)

export const useWorkspace = (workspaceId) => useQuery(
	["workspace", workspaceId],
	async () => {
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		const res: any = await client.query(
			q.Call(
				"GetWorkspace",
				workspaceId
			)
		)
		const workspaces: any[] = queryClient.getQueryData("workspaces") as any
		const workspace = workspaces.find(w => w.ref.id === workspaceId)
		return {
			doucments: res,
			workspace
		}
	}
)