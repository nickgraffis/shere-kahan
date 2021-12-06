import { AccessToken, Account } from './../types';
import { Client, Call } from "faunadb";
import safeAwait from "../../utils/safeAwait";
import { AccessInstance } from "../types";

/**
 * Take user credentials and return 
 * an access token, a refresh token, 
 * and the account. Thorow an error if
 * we get one from the server
 */
 export const login = async (
   { username, password }: 
   { username: string, password: string }
  ): Promise<AccessInstance> => {
  const res: Response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    res.clone().text().then((error: any) => { throw new Error(error);});
  }
  const response = await res.json();
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
export const register = async (
  { username, password }: 
  { username: string, password: string }
): Promise<AccessInstance> => {
  const res: Response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    res.clone().text().then((error: any) => { throw new Error(error);});
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
export const logout = async (refresh: string): Promise<void> => {
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
 * Take a refresh token and return 
 * a new refresh token, an access token, 
 * and a student
 */
export const refreshToken = async (refresh: string): 
  Promise<AccessInstance> => {
  const client = new Client({ secret: refresh });
  const [error, token] = await safeAwait(
    client.query(
      Call('refresh')
    )
  );
  if (error) throw new Error(error);
  return JSON.parse(JSON.stringify({
    access: token.tokens.access,
    refresh: token.tokens.refresh,
    account: token.account
  }));
};

/**
 * Take a refresh token, go get the access,
 * refresh, and student tokens, return them, 
 * and store the currentAccount and refreshToken locally
 */
export const accessTokenFromRefresh = async (token: string): Promise<{
  access: AccessToken,
  account: Account,
}> => {
  const [error, refreshResponse] = await safeAwait(refreshToken(token));
  if (error) throw new Error(error);
  const { access, account, refresh } = refreshResponse
  localStorage.setItem('refreshToken', JSON.stringify(refresh));
  localStorage.setItem('currentAccount', JSON.stringify(account));
  return { access, account };
};