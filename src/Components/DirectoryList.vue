<template>
  <div v-if="directories">
    <div v-for="dir in directories">
      <div>
        <div class="w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200">
          <div class="flex space-x-2 items-center flex-grow">
            <ri:folder-line class="flex-shrink-0" />
            <span class="whitespace-nowrap">{{ dir.data.name }}</span>
          </div>
          <eva:arrow-down-fill class="transform transition-transform duration-150" :class="dir?.showChildren ? 'rotate-0' : '-rotate-90'"/>
        </div>
        <div 
        class="ml-4 transition-all duration-150" 
        :class="dir?.showChildren ? 'h-0' : 'h-96'"
        v-if="dir?.children && dir?.children.length">
          <DirectoryList :directories="dir?.children"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { directories } = defineProps<{ directories: any }>()
</script>