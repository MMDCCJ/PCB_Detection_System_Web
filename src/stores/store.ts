import { ref } from 'vue'
import { defineStore } from 'pinia'

export const UserState = defineStore('UserState', () => {
  const value = ref<{ [key: string]: boolean | string }>({
    login: false,
    user_name: ''
  });
  function setLogin(val: boolean) {
    value.value.login = val;
  }
  function getValue(arg: string) {
    return value.value[arg];
  }
  function setUserName(val: string) {
    value.value.user_name = val;
  }
  return { setLogin, getValue, setUserName }
})
