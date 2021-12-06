<template>
  <div>
    <div v-for="dir in directories">
      <div v-if="dir.ref.collection.id === 'directories'">
        <div
          @click="expandFolder(dir.ref.id)"
          class="w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200"
        >
          <div class="flex space-x-2 items-center flex-grow">
            <ri:folder-line class="flex-shrink-0" />
            <span class="whitespace-nowrap">{{ dir?.data.name }}</span>
            <span class="whitespace-nowrap">{{ dir?.ref.id }}</span>
          </div>
          <eva:arrow-down-fill
            class="transform transition-transform duration-150"
            :class="expanded.includes(dir.ref.id) ? 'rotate-0' : '-rotate-90'"
          />
        </div>
        <div
          class="ml-4 transition-all duration-150"
          v-if="dir?.children.length && expanded.includes(dir.ref.id)"
        >
          <DirectoryList :directories="dir?.children" />
        </div>
      </div>
      <div class="ml-4">
        <div
          @click="setCurrentDocument(dir.ref.id)"
          class="w-full items-center space-y-2 px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-black hover:text-white"
        >
          <p class="font-bold whitespace-nowrap truncate">
            {{ dir.data.name }}
          </p>
          <div class="text-xs whitespace-nowrap flex items-end">
            <span>Updated {{ simpleDate(dir.data?.lastUpdated?.at || null) }} by</span>
            <img class="h-4 w-4 rounded-full mx-1" :src="`https://bavel-avatar.netlify.app/api/hello-world?seed=
            ${dir.data?.lastUpdated?.by.id}`" />
            <span>{{ dir.data?.lastUpdated?.by.name || 'Unknown' }}</span>
          </div>
        </div>
        <div
          class="ml-4 transition-all duration-150"
          v-if="dir?.children.length && (expanded.includes(dir.ref.id) || childIdArray(dir.children).includes(curDoc))"
        >
          <DirectoryList :directories="dir?.children" />
        </div>
      </div>
    </div>
    <!-- <div v-if="creatingDirectory" class="w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 bg-purple-200">
      <div class="flex space-x-2 items-center flex-grow">
        <ri:folder-line class="flex-shrink-0" />
        <input ref="directoryInput" class="appearance-none bg-purple-200" />
      </div>
    </div>
    <div v-else @click="createDirectory()" class="w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-purple-200">
      <div class="flex space-x-2 items-center flex-grow">
        <ri:add-box-line class="flex-shrink-0" />
        <span class="whitespace-nowrap">Create Directory</span>
      </div>
    </div> -->
    <div class="ml-4">
      <div
        @click="createDocument()"
        class="cursor-pointer w-full items-center flex font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:text-white hover:bg-black"
      >
        <div class="flex space-x-2 items-center flex-grow">
          <ri:file-add-line class="flex-shrink-0" />
          <span class="whitespace-nowrap">Create Document</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { simpleDate } from '../../utils/dates'
import { reactive, ref } from "vue";
import { currentDocument, useCreateDocument } from "../hooks/useDocuments";
import { useRouter } from 'vue-router';
const curDoc = reactive(currentDocument)
const { directories, workspace } = defineProps<{ directories: any; workspace: any }>();
const expanded = ref<string[]>([]);
const creatingDirectory = ref<boolean>(false);
const directoryInput = ref<HTMLInputElement | null>(null);
const goToSettings = () => window.history.pushState(null, '', `/settings/id`);
const expandFolder = (id: string) => {
  if (expanded.value.includes(id)) {
    expanded.value = expanded.value.filter((i) => i !== id);
  } else {
    expanded.value.push(id);
  }
};
const createDoc = useCreateDocument();
const createDocument = () => {
  createDoc.mutate({
    name: "New Document",
    parent: workspace.ref.id,
  });
};

const childIdArray = (children: any, array: string[] = []) => {
  if (children.length === 0) {
    return array;
  }
  children.forEach((child) => {
    array.push(child.ref.id);
    childIdArray(child.children, array);
  });

  return array
};

const router = useRouter();
const setCurrentDocument = (id: string) => {
  expandFolder(id)
  currentDocument.value = id;
  console.log(id)
  console.log(workspace.ref.id)
  router.push({
    name: 'document',
    params: {
      documentId: id,
      id: workspace.ref.id,
    },
  });
};

const createDirectory = () => {
  creatingDirectory.value = true;
  setTimeout(() => {
    directoryInput.value?.focus();
  }, 10);
};
</script>
