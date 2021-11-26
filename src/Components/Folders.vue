<template>
  <div class="w-full p-2">
    <div v-if="isLoading" class="space-y-4">
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
import Workspaces from "./DirectoryList.vue"
import { useDirectories, useWorkspaces } from "../hooks/useQueries";
import { ref, unref } from "vue";
import DirectoryList from "./DirectoryList.vue";
import Workspace from "./Workspace.vue";
const { isLoading, isError, isFetching, data, error, refetch } = useWorkspaces();
</script>