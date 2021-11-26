import { Editor } from "@tiptap/vue-3";
import { defineComponent } from "vue";
import { BubbleMenu as BaseBubbleMenu } from "./BubbleMenu";
import { Icon } from "../../Components/Icon";

export const BubbleMenu = defineComponent({
  props: {
    editor: Editor 
  },
  render() {
    return (<>
      { this.editor && 
        <>
          <BaseBubbleMenu
          class="flex text-white justify-center bg-blue-gray-800 rounded-md p-2 space-x-2"
          editor={this.editor}
          >
            <div class="space-x-2">
              <div 
              class={`h-7 w-7 flex items-center justify-center 
              rounded-md hover:text-black hover:bg-blue-gray-300
              cursor-pointer transition-colors duration-150`}
              >
                <Icon icon="bold" />
              </div>
            </div>
            <div class="w-0.5 h-full bg-blue-gray-300"></div>
          </BaseBubbleMenu>
        </>
      }
    </>)
  }
})

