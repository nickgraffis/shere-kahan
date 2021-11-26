<template>
  <App />
</template>

<script setup lang="ts">
import { useQueryProvider } from 'vue-query';
import App from './App.vue'
useQueryProvider();
</script>