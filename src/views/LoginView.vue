<template>
    <div class="login-container">
        <el-card class="login-card">
            <h2>{{ isLogin ? '登录' : '注册' }}</h2>
            <el-form :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" v-if="!isLogin">
                    <el-input type="password" v-model="form.confirmPassword" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm" style="width: 100%;">{{ isLogin ? '登录' : '注册'
                        }}</el-button>
                </el-form-item>
            </el-form>
            <div class="toggle-form">
                <a href="#" @click="isLogin = !isLogin">{{ isLogin ? '没有账号？点击注册' : '已有账号？点击登录' }}</a>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus'
import { login, register } from '../API/API'
import { UserState } from '@/stores/store';
import { useRouter } from 'vue-router'
const router = useRouter()
const UserStore = UserState()
// 显示登录页面/注册页面
const isLogin = ref<boolean>(true);
const form = ref({
    username: '',
    password: '',
    confirmPassword: ''
});
interface RuleForm {
    username: string
    password: string,
    confirmPassword: string
}
// 表单验证规则
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名不包含中文', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '长度为6-20，不能包含中文', trigger: 'blur', min: 6, max: 20 }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== form.value.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ]
});
// 提交表单
const submitForm = () => {
    if (isLogin.value && (!form.value.username || !form.value.password)) {
        ElMessage({
            message: '用户名或密码不能为空',
            type: 'error',
        });
        return;
    }
    if (!isLogin.value && (!form.value.username || !form.value.password || !form.value.confirmPassword)) {

        ElMessage({
            message: '用户名、密码或确认密码不能为空',
            type: 'error',
        });
        return;
    }
    if (isLogin.value) {
        // 登录逻辑
        login(form.value.username, form.value.password).then((res) => {
            if (res.data.code === 200) {
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                });
                UserStore.setLogin(true)
                UserStore.setUserName(form.value.username)
                router.push('/main')
            } else {
                ElMessage({
                    message: '用户名或密码错误',
                    type: 'error',
                });
            }

        });
    } else {
        // 注册逻辑
        if (form.value.password !== form.value.confirmPassword) {
            ElMessage({
                message: '两次输入密码不一致',
                type: 'error',
            });
            return;
        }
        register(form.value.username, form.value.password).then((res) => {
            if (res.data.code === 200) {
                ElMessage({
                    message: '注册成功',
                    type: 'success',
                });
                isLogin.value = true;

            } else {
                ElMessage({
                    message: res.data.message,
                    type: 'error',
                });
            }
        });
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-card {
    width: 300px;
    padding: 20px;
}

.toggle-form {
    text-align: center;
    margin-top: 10px;
}

.toggle-form a {
    color: #409EFF;
    text-decoration: none;
}
</style>