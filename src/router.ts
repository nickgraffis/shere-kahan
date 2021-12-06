import { reactive } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { currentDocument } from "./hooks/useDocuments"
import { isAuthenticated as isAuthenticatedRef } from "@hooks/useTokens"

const isAuthenticated = reactive(isAuthenticatedRef)
const Alpha = () => import('./pages/alpha/Alpha.vue')
const App = () => import('./pages/app/App.vue')
const EditorStage = () => import('./pages/app/components/editor/EditorStage.vue')
const Settings = () => import('./pages/app/pages/settings/Settings.vue')
const User = () => import('./pages/app/pages/user-profile/User.vue')
// const Api = () => import('./Environment/Api.vue')
const Workspace = () => import('./pages/app/pages/workspace/Workspace.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: App,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'settings',
          path: '/settings',
          component: Settings
        },
        {
          name: 'user',
          path: '/user',
          component: User
        },
        // {
        //   name: 'api',
        //   path: '/api',
        //   component: Api
        // },
        {
          name: 'workspace',
          path: '/:id',
          component: Workspace,
        },
        {
          name: 'document',
          path: '/:id/:documentId',
          beforeEnter: (to, from, next) => {
            if (!isAuthenticated.value) {
              next({ name: 'welcome' })
            } else {
              currentDocument.value = to.params.documentId[0]
              next()
            }
          },
          component: EditorStage
        }
      ]
    },
    {
      name: 'welcome',
      path: '/welcome',
      component: Alpha,
    }
  ],
})

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      console.log('not authenticated')
      next({
        path: '/welcome',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})