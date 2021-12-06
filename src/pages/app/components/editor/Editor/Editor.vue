<template>
  <div class="relative h-full flex flex-col">
    <div class="editor flex-grow overflow-y-scroll overflow-x-hidden">
      <div class="mx-auto h-full flex flex-col">
        <div v-if="!data">
          <ToolBar 
            :editor="{}"
            :toolbar="toolbarData"
            :saved="'mounting'"
          />
        </div>
        <div
          v-if="isLoading"
          class="flex-grow flex items-center justify-center"
        >
          Loading...
        </div>
        <div
          v-if="isError"
          class="flex-grow flex items-center justify-center"
        >
          <div class="space-y-4">
            <p>{{ error }} </p>
            <div class="flex justify-center">
              <div
                class="px-4 py-2 text-white font-semibold bg-rose-500 rounded-lg cursor-pointer"
                @click="refetch()"
              >
                Try Again
              </div>
            </div>
          </div>
        </div>
        <EditorPage 
          v-if="data"
          :key="currentDocumentKey"
          :data="data"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToolBar from "./ToolBar/ToolBar.vue"
import { toolbarData } from "./ToolBar/data"
import EditorPage from "./EditorPage.vue"
import { reactive, ref, watch, watchEffect } from "vue"
import { useCurrentDocument } from "@hooks/useDocuments"
import { useDocument } from "@hooks/useDocuments"
import { Editor } from "@tiptap/vue-3"
import { useEditor } from "@hooks/useEditor"
const { currentDocument } = useCurrentDocument()
const currentDocumentKey = reactive(currentDocument)
console.log("CURDOC", currentDocument.value)
const { isLoading, data, isError, error, refetch } = useDocument(currentDocument)

</script>

<style lang="css">
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0D0D0D;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}

/* width */
.editor::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.editor::-webkit-scrollbar-track {
  @apply bg-gray-300;
}
 
/* Handle */
.editor::-webkit-scrollbar-thumb {
  @apply bg-gray-600;
}

/* Handle on hover */
.editor::-webkit-scrollbar-thumb:hover {
  @apply bg-black;
}

/* Placeholder (on every new line) */
.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}
</style>