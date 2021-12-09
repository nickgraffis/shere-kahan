<template>
  <div class="flex space-x-6 items-center">
    <div 
      v-if="currentDocument"
      :class="saved ? 'bg-green-500' : 'bg-rose-500'"
      class="py-1 px-2 text-white rounded-lg cursor-pointer text-xs font-semibold whitespace-nowrap"
      @click="saveDocument"
    >
      {{ saved ? 'Saved' : 'Save' }}
    </div>
    <jam:universe class="w-6 h-6 hover:text-black text-gray-700 flex-shrink-0" />
    <jam:lifebuoy class="w-6 h-6 hover:text-black text-gray-700 flex-shrink-0" />
    <jam:lightbulb class="w-6 h-6 hover:text-black text-gray-700 flex-shrink-0" />
    <jam:bug
      class="w-6 h-6 hover:text-black text-gray-700 flex-shrink-0"
      @click="isOpen = true"
    />
    <jam:bell class="w-6 h-6 hover:text-black text-gray-700 flex-shrink-0" />
    <div
      v-if="data"
      class="relative z-50 inline-block text-left flex-shrink-0"
    >
      <Menu>
        <MenuButton
          ref="trigger"
        >
          <Avatar
            :id="data.account.ref['@ref'].id"
            class-name="w-12 h-12 flex-shrink-0"
          />
        </MenuButton>
        <div
          ref="container"
          class="w-56"
        >
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="z-50 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div>
                <MenuItem>
                  <div 
                    class="cursor-pointer flex rounded-tl-md rounded-tr-md justify-between px-4 py-2 group hover:bg-black hover:text-white"
                  >
                    <div class="flex items-center space-x-2">
                      <span class="whitespace-nowrap">Hi, {{ data.account.data.name }}</span>
                    </div>
                  </div>
                </MenuItem>
              </div>
              <div>
                <MenuItem @click="router.push('/user')">
                  <div 
                    class="cursor-pointer flex rounded-tl-md rounded-tr-md justify-between px-4 py-2 group hover:bg-black hover:text-white"
                  >
                    <div class="flex items-center space-x-2">
                      <jam:user-circle />
                      <span class="whitespace-nowrap">User Profile </span>
                    </div>
                  </div>
                </MenuItem>
              </div>
              <div>
                <MenuItem @click="router.push('/settings')">
                  <div 
                    class="flex justify-between px-4 py-2 group hover:bg-black cursor-pointer  hover:text-white"
                  >
                    <div class="flex items-center space-x-2">
                      <jam:cog />
                      <span class="whitespace-nowrap">Settings </span>
                    </div>
                  </div>
                </MenuItem>
              </div>
              <div>
                <MenuItem @click="router.push('/api')">
                  <div 
                    class="flex justify-between px-4 py-2 group hover:bg-black cursor-pointer  hover:text-white"
                  >
                    <div class="flex items-center space-x-2">
                      <jam:code />
                      <span class="whitespace-nowrap">API </span>
                    </div>
                  </div>
                </MenuItem>
              </div>
              <div>
                <MenuItem @click="logout()">
                  <div 
                    class="flex rounded-bl-md rounded-br-md justify-between px-4 py-2 group hover:bg-black cursor-pointer  hover:text-white"
                  >
                    <div class="flex items-center space-x-2">
                      <jam:log-out />
                      <span class="whitespace-nowrap">Logout </span>
                    </div>
                  </div>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </div>
      </Menu>
    </div>
    <TransitionRoot
      appear
      :show="isOpen"
      as="template"
    >
      <Dialog
        as="div"
        :open="isOpen"
        @close="setIsOpen"
      >
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-4 text-center bg-black bg-opacity-25">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0" />
            </TransitionChild>
            <span
              class="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div class="w-full max-w-md px-6 py-4 align-middle inline-block transition-all transform bg-white shadow-xl rounded-2xl">
                <div class="flex w-full justify-center">
                  <div class="bg-orange-500 bg-opacity-50 text-orange-500 p-4 rounded-lg">
                    <jam:bug class="w-8 h-8" />
                  </div>
                </div>
                <DialogTitle>Bug Report</DialogTitle>
                <div class="space-y-2">
                  <p>Hey! Thanks for reporting, can you describe the bug?</p>
                  <div class="w-full h-48 border-2 border-black rounded-lg" />
                  <p>What are some relevant categories for this bug?</p>
                </div>

                <div class="space-x-4 mt-4">
                  <button @click="setIsOpen(false)">
                    Report Bug
                  </button>
                  <button @click="setIsOpen(false)">
                    Cancel
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import {
	Dialog,
	DialogOverlay,
	DialogTitle,
	DialogDescription,
} from "@headlessui/vue"
import Avatar from "@shared/components/Avatar.vue"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import { usePopper } from "@hooks/usePopper"
import { Icon as I } from "@shared/components/Icon"
import { useLogout, useToken } from "@hooks/useTokens"
import { useRouter } from "vue-router"
import { useEditor } from "@/hooks/useEditor"
import { useCurrentDocument, useUpdateDocument } from "@/hooks/useDocuments"
const { currentDocument } = useCurrentDocument()
const { saved, save } = useEditor()
const { data: accessToken } = useToken()
const updateDocument = useUpdateDocument()
const saveDocument = () => {
	save(updateDocument, accessToken)
}
let isOpen = ref(false)
const setIsOpen = (value) => {
	isOpen.value = value
}
const l = useLogout()
const logout = () => l.mutate()
const { data } = useToken()
let [trigger, container] = usePopper({
	placement: "bottom-end",
	strategy: "fixed",
	modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
})
const router = useRouter()
</script>