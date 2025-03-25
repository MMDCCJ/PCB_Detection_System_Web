<template>
  <div id="app" class="main">
    <div v-if="!login">
      <router-view></router-view>
    </div>
    <div v-if="login">
      <el-row>

        <Head />
      </el-row>
      <el-row class="tac">
        <Left_navigation_bar />
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Left_navigation_bar from "./components/Left_navigation_bar.vue";
import Head from './components/Head.vue'
import { checkLogin } from './API/API'
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router'
import { UserState } from './stores/store'
import { ElMessage } from 'element-plus'
import { storeToRefs } from "pinia";
const router = useRouter()
const UserStore = UserState()
const { login } = storeToRefs(UserStore)
onBeforeMount(() => {
  checkLogin().then((res) => {
    const currentUrl = window.location.href;
    const queryUrl = currentUrl.replace(window.location.origin, '');
    if (res.data.code === 200) {
      console.log('已登录')
      UserStore.setUserName(res.data.data['user_name'])
      UserStore.setLogin(true)
      console.log(queryUrl)
      if (queryUrl == "/login") {
        return router.push('/main')
      }
      router.push(queryUrl)
    } else {
      UserStore.setLogin(false)
      ElMessage.error('未登录')
      router.push('/login')
    }
  });
});
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column
}
</style>