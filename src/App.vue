<template>
  <div v-if="!login?.isSuccess.value">
    <div class="h-screen w-screen bg-black text-white flex flex-col items-center justify-center">
      <div class="w-md mx-auto space-y-4 animate-animated fadeInUp">
        <div class="flex space-x-4 items-center text-5xl font-black">
          <Zelda className="h-16 w-16 flex-shrink-0" />
          <div class="space-y-4">
            <div class="flex space-x-2 items-center">
              <p>SHERE</p>
              <span class="p-1 ring-2 bg-white text-black text-xs font-semibold rounded-lg">ALPHA</span>
            </div>
          </div>
        </div>
        <p class="text-lg font-semibold">A flexible tool for getting <i>shit</i> done.
          Work with others to create documents, tables, todo lists, and more.
        </p>
        <div class="relative">
          <input class="focus:outline-none ring-3 ring-white w-full rounded-lg bg-black text-white font-semibold p-2 my-4" placeholder="Here's my email. Get me on the list..." />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 absolute top-4.75 right-5 cursor-pointer transform hover:translate-x-1 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <div v-if="login.isLoading.value" class="flex space-x-2 items-center">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Looks like you've got access, double checking though...</p>
        </div>
        <div v-if="login.isError.value" class="flex space-x-2 items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <p>Looks like that account secret key didn't work. Request acess above</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Environment />
  </div>
</template>

<script setup lang="ts">
import Environment from './Environment/Environment.vue'
import { defineComponent, ref } from "vue";
import { useQuery, useQueryProvider } from "vue-query";
import { useLogin, useLogout, useToken } from './hooks/useQueries';
import Zelda from './Components/Zelda.vue'
const approved = ref(false)
const secret = window.location.href.split('?secret=')[1]
const login = useLogin()
if (secret) {
  login.mutate({ username: secret, password: secret })
}
</script>

<style scoped>
  input::placeholder {
    color: white;
  }

  .fadeInUp {
    animation: fadeinup .5s;
  }

  @-webkit-keyframes fadeinup {
    0% {
        visibility: hidden;
        opacity: 0;
        -webkit-transform: translateY(5px);
        transform:translateY(5px)
    }

    to {
        visibility: visible;
        opacity: 1;
        -webkit-transform: translateY(0);
        transform:translateY(0)
    }
}

@keyframes fadeinup {
    0% {
        visibility: hidden;
        opacity: 0;
        -webkit-transform: translateY(5px);
        transform:translateY(5px)
    }

    to {
        visibility: visible;
        opacity: 1;
        -webkit-transform: translateY(0);
        transform:translateY(0)
    }
}
</style>