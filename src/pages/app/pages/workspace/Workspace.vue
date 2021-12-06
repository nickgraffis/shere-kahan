<template>
  <div class="flex-grow overflow-y-scroll overflow-x-hidden">
    <div v-if="data" class="py-6 mx-auto px-6 space-y-4">
      <h1 class="text-4xl font-bold">{{data.workspace.data.name}}</h1>
      <p>
        Welome to the Shere Documentation Workspace! The goal of this workspace is
        to provide both user and developer documentation for the Shere project. As 
        this is the alpha version of the workspace. If you are a developer you currently
        have administrative privledges to the workspace.
      </p>
      <div>
        <h1 class="text-3xl font-bold">The Team</h1>
        <p class="italic text-sm">Does not include accounts that are shared to individual documents.</p>
        <div class="my-4 w-full grid grid-cols-12 gap-4">
          <div v-for="(account, index) in data.workspace.data.accounts" class="col-span-12 md:col-span-6 rounded-lg p-4 space-y-2">
            <div class="flex space-x-2 items-start mb-4">
              <img
              class="w-12 border-4 border-cyan-300 h-12 ring-4 ring-white rounded-full"
              :src="`
                https://bavel-avatar.netlify.app/api/hello-world?seed=
            ${account.id}
              `" 
              />
              <div>
                <p class="font-bold text-3xl">{{ account.name }} Nick</p>
                <p class="text-sm">09/19/1992</p>
              </div>
            </div>
            <ul>
              <li v-for="permission in permissions">
                <div :class="permissionValues[permission.key] ? '' : 'text-gray-400'">
                  <div class="flex items-start mr-4 mb-2">
                  <input @change="toggle(permission.key)" type="checkbox" :id="permission.key" :name="permission.key" v-model="permissionValues[permission.key]" class="opacity-0 absolute h-6 w-6" />
                  <div class="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500 mt-1">
                    <svg class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fill-rule="evenodd">
                      <g transform="translate(-9 -11)" fill="#1F73F1" fill-rule="nonzero">
                      <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                    </svg>
                  </div>
                  <label :for="permission.key" class="select-none">
                    <p>{{ permission.label }}</p>
                    <p class="text-xs">{{ permission.description }}</p>
                  </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useWorkspace } from "@hooks/useWorkspaces";
import { Ref, ref } from "@vue/reactivity";
import { reactive } from "vue";

const route = useRoute()

const { isLoading, data, isError, error } = useWorkspace(route.params.id)
const permissionValues: Ref<{[key: string]: boolean}> = ref({
  admin: false,
  read: false,
  write: false,
  delete: false,
  update: false,
})

const permissions = [
  {
    key: "admin",
    label: "Administrative",
    description: "User can edit the workspace data and change user permissions."
  },
  {
    key: "create",
    label: "Create",
    description: "User can create new documents, and nested documents witin those."
  },
  {
    key: "read",
    label: "Read",
    description: "User can read all documents."
  },
  {
    key: "update",
    label: "Update",
    description: "User can update current documents, but not document permissions."
  },
  {
    key: "delete",
    label: "Delete",
    description: "User can delete documents, including recursivly."
  }
]

const toggle = (key: string) => {
  if (key === 'admin') {
    permissions.forEach(permission => {
      if (permission.key !== 'admin') {
        permissionValues.value[permission.key] = permissionValues.value.admin
      }
    })
  }
}
</script>

<style scoped>
input:checked + div {
  @apply border-blue-500;
}
input:checked + div svg {
  @apply block;
}
</style>