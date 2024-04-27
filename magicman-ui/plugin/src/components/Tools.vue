<script setup>
import { createApp, ref, onMounted } from 'vue';
import { useToolsStore } from '@/stores';
import { storeToRefs } from 'pinia'
import Dialog from './Dialog.vue';
const toolsStore = useToolsStore();
const { getToolInfo } = toolsStore;
const { tools } = storeToRefs(toolsStore);
let toolsList = ref();
const fixedTools = ref([]);
const openTools = ref([]);
const isToolsOpen = ref(false);
onMounted(() => {
    getTools();
})
function formatTools(toolsList) {
    let data = fixedTools;
    for (let i = 0; i < toolsList.length; i++) {
        const item = toolsList[i];
        if (i != 3) {
            if (i > 3) {
                data = openTools;
            }
            data.value.push(item);
        }
    }
}
function triggleToolBtn() {
    isToolsOpen.value = !isToolsOpen.value;
}
async function getTools() {
    await getToolInfo();
    toolsList.value = formatTools(tools.value);
}
function clickHandle(type, description) {
    if (type == "link") {
        window.open(description, '_blank');
    } else if (type == "modal") {
        // 创建一个容器元素
        const container = document.createElement('div');
        container.setAttribute("style", "position: relative; z-index: 999999;");
        document.body.appendChild(container);
        // 创建Vue应用实例并挂载到容器，同时传递参数
        const app = createApp({
            render() {
                return h(Dialog, {
                    // 传递事件处理器
                    closeHandle: () => {
                        {
                            // 当需要移除组件时
                            app.unmount();
                            document.body.removeChild(container);
                        }
                    }
                });
            }
        })
        app.mount(container);
    }
}

// 移除modal
function removeDomHandle() {
    appendMountedApp.value.unmount();
    document.body.removeChild(appendDom.value);
}
</script>

<template>
    <div class="tools" :class="{ open: isToolsOpen }" ref="tools">
        <div class="content">
            <div class="fixed-tools">
                <div class="tool-item" v-for="{ name, imageUrl, type, description } in fixedTools"
                    @click="clickHandle(type, description)">
                    <img :src="imageUrl" />
                    <span>
                        {{ name }}
                    </span>
                </div>
            </div>
            <div class="open-tools">
                <div class="tool-item" v-for="{ name, imageUrl, type, description } in openTools"
                    @click="clickHandle(type, description)">
                    <img :src="imageUrl" />
                    <span>
                        {{ name }}
                    </span>
                </div>
            </div>
        </div>
        <span v-if="openTools.length > 0" class="status" @click="triggleToolBtn" />
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';

.tools {
    position: relative;
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    padding: 0 12px;
    color: #222;

    .tool-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-right: 8px;
        margin-top: 6px;
        background-color: rgba(121, 187, 255, 0.2);
        border-radius: 8px;
        outline: none;
        padding: 3px;
        height: 26px;

        img {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 6px;
        }

        span {
            width: 56px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .status {
        cursor: pointer;
        background-repeat: no-repeat;
        background-image: url(../assets/images/arrow-up.png);
        transition: background-image 0.6s;
        border-radius: 6px;
        overflow: hidden;
        width: 20px;
        height: 26px;
        background-position: center;
        background-size: cover;
        position: relative;
        bottom: -3px;
    }

    .fixed-tools {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    &.open {
        .open-tools {
            max-height: 114px;
        }

        .status {
            background-image: url(../assets/images/arrow-dowm.png);
        }
    }

    .content {
        width: calc(100% - 12px);
    }

    .open-tools {
        transition: max-height 0.5s ease-out;
        overflow-y: auto;
        max-height: 0;
        flex-wrap: wrap-reverse;
        justify-content: flex-start;
        position: absolute;
        display: flex;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px -2px 2px 0px @primary-color;
        right: 0;
        bottom: 38px;
        padding: 0 20px 0 12px;
        z-index: 0;
        /* IE and Edge 隐藏滚动条*/
        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>