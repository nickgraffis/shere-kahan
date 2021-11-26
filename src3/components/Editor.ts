import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { Highlight } from "./SelectPlugin";

export const editor = {
  editorProps: {
    attributes: {
      class: 'w-full h-full focus:outline-none py-4',
    },
  },
  extensions: [
    StarterKit,
    Highlight.configure({ multicolor: true }),
    Typography,
    TaskList,
    Link,
    TaskItem.configure({
      nested: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
}