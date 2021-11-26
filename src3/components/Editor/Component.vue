<template>
  <node-view-wrapper class="vue-component">
    <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="test placeholder"
    :height="200"
  />
    <node-view-content class="content" />
  </node-view-wrapper>
</template>

<script lang="ts">
import Codemirror from "codemirror-editor-vue3";

// plugin-style
import "codemirror-editor-vue3/dist/style.css";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
import "codemirror/theme/dracula.css"

import { ref } from "vue"
// more codemirror resources
// import 'codemirror/some-resource...'
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'
export default {
  components: {
    Codemirror,
    NodeViewWrapper,
    NodeViewContent,
  },
  setup() {
    const code = ref(`
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`)
return {
      code,
      cmOptions:{
        mode: 'text/javascript', // Language mode
        theme: 'dracula', // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      }
    };
   },
}
</script>

<style lang="css"> 
.vue-component {
  background: #FAF594;
  border: 3px solid #0D0D0D;
  border-radius: 0.5rem;
  margin: 1rem 0;
  position: relative;
}

.label {
  margin-left: 1rem;
  background-color: #0D0D0D;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
}

.content {
  margin: 2.5rem 1rem 1rem;
  padding: 0.5rem;
  border: 2px dashed #0D0D0D20;
  border-radius: 0.5rem;
}
</style>