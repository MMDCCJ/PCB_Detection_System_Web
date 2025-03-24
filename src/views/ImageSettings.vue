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
                <el-button type="primary" size="large">保存设置至云端</el-button>
                <el-button type="primary" size="large" @click="resetColor()">恢复默认</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { cfg } from '@/cfg/cfg';
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
    watch(PCB_Settings.value, () => {
        console.log("更新数据")
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