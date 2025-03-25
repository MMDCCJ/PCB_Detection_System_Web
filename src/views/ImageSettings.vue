<template>
    <div>
        <el-row>
            <el-col class="ColorSettings-title">
                检测颜色配置
            </el-col>
            <el-col v-for="defect in PCB_Settings" class="ColorSelector" :span="8">

                {{ `${defect.Label}(${defect.Chinese_label})` }}

                <el-color-picker color-format="rgb" v-model="defect.Color" />

            </el-col>
            <el-col :span="8" :offset="8" class="Save-Colors">
                <el-button type="primary" size="large" @click="update_color_settings()">保存设置至云端</el-button>
                <el-button type="primary" size="large" @click="get_backend_color_settings()">读取云端设置</el-button>
                <el-button type="primary" size="large" @click="resetColor()">恢复默认</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { cfg } from '@/cfg/cfg';
import { ElMessage } from 'element-plus';
import { get_color_settings, save_color_settings } from '@/API/API';
// , 'mouse_bite', 'open_circuit', 'short', 'spurious_copper', 'spur'
const Config = new cfg()
const PCB_Settings = ref<[{ Label: string, Chinese_label: string, Color: string }]>([{
    Label: '',
    Chinese_label: '',
    Color: ''
}])
function saveToLocalStorage() {
    const colors = []
    for (let i = 0; i <= 5; i++) {
        colors.push(PCB_Settings.value[i].Color)
    }
    localStorage.setItem('Color_Settings', JSON.stringify(colors));
}
const resetColor = () => {
    const default_color = ['rgb(20,186,124)', 'rgb(174,30,141)', 'rgb(75,136,135)', 'rgb(101,41,38)', 'rgb(50,13,48)', 'rgb(107,22,195)']
    for (let i = 0; i <= 5; i++) {
        PCB_Settings.value[i].Color = default_color[i]
    }
    saveToLocalStorage()
    ElMessage({
        message: '已恢复默认',
        type: 'success',
    });
}
const get_backend_color_settings = () => {
    get_color_settings().then(res => {
        const color_settings = res.data.data[0].toString() as string
        let settings = color_settings.split(' ')
        for (let i = 0, index = 0; i <= 17; i += 3, index++) {
            let color = `rgb(${settings[i]},${settings[i + 1]},${settings[i + 2]})`
            PCB_Settings.value[index].Color = color
        }
        saveToLocalStorage()
        ElMessage({
            message: '成功读取云端设置',
            type: 'success',
        });
    })
}
const update_color_settings = () => {
    let colors = '';
    for (let i = 0; i <= 5; i++) {
        let origin_data = PCB_Settings.value[i].Color
        let rgbs = origin_data.replace('rgb(', '').replace(')', "").split(',')
        for (let i of rgbs) {
            colors += i
            colors += " "
        }
    }
    colors = colors.trimEnd()
    save_color_settings(colors).then(() => {
        ElMessage({
            message: '成功保存设置至云端',
            type: 'success',
        });
    })
}
onMounted(() => {
    PCB_Settings.value.pop()
    // 读取本地颜色设置
    const storedColorSettings = localStorage.getItem('Color_Settings');
    if (storedColorSettings) {
        let Colors = JSON.parse(storedColorSettings);
        for (let i = 0; i <= 5; i++) {
            PCB_Settings.value.push({
                Label: Config.DefectType_En[i],
                Chinese_label: Config.DefectType[i],
                Color: Colors[i]
            })

        }
    } else {
        for (let i = 0; i <= 5; i++) {
            PCB_Settings.value.push({
                Label: Config.DefectType_En[i],
                Chinese_label: Config.DefectType[i],
                Color: 'rgb(1,1,1)'
            })
        }
        resetColor()
    }
    watch(PCB_Settings.value, (value, old) => {
        saveToLocalStorage()
    })

})

</script>
<style lang="css" scoped>
.ColorSettings-title {
    color: #666;
    font-size: 26px;
    padding: 10px;
}

.Save-Colors {
    padding: 10px;
    display: flex;
    justify-content: center;
}

.ColorSelector {
    font-size: 18px;
    padding: 10px;
    justify-content: space-between;
    display: flex;
}
</style>