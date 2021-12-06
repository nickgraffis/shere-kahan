<template>
  <div class="flex-grow overflow-y-scroll overflow-x-hidden">
    <div v-if="data" class="py-6 mx-auto px-6 space-y-4">
      <h1 class="text-3xl font-black">{{data.data.name}}</h1>
      <div>
        <h1 class="text-xl font-bold">The Team</h1>
        <p class="italic text-sm">Does not include accounts that are shared to individual documents.</p>
        <div class="flex my-4">
          <div v-for="(account, index) in data.data.accounts">
            <img
            class="w-12 border-4 border-cyan-300 h-12 ring-4 ring-white rounded-full"
            :src="`
              https://bavel-avatar.netlify.app/api/hello-world?seed=
            ${account.id}
            `" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useWorkspace } from "../hooks/useWorkspaces";

const route = useRoute()
const { isLoading, data, isError, error } = useWorkspace(route.params.id)
</script>
