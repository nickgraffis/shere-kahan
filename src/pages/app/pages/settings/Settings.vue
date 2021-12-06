<template>
  <div class="flex-grow overflow-y-scroll overflow-x-hidden">
    <div class="py-6 mx-auto max-w-1xl">
      <div
        v-if="user"
        class="space-y-2"
      >
        <div class="space-x-4 flex items-start">
          <div class="p-1 rounded-lg border-black border-3">
            <ri:pencil-ruler-2-line class="w-9 h-9" />
          </div>
          <div>
            <p class="text-3xl font-bold">
              Tools
            </p>
            <p class="text-sm">
              Customize your experience by changing all the tools in both your toolbar, bubble menu, and 
              floating menu.
            </p>
          </div>
        </div>
        <div
          v-for="tool in user?.account.data.settings.tools"
          :key="tool.id"
        >
          <div class="space-y-3 my-3">
            <p class="text-3xl font-bold">
              {{ tool.title }}
            </p>
            <p class="text-sm">
              <span v-html="tool.desc" />
            </p>
          </div>
          <div
            v-for="mark in tool.buttons"
            :key="mark.id"
          >
            <ToolSetting 
              demo="<p>Bold text can help you <b>emphasize</b> your words.</p>"
              :title="mark.desc"
              :desc="mark.desc"
              advanced-desc="Toggle the text to bold."
              :icon="mark.icon"
              :hot-key="mark.hotKey"
              :import-tool="mark.import"
              :bubble="mark.bubble"
              :nest="mark.nest"
              :hide="mark.hide"
            />
          </div>
        </div>
        <!-- <ToolSetting 
          demo="<p>Bold text can help you <b>emphasize</b> your words.</p>"
          title="Bold"
          desc="Bold"
          advanced-desc="Toggle the text to bold."
          icon="ri:bold"
          hot-key="mod+b"
        />
        <ToolSetting 
          demo="<p>Sometimes italics can offer a <i>more suttle</i> emphasis.</p>"
          title="Italic"
          desc="Italic"
          advanced-desc="Toggle the text to italic."
          icon="ri:italic"
          hot-key="mod+i"
        />
        <ToolSetting 
          demo="<p>Using <u>underline</u> is often for links, but anything you want 😀.</p>"
          title="Underline"
          desc="Underline"
          advanced-desc="Toggle the text to underline."
          icon="ri:underline"
          hot-key="mod+u"
        />
        <ToolSetting 
          demo="<p>Sometimes you make <strike>mistakes</strike>.</p>"
          title="Strikethrough"
          desc="Striketrough"
          advanced-desc="Toggle the text to strikethrough."
          icon="ri:strikethrough"
          hot-key="mod+shift+x"
        /> -->
        <p class="text-3xl font-bold">
          Markdown Shortcuts
        </p>
        <p class="text-sm">
          Markdown shortcuts can make it really quick and easy to make well formatted text without
          leaving your keyboard. You can customize your markdown commands here.
        </p>
        <div class="flex space-x-2">
          <div
            :class="true ? '' : 'text-gray-400'"
            class="flex items-center mr-4 my-2"
          >
            <input
              type="checkbox"
              class="opacity-0 absolute h-6 w-6"
            >
            <div class="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
              <svg
                class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
                version="1.1"
                viewBox="0 0 17 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-9 -11)"
                    fill="#1F73F1"
                    fill-rule="nonzero"
                  >
                    <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                  </g>
                </g>
              </svg>
            </div>
            <label class="select-none">
              <div class="text-5xl font-black">
                <h1># Heading</h1>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToken } from "@/hooks/useTokens"
import ToolSetting from "./ToolSetting.vue"
const { data: user } = useToken()
</script>