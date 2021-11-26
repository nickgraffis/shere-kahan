<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="w-full px-4 py-3 bg-white flex justify-between">
      <div class="flex space-x-4 items-center font-bold text-xl">
        <Zelda />
        <span>SHERE KAHAN</span>
        <span class="p-1 ring-2 ring-black text-xs font-semibold rounded-lg">ALPHA</span>
      </div>
      <User />
    </div>
    <div class="flex-grow flex">
      <Folders />
      <div class="flex-grow">
        <Editor />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Editor from '../Editor/Editor.vue'
  import User from '../Components/User.vue'
  import Zelda from '../Components/Zelda.vue'
  import Folders from '../Components/Folders.vue'
  import { defineComponent } from "vue";
  import { useQuery, useQueryProvider } from "vue-query";
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  useQueryProvider();
</script>