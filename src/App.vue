<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { useQueryProvider } from "vue-query";
// We use a custom queryClient because we want
// to use query client outside of setup functions
import { queryClient } from "./hooks/useQueries";
// Setup the query provider
useQueryProvider(queryClient);
</script>
