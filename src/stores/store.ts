import { ref } from 'vue'
import { defineStore } from 'pinia'

export const UserState = defineStore('UserState', {
  state: () => ({
    login: false,
    userName: ''
  }),
  actions: {
    setLogin(val: boolean) {
      this.login = val
    },
    setUserName(val: string) {
      this.userName = val
    }
  }
})
// export const UserState = defineStore('user', {
//   state: () => ({
//     login: false, // Add the login property to the state
//     userName: '' // Add userName property if not already present
//   }),
//   actions: {
//     setLogin(val: boolean) {
//       this.login = val;
//     },
//     setUserName(val: string) {
//       this.userName = val;
//     }
//   }
// });