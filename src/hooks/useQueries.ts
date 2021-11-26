import { useQuery } from "vue-query";
import faunadb, { query as q } from "faunadb"

export const useAccount = () => useQuery(
  "workspaces",
  () => {
    const client = new faunadb.Client({ secret: 'fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL' });
    return client.query(
      q.Get(
        q.Match(q.Index('workspaces'))
      )
    ).then((res : any) => {
      return res.data
    })
  }
)

export const useWorkspaces = () => useQuery(
  "workspaces",
  () => {
    const client = new faunadb.Client({ secret: 'fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL' });
    return client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('workspaces'))
        ),
        q.Lambda('x', q.Get(q.Var('x')))
      )
    ).then((res : any) => {
      return res.data
    })
  }
)

export const useDirectories = (workspaceId) => useQuery(
  ["directories", workspaceId],
  () => {
    const client = new faunadb.Client({ secret: 'fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL' });
    return client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('directories_by_workpsace'), q.Ref(q.Collection('workspaces'), workspaceId))
        ),
        q.Lambda('x', q.Get(q.Var('x')))
      )
    ).then((res : any) => {
      return res.data
    })
  }
)

export const useDirectory = (directoryId) => useQuery(
  ["directory", directoryId],
  () => {
    const client = new faunadb.Client({ secret: 'fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL' });
    return client.query(
      q.Get(
        q.Match(q.Index('workspaces'))
      )
    ).then((res : any) => {
      return res.data
    })
  }
)

export const useDocument = (documentId) => useQuery(
  ["document", documentId],
  () => {
    const client = new faunadb.Client({ secret: 'fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL' });
    return client.query(
      q.Get(
        q.Match(q.Index('workspaces'))
      )
    ).then((res : any) => {
      return res.data
    })
  }
)

