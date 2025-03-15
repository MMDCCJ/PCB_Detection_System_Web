<template>
  <div id="app" class="main">
    <div v-if="!UserStore.getValue('login')">
      <router-view></router-view>
    </div>
    <div v-if="UserStore.getValue('login')">
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
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import { UserState } from './stores/store'
import { ElMessage } from 'element-plus'
const router = useRouter()
const UserStore = UserState()
onBeforeMount(() => {
  checkLogin().then((res) => {
    if (res.data.code === 200) {
      console.log('已登录')
      UserStore.setUserName(res.data.data['user_name'])
      UserStore.setLogin(true)
      router.push('/Main')
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