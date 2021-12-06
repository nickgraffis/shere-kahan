import App from "./App.vue"
import { createApp } from "vue"
import { createHead } from "@vueuse/head"
// TODO: we should just write tailiwind toast into a vue package
// and includes types for this
import Notifications from "notiwind"
import "virtual:windi.css"
import { router } from "./router"

// App entry point
const app = createApp(App)
// Head for managing meta data
app.use(createHead())
app.use(Notifications)
app.use(router)
app.mount("#app")