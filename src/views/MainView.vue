<template>
    <el-row :gutter="16">
        <el-col :span="6">
            <div class="statistic-card">
                <el-statistic :value="system_info.today">
                    <template #title>
                        <div class="card-head">
                            今日已处理图片量
                            <el-tooltip effect="dark" content="每日处理图片量(每5分钟更新)" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>相较昨天</span>
                        <span v-if="system_info.today >= system_info.yesterday" class="green">
                            {{ system_info.yesterday != 0 ? `${((system_info.today / system_info.yesterday) *
                                100).toFixed(0)}%` :
                                `昨日未处理图片` }}
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </span>
                        <span v-if="system_info.today < system_info.yesterday" class="red">
                            {{ system_info.yesterday != 0 ? `${((system_info.today / system_info.yesterday) *
                                100).toFixed(0)}%` :
                                `昨日未处理图片` }}
                            <el-icon>
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="statistic-card">
                <el-statistic :value="system_info.total">
                    <template #title>
                        <div class="card-head">
                            系统已处理图片量
                            <el-tooltip effect="dark" content="系统总计处理图片数量(每5分钟更新)" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="statistic-card">
                <el-statistic :value="system_info.total">
                    <template #title>
                        <div class="card-head">
                            系统已识别缺陷
                            <el-tooltip effect="dark" content="系统总共识别的缺陷数量(每日更新)" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
            </div>
        </el-col>
    </el-row>

</template>
<script lang="ts" setup>
import {
    CaretTop,
    Warning,
    CaretBottom
} from '@element-plus/icons-vue'
import { get_system_info } from '@/API/API'
import { onMounted, ref } from 'vue';
const system_info = ref({
    today: 0,
    yesterday: 0,
    total: 0
})
onMounted(() => {
    get_system_info().then(res => {
        system_info.value.today = Number(res.data.data.today)
        system_info.value.yesterday = Number(res.data.data.pre_day)
        system_info.value.total = Number(res.data.data.total_detected_data)
    })
})
</script>
<style lang="css" scoped>
.card-head {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 80%;
    padding: 20px;
    padding-bottom: 15px;
    border-radius: 8px;
    background: -webkit-linear-gradient(90deg, #c7f2ff, #5cd3ff);
    background: linear-gradient(90deg, #c7f2ff, #5cd3ff);
    /* margin: 10px; */
    margin-left: 15px;
    margin-top: 10px;
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}
</style>