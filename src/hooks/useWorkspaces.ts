import { queryClient } from "./useQueries"
import { useQuery } from "vue-query"
import faunadb, { query as q } from "faunadb"
import { AccessToken, Account, ShereDocument, Workspace } from "../types"

export const useWorkspaces = () => useQuery<Workspace[]>(
	["workspaces"],
	async () => {
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		const res: { data: Workspace[] } = await client.query(
			q.Call(
				"GetWorkspacesByAccount"
			)
		)
		
		return res.data
	}
)

export const useWorkspace = (workspaceId: string) => useQuery(
	["workspace", workspaceId],
	async () => {
		if (
			!(queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		) throw new Error("No token")
		const client = new faunadb.Client({ 
			secret: 
        (queryClient.getQueryData("token") as { account: Account, access: AccessToken})?.access.secret
		})
		const res: ShereDocument[] = await client.query(
			q.Call(
				"GetWorkspace",
				workspaceId
			)
		)

		const workspaces: Workspace[] = queryClient.getQueryData("workspaces") || []
		const workspace = workspaces.find(workspace => workspace.ref.id === workspaceId)

		res.forEach(document => {
			queryClient.setQueryData(["documents", document.ref.id], document)
		})
		
		return {
			doucments: res,
			workspace
		}
	}
)