<template>
  <div class="flex-grow p-2">
    WORKSPACE SETTINGS
  </div>
</template>

<script setup lang="ts">
  import Editor from '../Editor/Editor.vue'
  import { reactive } from 'vue'
  import { useDocument } from '../hooks/useDocuments'
  import { currentDocument } from '../hooks/useDocuments'

  const { data, isLoading, isError } = useDocument(reactive(currentDocument))
</script>