import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import Codemirror from "codemirror-editor-vue3";
// plugin-style
import "codemirror-editor-vue3/dist/style.css";
const app = createApp(App)
app.use(Codemirror)
app.mount('#app')
