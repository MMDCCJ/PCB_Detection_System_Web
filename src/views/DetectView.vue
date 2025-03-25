<template>
    <!-- component -->
    <!-- <viewer class="images" :images="images">
            <img :src="images[0]">
        </viewer> -->
    <!-- <div class="container">
        <div class="wrapper">
            <div v-viewer="options" class="images">
                <template v-for="image in images">
                    <img :src="image" class="image" :data-src="image">
                </template>
</div>
</div>
</div> -->
    <el-upload class="upload" drag action="http://localhost:8000/api/upload" :file-list="fileList" multiple
        with-credentials accept="image/jpeg" :http-request="upload">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            文件拖动至此或<em>点击上传</em>
        </div>
    </el-upload>
    <el-button class="upload-btn" @click="predict" type="success">点击预测</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadUserFile } from 'element-plus'
import { predictImg } from '../API/API'
import { ElMessage } from 'element-plus';
const fileList = ref<UploadUserFile[]>([])
const sourceImages = []
const base = parseInt((Math.random() * 60).toString(), 10) + 10
for (let i = 0; i < 10; i++) {
    sourceImages.push({
        thumbnail: `https://picsum.photos/id/${base + i}/300/200`,
        source: `https://picsum.photos/id/${base + i}/600/400`
    })
}
import axios from 'axios'
const predict = () => {
    let local_settings: string | string[] | null = localStorage.getItem("Color_Settings")
    let colors_settings
    if (local_settings == null) {
        // 默认颜色设置
        colors_settings = '20 186 124 174 30 141 75 136 135 101 41 38 50 13 48 107 22 195'
    } else {
        local_settings = JSON.parse(local_settings as string)
        colors_settings = rgbToNum(local_settings as string[])
    }
    predictImg(colors_settings).then(res => {
        if (res.data.code === 200) {
            ElMessage.success(res.data.message)
        } else if (res.data.code === 400) {
            ElMessage.error(res.data.message)
        }
    })
}
const rgbToNum = (data: string[]): string => {
    let colors = ""
    for (let i of data) {
        let colorList = i.replace("rgb(", "").replace(")", "").split(",")
        for (let color of colorList) {
            colors += color.trim().trimEnd()
            colors += " "
        }
    }
    return colors.trimEnd()
}
const upload = async (option: any) => {
    const formData = new FormData()
    if (option.data) {
        for (const [key, value] of Object.entries(option.data)) {
            if (Array.isArray(value) && value.length) value.forEach(val => formData.append(key, val))
            else formData.append(key, value as string | Blob)
        }
    }
    formData.append(option.filename, option.file, option.file.name)

    try {
        console.dir(option)
        axios.defaults.withCredentials = true
        const response = await axios.post(option.action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'withCredentials': 'true',
                ...option.headers,
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0
                option.onProgress({ percent: percentCompleted })
            },
        })
        option.onSuccess(response.data)
    } catch (error) {
        option.onError(error)
    }
}

const index = ref<number | null>(null)
const options = {
    inline: true,
    url: 'data-src',
    viewed: (e: { detail: { index: number | null } }) => {
        index.value = e.detail.index
    },
    images: [...sourceImages].splice(0, 5)
}
</script>
<style scoped>
.upload-btn {
    margin-left: 5px;
}
</style>