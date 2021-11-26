<template>
    <div class="relative z-50 inline-block text-left">
      <Menu>
        <MenuButton
            ref="trigger"
            class="w-8 h-8 rounded-full bg-orange-500"
          >
          </MenuButton>
        <div ref="container" class="w-56">
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
                  class="flex rounded-tl-md rounded-tr-md justify-between px-4 py-2 group hover:bg-indigo-400 hover:text-white">
                    <div class="flex items-center space-x-2">
                      <I icon="ri:emotion-laugh-line" />
                      <span class="whitespace-nowrap">User Profile </span>
                    </div>
                  </div>
                </MenuItem>
              </div>
              <div>
                <MenuItem>
                  <div 
                  class="flex justify-between px-4 py-2 group hover:bg-indigo-400 hover:text-white">
                    <div class="flex items-center space-x-2">
                      <I icon="ri:settings-3-line" />
                      <span class="whitespace-nowrap">Settings </span>
                    </div>
                  </div>
                </MenuItem>
              </div>
              <div>
                <MenuItem>
                  <div 
                  class="flex justify-between px-4 py-2 group hover:bg-indigo-400 hover:text-white">
                    <div class="flex items-center space-x-2">
                      <I icon="ri:code-s-slash-line" />
                      <span class="whitespace-nowrap">API </span>
                    </div>
                  </div>
                </MenuItem>
              </div>
              <div>
                <MenuItem>
                  <div 
                  class="flex rounded-bl-md rounded-br-md justify-between px-4 py-2 group hover:bg-indigo-400 hover:text-white">
                    <div class="flex items-center space-x-2">
                      <I icon="ri:logout-circle-r-line" />
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
</template>

<script lang="ts">
import { defineComponent, h, ref, onMounted, watchEffect, watch, computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { usePopper } from '../hooks/usePopper'
import { Icon as I } from './Icon'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default {
  components: { Menu, MenuButton, MenuItems, MenuItem, I },
  setup(props, context) {
    const isMac = computed(() => window.navigator.userAgent.includes('Mac'))
    let [trigger, container] = usePopper({
      placement: 'bottom-end',
      strategy: 'fixed',
      modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
    })
    function resolveClass({ active, disabled }) {
      return classNames(
        'flex justify-between w-full px-4 py-2 text-sm leading-5 text-left',
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
        disabled && 'cursor-not-allowed opacity-50'
      )
    }
    return {
      trigger,
      container,
      resolveClass,
      isMac
    }
  },
}
</script>