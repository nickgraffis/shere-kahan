<template>
  <div v-if="!login?.isSuccess.value">
    <div class="h-screen w-screen overflow-hidden bg-black text-white flex flex-col items-center md:justify-center pt-20 md:pt-0 md:px-0 px-6">
      <div class="md:w-md w-full mx-auto space-y-4 animate-animated fadeInUp">
        <div class="flex space-x-4 items-center text-4xl md:text-5xl font-black">
          <Zelda className="md:h-16 md:w-16 h-12 w-12 flex-shrink-0" />
          <div class="space-y-4">
            <div class="flex space-x-2 items-center">
              <p>SHERE</p>
              <span class="p-1 ring-2 bg-white text-black text-xs font-semibold rounded-lg">ALPHA</span>
            </div>
          </div>
        </div>
        <p class="md:text-lg text-sm relative font-semibold">A flexible tool for getting <i class="border-b-3 border-white">shit</i> done.
          The king
          <svg class="w-5 h-5 md:visible invisible absolute -top-3.75 right-22" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 128 128"><g fill="#f79329"><path d="M91.56 50.38l14.35 44.94l-36.36-4.71z"/><path d="M105.91 96.5c-.05 0-.1 0-.15-.01l-36.37-4.71c-.39-.05-.72-.29-.9-.64c-.18-.35-.17-.76.01-1.1l22.02-40.23c.23-.41.69-.65 1.15-.61c.47.04.87.36 1.01.81l14.24 44.62c.14.19.22.43.22.68c0 .65-.53 1.18-1.18 1.18c0 .01-.03.01-.05.01zM71.4 89.66l32.82 4.25l-12.94-40.55l-19.88 36.3z"/><path d="M40.19 34.91a5.46 5.46 0 0 1-5.46 5.46c-3.01 0-5.46-2.45-5.46-5.46c0-3.02 2.44-5.46 5.46-5.46s5.46 2.44 5.46 5.46z"/><path d="M34.73 41.54a6.65 6.65 0 0 1-6.64-6.64a6.65 6.65 0 0 1 6.64-6.64a6.65 6.65 0 0 1 6.64 6.64a6.65 6.65 0 0 1-6.64 6.64zm0-10.91c-2.36 0-4.28 1.92-4.28 4.28c0 2.36 1.92 4.28 4.28 4.28c2.36 0 4.29-1.92 4.29-4.28c0-2.36-1.93-4.28-4.29-4.28z"/><g><path d="M93.58 29.45c3.01.18 5.31 2.77 5.13 5.78c-.17 3.01-2.77 5.3-5.77 5.13a5.452 5.452 0 0 1-5.13-5.77c.18-3.02 2.76-5.32 5.77-5.14z"/><path d="M93.26 41.54l-.39-.01c-1.77-.1-3.4-.89-4.57-2.21a6.615 6.615 0 0 1-1.67-4.8a6.647 6.647 0 0 1 6.63-6.25l.39.01c3.66.22 6.46 3.38 6.24 7.03a6.638 6.638 0 0 1-6.63 6.23zm.23-10.92c-2.5 0-4.37 1.77-4.5 4.03c-.07 1.14.31 2.24 1.07 3.1c.76.86 1.8 1.36 2.95 1.43l.25.01c2.26 0 4.14-1.77 4.27-4.03c.14-2.36-1.67-4.39-4.03-4.54h-.01z"/></g><g><path d="M36.43 50.38L22.09 95.32l36.36-4.71z"/><path d="M22.09 96.5c-.34 0-.68-.15-.91-.42c-.26-.31-.34-.73-.22-1.11L35.3 50.03c.14-.45.54-.77 1.01-.81c.51-.05.92.19 1.15.61l22.02 40.23c.18.34.19.75.01 1.1c-.17.35-.51.58-.9.64l-36.36 4.71c-.04-.01-.09-.01-.14-.01zm14.63-43.14L23.77 93.92l32.82-4.25l-19.87-36.31z"/></g></g><path d="M72.17 28.76c0 4.51-3.66 8.17-8.17 8.17s-8.18-3.66-8.18-8.17c0-4.52 3.66-8.17 8.18-8.17s8.17 3.65 8.17 8.17z" fill="#fcc21b"/><path d="M13.45 34.91c0 3.58-2.9 6.48-6.49 6.48c-3.58 0-6.48-2.9-6.48-6.48c0-3.59 2.9-6.49 6.48-6.49c3.59 0 6.49 2.9 6.49 6.49z" fill="#fcc21b"/><path d="M114.54 34.91c0 3.58 2.9 6.48 6.49 6.48c3.58 0 6.49-2.9 6.49-6.48a6.49 6.49 0 0 0-6.49-6.49a6.49 6.49 0 0 0-6.49 6.49z" fill="#fcc21b"/><path d="M72.17 28.76c0 4.51-3.66 8.17-8.17 8.17s-8.18-3.66-8.18-8.17c0-4.52 3.66-8.17 8.18-8.17s8.17 3.65 8.17 8.17z" fill="#fcc21b"/><path d="M13.45 34.91c0 3.58-2.9 6.48-6.49 6.48c-3.58 0-6.48-2.9-6.48-6.48c0-3.59 2.9-6.49 6.48-6.49c3.59 0 6.49 2.9 6.49 6.49z" fill="#fcc21b"/><path d="M114.54 34.91c0 3.58 2.9 6.48 6.49 6.48c3.58 0 6.49-2.9 6.49-6.48a6.49 6.49 0 0 0-6.49-6.49a6.49 6.49 0 0 0-6.49 6.49z" fill="#fcc21b"/><defs><path id="ssvg-id-crowna" d="M119.5 53.43a1.18 1.18 0 0 0-1.29.22L87.25 82.71L65.16 49.72c-.22-.33-.58-.52-.98-.52c-.39 0-.76.19-.98.51l-22.19 33l-30.95-29.07a1.18 1.18 0 0 0-1.29-.22c-.43.19-.71.63-.69 1.1l1.27 47.52c0 10.33 24.06 18.43 54.78 18.43c30.72 0 54.78-8.1 54.78-18.4l1.27-47.55c.02-.46-.25-.9-.68-1.09z"/></defs><use xlink:href="#ssvg-id-crowna" overflow="visible" fill="#fcc21b"/><clipPath id="ssvg-id-crownb"><use xlink:href="#ssvg-id-crowna" overflow="visible"/></clipPath><path d="M119.91 78.06l.01.01l-.59 18.85h-.01c-4.2-.13-7.46-4.45-7.3-9.66c.16-5.22 3.69-9.33 7.89-9.2z" clip-path="url(#ssvg-id-crownb)" fill="#d7598b"/><path d="M8.37 78.06l-.01.01l.58 18.85h.02c4.19-.13 7.46-4.45 7.29-9.66c-.16-5.22-3.69-9.33-7.88-9.2z" clip-path="url(#ssvg-id-crownb)" fill="#d7598b"/><path d="M72.8 96.55c0 5.58-3.88 10.11-8.67 10.11c-4.78 0-8.66-4.53-8.66-10.11c0-5.59 3.88-10.11 8.66-10.11c4.79-.01 8.67 4.52 8.67 10.11z" fill="#d7598b"/><g fill="#ed6c30"><path d="M89.9 102.14c-.13 2.7-2.12 4.79-4.44 4.68c-2.31-.11-4.08-2.4-3.94-5.09c.14-2.71 2.13-4.8 4.44-4.68c2.31.1 4.07 2.39 3.94 5.09z"/><ellipse cx="103.04" cy="98.95" rx="4.89" ry="4.2" transform="rotate(-87.013 103.044 98.958)"/></g><g fill="#ed6c30"><path d="M38.37 102.14c.13 2.7 2.12 4.79 4.44 4.68c2.31-.11 4.08-2.4 3.94-5.09c-.13-2.71-2.12-4.8-4.43-4.68c-2.32.1-4.09 2.39-3.95 5.09z"/><ellipse cx="25.23" cy="98.95" rx="4.19" ry="4.89" transform="rotate(-2.987 25.234 98.957)"/></g></svg> 
          of sharing and creating documents, tables, todo lists, documentation, forms, polls, blogs, and more.
        </p>
        <div class="relative">
          <input class="text-xs md:text-base focus:outline-none ring-3 ring-white w-full rounded-lg bg-black text-white font-semibold p-2 my-4" placeholder="Here's my email. Get me on the list..." />
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <p>Looks like that account secret key didn't work. Request acess above</p>
        </div>
      </div>
      <div class="absolute bottom-4 left-4 flex space-x-2">
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path d="M56.3 26.1c4.2-3 6.5-16.4 5.4-17.6c-1.1-1.2-13.5.9-16.3 5.6c-2.1 3.7 7.6 14.4 10.9 12" fill="#e0ac7e"/><path d="M54.7 23.8C57.3 22 58 12.9 58 12.9s-8.4.6-10.1 3.5c-1.3 2.2 4.7 8.9 6.8 7.4" fill="#c1875d"/><path d="M7.7 26.1c-4.2-3-6.5-16.4-5.4-17.6c1.1-1.2 13.5.9 16.3 5.6c2.1 3.7-7.5 14.4-10.9 12" fill="#e0ac7e"/><path d="M9.3 23.8c-2.6-1.9-3.3-11-3.3-11s8.4.6 10.1 3.5c1.3 2.3-4.7 9-6.8 7.5" fill="#c1875d"/><g fill="#e0ac7e"><path d="M50.6 35.3c-5.4 5.9-2.8 22.5-18.6 22.5c-22.5 0-13.2-16.6-18.6-22.5C1.3 21.9 21.8 12.6 32 12.6s30.7 9.3 18.6 22.7"/><path d="M32.7 29.6s-4.2-15.2-11.3-18.9c0 0 2.9-2.2 5.2-.7c0 0-.1-2.7-2.3-4.9c0 0 4.3-.8 6.9 4c0 0-.1-4.7-1-7.1c0 0 7.5 3.4 10.1 12.6c.1 0-7.1 2.3-7.6 15"/></g><g fill="#3e4347"><ellipse cx="12.9" cy="29" rx="4" ry="4.4"/><ellipse cx="51.1" cy="28.8" rx="4" ry="4.4"/></g><path d="M33 53.6c0 2.2-3.1 3.9-7 3.9s-7-1.8-7-3.9c0-2.2 3.1-3.9 7-3.9s7 1.8 7 3.9" fill="#89664c"/><path d="M39.4 52.7c0 3.2-5.2 7.8-11.4 9.1c-6.6 1.3-11.4-5.9-11.4-9.1s.2.4 6.6.4s16.2-3.6 16.2-.4" fill="#ffe2b3"/><path d="M29.4 47s-5.6 2.7-6.1 9.8c-.5 6.8-9.8 7.1-9.3.1s6.5-9.9 8-9.8c1.5 0 7-.1 7.4-.1" fill="#ff717f"/><path d="M24.6 47.9c-.8.7-1.6 1.2-2.4 1.8c-.8.6-1.5 1.3-2.2 2c-.6.8-1.2 1.6-1.5 2.5c-.4.9-.6 1.9-.7 2.9c0-1 .1-2 .4-3c.3-1 .8-1.9 1.4-2.8c1.2-1.7 2.9-3 4.3-4.3l.7.9" fill="#e2596c"/><path d="M43 47.1c0 8.8-7.1 13.6-12.4 9.1c-2.1-1.7-4.3-2.7-6.3-3.7c-3.5-1.7-6.9-2.2-6.9-7.7L43 47.1" fill="#89664c"/><path d="M44.6 48.8c0 8.8-7.7 11.5-14.3 6c-6.1-5-13.1-2.1-13.1-10.9c0-2.7 4.7-10.1 4.7-10.1c0-9.1 2.9-15.2 10.2-15.2s10.2 6 10.2 15.2c-.1 0 2.3 12.2 2.3 15" fill="#ffe2b3"/><g fill="#89664c"><path d="M24.7 34.9c3.5.7 5.7 1 7.3 4.7"/><path d="M39.3 34.9c-3.5.7-5.7 1-7.3 4.7"/><path d="M28.4 54.1c1.4-2 2.3-4.4 2.8-6.9s.8-5 .7-7.6c.3 2.5.3 5.1 0 7.7c-.2 1.3-.4 2.6-.8 3.8c-.4 1.3-.9 2.5-1.5 3.7l-1.2-.7"/></g></svg>
        <p class="text-white font-black">BAVEL</p>
      </div>
    </div>
  </div>
  <div v-else>
    <VueQueryDevTools />
    <Environment />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { useQuery, useQueryProvider } from "vue-query";
import { useLogin, useLogout, useToken } from './hooks/useQueries';
import Zelda from './Components/Zelda.vue'
import VueQueryDevTools from "./DevTools.vue";
const Environment = defineAsyncComponent(() =>
  import("./Environment/Environment.vue")
);
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