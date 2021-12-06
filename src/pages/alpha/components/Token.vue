<template>
  <a @click="openAccessTokenInput()" class="cursor-pointer hover:border-b-2 hover:border-white ">
    I already have an access token
  </a>
  <div v-if="loggingIn" class="absolute fadeInUp w-full z-50">
    <input ref="accessTokenInput" class="font-mono text-xs md:text-base focus:outline-none w-full rounded-sm bg-orange-400 bg-opacity-25 text-orange-600 font-semibold p-2 my-4" placeholder="Access token" />
  </div>
  <div class="space-y-2 absolute" :class="loggingIn ? 'pt-20' : 'pt-0'">
    <div v-if="l.isLoading.value" class="flex space-x-2 items-center">
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p>Looks like you've got access, double checking though...</p>
    </div>
    <div v-if="isLoading" class="flex space-x-2 items-start">
      <svg class="animate-spin h-5 w-5 text-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p>Looks like you've got a refresh token in <code>localStorage</code> , let's double check...</p>
    </div>
    <div v-if="isError" class="flex space-x-2 items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
      <p>Your refresh token didn't work. You'll need to enter your acess token again ☝️.</p>
    </div>
    <div v-if="l.isError.value" class="flex space-x-2 items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
      <p>Looks like that account secret key didn't work. Request acess above</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core"
import { ref } from "vue"
import { useToken, useLogin } from "@hooks/useTokens"

const { isLoading, isError, data } = useToken()
const l = useLogin()
const loggingIn = ref<boolean>(false)
const accessTokenInput = ref<HTMLInputElement | null>(null)
const openAccessTokenInput = () => {
  loggingIn.value = true
  setTimeout(() => {
    if (accessTokenInput.value) {
      onKeyStroke('Enter', (_) => {
        // why is ts making me check with twice?
        accessTokenInput.value && login(accessTokenInput.value.value)
      }, { target: accessTokenInput.value })
      accessTokenInput.value.focus()
    }
  }, 100)
}
const login = (credentials: string) => {
  loggingIn.value = false
  l.mutate({
    username: credentials.split('+')[1],
    password: credentials.split('+')[0],
  })
}
</script>