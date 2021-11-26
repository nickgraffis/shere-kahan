<template>
  <Environment />
</template>

<script lang="ts">
  import Environment from './Environment/Environment.vue'
  import { defineComponent } from "vue";
  import { useQuery, useQueryProvider } from "vue-query";
  export default defineComponent({
    name: "App",
    components: { Environment },
    setup() {
      useQueryProvider();
    },
  })
</script>