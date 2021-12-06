<template>
  <div class="flex-grow">
    <div class="h-full">
      <Editor :key="currentDocument" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from "./Editor/Editor.vue"
import { reactive } from "vue"
import { useDocument, useCurrentDocument } from "@hooks/useDocuments"
const {  currentDocument } = useCurrentDocument()
const { isLoading } = useDocument(currentDocument)
</script>