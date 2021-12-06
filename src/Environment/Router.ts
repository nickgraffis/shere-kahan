import { Component, defineAsyncComponent, defineComponent, h } from "vue"

const NotFoundComponent = defineComponent({
  render() {
    return h("div", "Not Found")
  }
})

const routes: { [key:string]: Component} = {
  '/': defineAsyncComponent({
    loader: () => import('./EditorStage.vue'),
  }),
  '/settings/:id': defineAsyncComponent({
    loader: () => import('./WorkSpaceSettings.vue'),
  })
}

export const Router = defineComponent({
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFoundComponent
    }
  },

  render() {
    return h(this.CurrentComponent)
  }
})
