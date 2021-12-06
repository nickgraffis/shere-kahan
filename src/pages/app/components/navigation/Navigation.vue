<template>
  <div class="w-full px-4 py-3 bg-white flex justify-between border-b-4 border-black">
    <div class="flex space-x-4 items-center font-black text-2xl">
      <Shere />
      <span>SHERE</span>
      <span class="p-1 ring-2 ring-black text-xs font-semibold rounded-lg">ALPHA</span>
    </div>
    <input class="bg-gray-400" ref="search" type="text" />
    <User />
  </div>
</template>

<script setup lang="ts">
import Shere from '@shared/components/Shere.vue'
import User from './User.vue'
</script>