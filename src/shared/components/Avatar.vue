<template>
  <img
    :class="className"
    :src="`
    https://bavel-avatar.netlify.app/api/hello-world?seed=
     ${id}
  `" 
  >
</template>

<script setup lang="ts">
defineProps({
	id: {
		type: String,
		required: true,
	},
	className: {
		type: String,
		default: "w-12 h-12",
	}
})
</script>