<script setup>
import { watch, ref } from "vue";
import 'element-plus/es/components/dialog/style/css';

const props = defineProps(['closeHandle']);
const visible = ref(true);
const fullscreen = ref(false);
watch(visible, (value, oldValue) => {
    if (!value) {
        props.closeHandle();
    }
})
</script>

<template>
    <el-dialog v-model="visible" :fullscreen="fullscreen" :show-close="false" width="800">
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <div :id="titleId" :class="titleClass">待更新 。。。</div>
                <el-space size="8">
                    <i-ep-full-screen v-if="!fullscreen" @click="fullscreen = true" />
                    <i-ep-aim v-if="fullscreen" @click="fullscreen = false" />
                    <i-ep-close @click="close" />
                </el-space>
            </div>
        </template>
        <iframe class="iframe" src="http://localhost:3000"></iframe>
    </el-dialog>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
}
.iframe {
    overflow: auto;
    -webkit-user-select: none;
    /* Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* IE10+/Edge */
    user-select: none;
    /* Standard */
    width: 100%;
    min-height: 30vh;
    border: 0;
}
</style>