<template>
  <div class="w-96">
    <div v-if="isLoading">
      Loading...
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