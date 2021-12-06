<template>
  <div class="w-full p-2">
    <div v-if="isLoading || isIdle" class="space-y-4">
      <div v-for="_ in Array(6)">
        <div class="w-full h-16 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
    <div v-else>
      <div v-for="workspace in data">
        <Workspace :workspace="workspace" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useToken } from "../hooks/useTokens";
import { useWorkspaces } from "../hooks/useWorkspaces";
import Workspace from "./Workspace.vue";
const { data: user } = useToken()
const { isLoading, isIdle, isError, isFetching, data, error, refetch } = useWorkspaces();
</script>