import { AccessInstance } from "./../types"
import { useQuery, useMutation } from "vue-query"
import safeAwait from "../../utils/safeAwait"
import { AccessToken, Account } from "../types"
import { accessTokenFromRefresh, login, register, logout } from "../utils/authLogin"
import { queryClient } from "./useQueries"
import { ref } from "@vue/runtime-core"

export const isAuthenticated = ref<boolean>(false)

/** Get a public token. No login required */
export const useToken = () => {
	return useQuery<{
      access: AccessToken;
      account: Account;
  } | false, Error>(
  	"token",
  	async (): Promise<{
      access: AccessToken;
      account: Account;
  } | false> => {
  		// Check if we have a token already
  		const storedRefreshToken = 
      localStorage.getItem("refreshToken") ? 
      	JSON.parse(localStorage.getItem("refreshToken") || "null") :
      	null
  		if (!storedRefreshToken) return false
  		// If we do and it hasn't expired, lets refresh the token and return the access token
  		if (
  			storedRefreshToken && new Date(storedRefreshToken.data.validUntil["@ts"]) > 
        new Date()
  		) {
  			const [error, accessResponse] = await safeAwait<{
            access: AccessToken;
            account: Account;
        }>(
        	accessTokenFromRefresh(storedRefreshToken.secret)
        )

  			if (error) throw new Error(error)
  			isAuthenticated.value = true
  			return accessResponse
  		}
  		// If we don't have a token, or it has expired, lets return false
  		throw new Error("Token has expired")
  	},
  	{
  		// Set the staleTime to 10 minutes, because at that time the token will be expired
  		refetchInterval: 600000,
  		onError: (error) => {
  			// log the error
  			console.error("CUSTOM ERROR", error)
  			isAuthenticated.value = false
  		}
  	}
  )
}

export const useLogin = () => {
	return useMutation(
		async (variables: { username: string, password: string }) => {
			// Login in a user
			const [error, loginResponse] = await safeAwait<AccessInstance>(
				login({ username: variables.username, password: variables.password })
			)
			if (error) throw new Error(error)
			const { access, account, refresh } = loginResponse
			localStorage.setItem("refreshToken", JSON.stringify(refresh))
			localStorage.setItem("currentAccount", JSON.stringify(account))
			return { access, account }
		},
		{
			onError: (err: Error) => {
				console.log(err)
				queryClient.setQueryData(["token"], false)
			},
			onSettled: (data) => {
				queryClient.setQueryData(["token"], data)
				isAuthenticated.value = true
			}
		}
	)
}

export const useRegister = (variables: { username: any; password: any; }) => {
	return useMutation<any, Error>(
		async (): Promise<any> => {
			// Login in a user
			const { access, account, refresh }: any = await register({ username: variables.username, password: variables.password })
			localStorage.setItem("refreshToken", JSON.stringify(refresh))
			localStorage.setItem("currentAccount", JSON.stringify(account))
			return { access, account }
		},
		{
			onError: (err: Error) => {
				console.log(err)
			},
			onSettled: (data) => {
				queryClient.setQueryData(["token"], data)
			}
		}
	)
}

// TODO: What is going on here with logout? Probably a mutation
export const useLogout = () => {
	return useMutation<any, Error>(
		"token",
		async (): Promise<any> => {
			// Check if we have a token already
			const storedRefreshToken = 
        localStorage.getItem("refreshToken") ? 
        	JSON.parse(localStorage.getItem("refreshToken") || "null") :
        	null
			// If we do and it hasn't expired, lets refresh the token and return the access token
			if (storedRefreshToken && new Date(storedRefreshToken.ttl["@ts"]) > new Date())
				await logout(storedRefreshToken.secret)
			else throw new Error("No refresh token found")
			// Logout the user
			localStorage.setItem("refreshToken", JSON.stringify(null))
			localStorage.setItem("currentAccount", JSON.stringify(null))
			return false
		},
		{
			onError: (err: Error) => {
				console.log(err)
			},
			onSettled: (data) => {
				queryClient.setQueryData(["token"], false)
			}
		}
	)
}