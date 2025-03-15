<template>
    <div class="container">
        <div class="wrapper">
            <div v-viewer="options" class="images" ref="viewer">
                <template v-for="image in images">
                    <img :src="image" class="image" :data-src="image">
                </template>
            </div>
        </div>
        <el-table :data="tableData" style="width: 100%" max-height="600">
            <el-table-column fixed="left" prop="pcb_id" label="pcb_id" width="70" />
            <el-table-column prop="image_name" label="图片名称" width="400" />
            <el-table-column prop="state" label="缺陷类型">
                <template #default="{ row }">
                    <el-tag v-for="tag in row.state" :key="tag" type="primary" class="defect-tag"
                        @click.prevent="locate_to_defect(tag, row)">
                        {{ `${config.DefectType[tag.defect_type]} ${Number(tag.p * 100).toFixed(1)}%` }}
                    </el-tag>
                    <el-tag v-if="row.state.length == 0" type="primary" class="defect-tag">
                        {{ `无缺陷` }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="上传日期" width="200" />
            <el-table-column fixed="right" label="操作" width="500">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="pushToImgList(scope.row)">
                        添加到图片列表
                    </el-button>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
                        icon-color="#626AEF" title="确定删除吗?" @confirm="deleteRow(scope.$index)">
                        <template #reference>
                            <el-button link type="primary" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { get_pcb_list, delete_pcb_image } from '@/API/API'
import { cfg } from '@/cfg/cfg'
import { InfoFilled } from '@element-plus/icons-vue'

const config = new cfg()
const images = ref<string[]>([
])
const index = ref<number | null>(null)
const options = {
    inline: true,
    url: 'data-src',
    viewed: (e: { detail: { index: number | null } }) => {
        index.value = e.detail.index
    },
    images: images,
}

const locate_to_defect = (tag: { x: number, y: number }, row: { image_name: string }) => {
    let url = config.baseUrl + '/images/detected/' + row.image_name
    let exist = false
    for (let i = 0; i < images.value.length; i++) {
        if (images.value[i] == url) {
            if (index.value == i) {
                locate(tag.x, tag.y)
                return
            }
            index.value = i
            viewer.value.$viewer.view(index.value)
            exist = true
            setTimeout(() => {
                locate(tag.x, tag.y)
            }, 500);
            return
        }
    }
    if (!exist) {
        images.value.push(url)
        index.value = images.value.length - 1
        setTimeout(() => {
            viewer.value.$viewer.view(index.value)
        }, 100);
        setTimeout(() => {
            locate(tag.x, tag.y)
        }, 500);
    }


}
onMounted(() => {
    get_pcb_list().then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
            const stateList = []
            for (let p of res.data.data[i].position) {
                const position = p[0].split(' ')
                stateList.push({
                    x: position[1],
                    y: position[2],
                    p: position[5],
                    defect_type: position[0]
                })
            }

            tableData.value.push({
                pcb_id: res.data.data[i].id,
                date: res.data.data[i].date.replace('T', ' ').substring(0, 16),
                image_name: res.data.data[i].srcName,
                state: stateList
            })
        }
    })
})
const viewer = ref<any>(null)
/*
    聚焦到定位到缺陷位置
*/
const locate = (x: number, y: number) => {
    const height = viewer.value.$viewer.imageData.naturalHeight
    const width = viewer.value.$viewer.imageData.naturalWidth
    const viererHeight = viewer.value.$viewer.viewerData.height
    const viererWidth = viewer.value.$viewer.viewerData.width
    let targetY = height * y - viererHeight / 2
    let targetX = width * x - viererWidth / 2
    viewer.value.$viewer.zoomTo(1)
        .moveTo(-targetX, -targetY)
        .zoomTo(1, { center: { x: -targetX, y: -targetY } },)

}
const tableData = ref<{ pcb_id: string, date: string, image_name: string, state: object[] }[]>([])
const pushToImgList = (data: any) => {
    let url = config.baseUrl + '/images/detected/' + data.image_name
    for (let i = 0; i < images.value.length; i++) {
        if (images.value[i] == url) {
            index.value = i
            viewer.value.$viewer.view(index.value)
            return
        }
    }
    images.value.push(url)

    setTimeout(() => {
        viewer.value.$viewer.view(images.value.length - 1)
        index.value = images.value.length - 1
    }, 100);
}
const deleteRow = (index: number) => {
    tableData.value.splice(index, 1)
    delete_pcb_image(tableData.value[index].pcb_id).then((res) => {
    })
}

</script>
<style scoped>
.images {
    display: flex;
    height: 600px;
}

.defect-tag:hover {
    background-color: #bcd9fc;
}

.defect-tag {
    cursor: pointer;

}

.defect-tag+.defect-tag {
    margin-left: 5px;
}
</style>