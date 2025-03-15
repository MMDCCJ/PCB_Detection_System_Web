<script lang="ts" setup>
import {
    Menu as IconMenu,
    Location,
    Setting
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { UserState } from '@/stores/store';
import { onMounted } from 'vue';
const router = useRouter()
const UserStore = UserState()
const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
const toPage = (path: string) => {
    router.push(path)
}
</script>
<template>
    <el-col class="left" :span="4">

        <div class="avatar">
            <el-avatar shape="square" :size="50" :src="squareUrl" />
            <div class="avatar-info">
                <div class="user-name">{{ UserStore.getValue('user_name') }}</div>
                <div class="user-state">在线</div>
            </div>
        </div>
        <el-menu @open="handleOpen" @close="handleClose" class="menu">
            <el-menu-item index="1" @click="toPage('/Main')">
                <el-icon>
                    <location />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <IconMenu />
                    </el-icon>
                    <span>识别</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="toPage(
                        '/detected'
                    )">识别</el-menu-item>
                    <el-menu-item index="2-2" @click="toPage('/result')">查看结果</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="3" @click="toPage('/settings')">
                <el-icon>
                    <Setting />
                </el-icon>
                <span>设置</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>
<style lang="css" scoped>
.left {
    height: 100vh;
}

.menu {
    border-top: 1px solid #ccc;
    height: 100vh;

}

.avatar {
    display: flex;
    flex-direction: row;
    padding-top: 20px;
    padding-left: 20px;
    /* background-color: #66ccff; */
    padding-bottom: 15px;
    border-right: 1px solid #ccc;

}

.avatar-info {
    margin-left: 15px;
    padding: 4px;
}

.user-name {
    font-size: 16px;
}

.user-state {
    font-size: 14px;
}
</style>
