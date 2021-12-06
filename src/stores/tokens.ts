import { defineStore } from 'pinia'


export const useStore = defineStore('tokens', {
  state: () => {
    return {
      tokens: []
    }
  },
  actions: {
    async login(login: string, password: string) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // let the form component display the error
        return error
      }
    },
  },
})