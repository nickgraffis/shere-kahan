<template>
  <div v-if="user" class="w-screen h-screen flex flex-col">
    <div class="w-full px-4 py-3 bg-white flex justify-between border-b-4 border-black">
      <div class="flex space-x-4 items-center font-black text-2xl">
        <Zelda />
        <span>SHERE</span>
        <span class="p-1 ring-2 ring-black text-xs font-semibold rounded-lg">ALPHA</span>
      </div>
      <input class="bg-gray-400" ref="search" type="text" />
      <User />
    </div>
    <div class="flex-grow flex">
      <div
        class="folders flex-shrink-0 overflow-x-hidden overflow-y-auto"
        :style="{ width: computedFoldersX + 'px' }"
      >
        <Folders />
      </div>
      <div ref="bar" class="w-1 cursor-move h-full bg-black flex-shrink-0 z-20"></div>
      <!-- <div class="flex-grow p-2">
        <div v-if="currentDocument && data">
          <Editor :data="data" />
        </div>
        <div v-else>
          Nothing to see here
        </div>
      </div> -->
      <router-view></router-view>
    </div>
  </div>
  <NotificationGroup group="foo" position="bottom">
    <div
      class="fixed inset-x-0 bottom-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none"
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            class="flex w-full bg-black max-w-sm mx-auto mt-4 overflow-hidden rounded-lg shadow-md"
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div class="px-4 py-2 -mx-3 text-white">
              <div class="mx-3">
                <span class="font-semibold">{{ notification.title }}</span>
                <p class="text-sm">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
  <VueQueryDevTools />
</template>

<script setup lang="ts">
import Editor from "../Editor/Editor.vue";
import User from "../Components/User.vue";
import Zelda from "../Components/Zelda.vue";
import Folders from "../Components/Folders.vue";
import { Router } from "./Router";
import { computed, reactive, ref, watchEffect } from "vue";
import { onKeyStroke, useDraggable } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";
import { useHead } from "@vueuse/head";
import { useDocument } from "../hooks/useDocuments";
import { currentDocument } from "../hooks/useDocuments";
import { VueQueryDevTools } from "vue-query/devtools";
import { useToken } from "../hooks/useTokens";
import { useRoute, useRouter } from "vue-router";
import { queryClient } from "../hooks/useQueries";
// because we set the background color in the head to black for the alpha
// view. we do this because then there is no white flash. but we then need
// to change the background color back to white when we get out of the alpha
// view, because the head style will take precedence over the windi styles.
useHead({
  style: [
    {
      children: `body {background-color: white}`,
    },
  ],
});
const route = useRoute()
const test = ref(queryClient.getQueryData("token"));
const { width, height } = useWindowSize();
const bar = ref<HTMLElement | null>(null);
const { x: foldersX } = useDraggable(bar, {
  initialValue: { x: 350, y: 40 },
});
const { data: user } = useToken();
const { data } = useDocument(reactive(currentDocument));
const computedFoldersX = computed(() => {
  return foldersX.value > 200
    ? foldersX.value < width.value / 2
      ? foldersX.value
      : width.value / 2
    : 0;
});

const search = ref<HTMLInputElement | null>(null);
const router = useRouter();

onKeyStroke('Enter', (_) => {
    // why is ts making me check with twice?
    router.push({
        name: 'workspace',
        params: {
            id: search.value?.value
        }
    })
    currentDocument.value = search.value;
  })
</script>

<style lang="css">
/* width */
.folders::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.folders::-webkit-scrollbar-track {
  @apply bg-gray-300;
}

/* Handle */
.folders::-webkit-scrollbar-thumb {
  @apply bg-gray-600;
}

/* Handle on hover */
.folders::-webkit-scrollbar-thumb:hover {
  @apply bg-black;
}
</style>
