<script setup>
import { watch, ref } from "vue";
import 'element-plus/es/components/dialog/style/css';

const props = defineProps(['closeHandle']);
const visible = ref(true);
const fullscreen = ref(false);
const loadJsRef = ref();
const loadCssRef = ref();
watch(visible, (value, oldValue) => {
    if (!value) {
        props.closeHandle();
        document.body.removeChild(loadJsRef.value);
        document.head.removeChild(loadCssRef.value);
    }
})

function loadJS(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
    // 返回script元素，以便可以删除
    return script;
}

function loadCSS(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    document.head.appendChild(link);
    // 返回link元素，以便可以删除
    return link;
}

onMounted(() => {
    loadJsRef.value = loadJS("http://169.254.96.39:8081/bundle.js");
    loadCssRef.value = loadCSS("http://169.254.96.39:8081/main.css")
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
        <div id="ai_modal_content" class="ai-modal-content"></div>
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

.ai-modal-content::-webkit-scrollbar {
    display: none;
}

.ai-modal-content {
    overflow: auto;
    /* Standard */
    width: 100%;
    max-height: 50vh;
    border: 0;
    scrollbar-width: none;
}
</style>