import { QueryClient, useMutation, useQuery, useQueryClient } from "vue-query";
import faunadb, { query as q, Call, Client, CurrentIdentity, Tokens } from "faunadb"
import safeAwait from '../../utils/safeAwait';

const queryClient = new QueryClient();
/**
 * Take user credentials and return 
 * an access token, a refresh token, 
 * and the account. Thorow an error if
 * we get one from the server
 */
const login = async ({ username, password }: { username: string, password: string }): Promise<any> => {
  const res: Response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  console.log(res)
  if (!res.ok) {
    return res.clone().text().then((error: any) => { throw new Error(error);});
  }
  const response = await res.json();
  console.log(response);
  if (!response.account) throw new Error('No account found');
  if (!response.tokens) throw new Error('No tokens found');
  if(!response.tokens.access) throw new Error('No access token found');
  if(!response.tokens.refresh) throw new Error('No refresh token found');
  return { 
    account: response.account, 
    access: response.tokens.access, 
    refresh: response.tokens.refresh 
  };
};

/**
 * Take user credentials and return 
 * an access token, a refresh token, 
 * and the account. Thorow an error if
 * we get one from the server
 */
const register = async ({ username, password }: { username: string, password: string }): Promise<any> => {
  const res: Response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    return res.clone().text().then((error: any) => { throw new Error(error);});
  }
  const response = await res.json();
  console.log(response);
  if (!response.account) throw new Error('No account found');
  if (!response.tokens) throw new Error('No tokens found');
  if(!response.tokens.access) throw new Error('No access token found');
  if(!response.tokens.refresh) throw new Error('No refresh token found');
  return { 
    account: response.account, 
    access: response.tokens.access, 
    refresh: response.tokens.refresh 
  };
};

/**
 * Revoke the current access token
 * and refresh token
 */
const logout = async (refresh: string): Promise<void> => {
  const client = new Client({ secret: refresh });
  const [error, _] = await safeAwait(
    client.query(
      Call('refresh')
    )
  );
  console.log('refresh', refresh);
  console.log('REFRESH TOKEN');
  if (error) console.log(error);
};

/**
 * Get a low level public data
 * access token
 */
const publicToken = async (): Promise<any> => {
  const res: Response = await fetch('/api/public');
  if (!res.ok) throw new Error(res.statusText);
  const token: any = await res.json();
  return { access: token, account: null };
};

/**
 * Take a refresh token and return 
 * a new refresh token, an access token, 
 * and a student
 */
const refreshToken = async (refresh: string): Promise<any> => {
  const client = new Client({ secret: refresh });
  const [error, token] = await safeAwait(
    client.query(
      Call('refresh')
    )
  );
  console.log('refresh', refresh);
  console.log('REFRESH TOKEN');
  console.log('TOKEN:', token);
  if (error) console.log(error);
  return {
    access: token.tokens.access,
    refresh: token.tokens.refresh,
    account: token.account
  };
};

/**
 * Take a refresh token, go get the access,
 * refresh, and student tokens, return them, 
 * and store the currentAccount and refreshToken locally
 */
const accessTokenFromRefresh = async (token: string): Promise<any> => {
  const { access, account, refresh} = await refreshToken(token);
  console.log(access, account, refresh);
  localStorage.setItem('refreshToken', JSON.stringify(refresh));
  localStorage.setItem('currentAccount', JSON.stringify(account));
  return { access, account };
};

/** Get a public token. No login required */
export const useToken = () => {
  return useQuery<any, Error>(
    'token',
    async (): Promise<any> => {
      // Check if we have a token already
      const storedRefreshToken = 
        localStorage.getItem('refreshToken') ? 
          JSON.parse(localStorage.getItem('refreshToken') || 'null') :
          null;
      // If we do and it hasn't expired, lets refresh the token and return the access token
      if (storedRefreshToken && new Date(storedRefreshToken.data.validUntil['@ts']) > new Date())
        return await accessTokenFromRefresh(storedRefreshToken.secret);
      // If we don't have a token, or it has expired, lets just give them a public one.
      return false;
    },
    {
      // Set the staleTime to 10 minutes, because at that time the token will be expired
      // Although, if you have a public token it will not expire, but checking is ok
      staleTime: 600000
    }
  );
};

export const useLogin = () => {
  return useMutation<any, Error>(
    async (variables: { username: any; password: any; }): Promise<any> => {
      // Login in a user
      console.log('loggining in, ', variables);
      const { access, account, refresh }: any = await login({ username: variables.username, password: variables.password });
      console.log(JSON.stringify(refresh));
      localStorage.setItem('refreshToken', JSON.stringify(refresh));
      localStorage.setItem('currentAccount', JSON.stringify(account));
      console.log(access, account, refresh);
      return { access, account };
    },
    {
      onError: (err: Error) => {
        console.log(err);
      },
      onSettled: (data) => {
        console.log('settled', data);
        queryClient.setQueryData(['token'], data);
      }
    }
  );
};

export const useRegister = (variables: { username: any; password: any; }) => {
  return useMutation<any, Error>(
    async (): Promise<any> => {
      // Login in a user
      console.log('registering, ', variables);
      const { access, account, refresh }: any = await register({ username: variables.username, password: variables.password });
      localStorage.setItem('refreshToken', JSON.stringify(refresh));
      localStorage.setItem('currentAccount', JSON.stringify(account));
      console.log(access, account, refresh);
      return { access, account };
    },
    {
      onError: (err: Error) => {
        console.log(err);
      },
      onSettled: (data) => {
        console.log('settled', data);
        queryClient.setQueryData(['token'], data);
      }
    }
  );
};

// TODO: What is going on here with logout? Probably a mutation
export const useLogout = () => {
  return useMutation<any, Error>(
    'token',
    async (): Promise<any> => {
      // Check if we have a token already
      const storedRefreshToken = 
        localStorage.getItem('refreshToken') ? 
          JSON.parse(localStorage.getItem('refreshToken') || 'null') :
          null;
      // If we do and it hasn't expired, lets refresh the token and return the access token
      if (storedRefreshToken && new Date(storedRefreshToken.ttl['@ts']) > new Date())
        await logout(storedRefreshToken.secret);
      else throw new Error('No refresh token found');
      // Logout the user
      localStorage.setItem('refreshToken', JSON.stringify(null));
      localStorage.setItem('currentAccount', JSON.stringify(null));
      return await publicToken();
    },
    {
      onError: (err: Error) => {
        console.log(err);
      },
      onSettled: (data) => {
        console.log('settled', data);
        queryClient.setQueryData(['token'], data);
      }
    }
  );
};

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
      const client = new faunadb.Client({ secret: 'fnAEY5bMGEACQa8Y_--7pYGtU7fUY731cwkYCHFL' });
      return client.query(
        q.Create(
          q.Collection('directories'),
          {
            data: {
              name: variables.name,
              parent: variables.parent,
              lastUpdatedAt: {
                account: 'jfkdla;fj',
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

