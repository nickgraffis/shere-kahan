import { createApp } from 'vue'
import SuperApp from './SuperApp.vue'
import 'virtual:windi.css'
import Codemirror from "codemirror-editor-vue3";
// plugin-style
import "codemirror-editor-vue3/dist/style.css";
import { createHead } from '@vueuse/head'
const head = createHead()
const app = createApp(SuperApp)
app.use(Codemirror)
app.use(head)
app.mount('#app')
