<script setup>
import { ref, onMounted } from 'vue';
import { toolsStore } from '@/stores';
const toolsComStore = toolsStore();
const tools = ref();
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
    await toolsComStore.get();
    debugger;
    toolsList.value = formatTools(toolsComStore.tools);
}
function clickHandle(type,description) {
    if (type == "link") {
        window.open(description, '_blank');
    }
}
</script>

<template>
    <div id="tools" class="tools" :class="{ open: isToolsOpen }" ref="tools">
        <div class="content">
            <div class="fixed-tools" id="fixed-tools">
                <div class="tool-item" v-for="{name,imageUrl,type,description} in fixedTools" @click="clickHandle(type,description)">
                    <img :src="imageUrl" />
                    <span>
                        {{ name }}
                    </span>
                </div> 
            </div>
            <div id="open-tools" class="open-tools">
                <div class="tool-item" v-for="{name,imageUrl,type,description} in openTools" @click="clickHandle(type,description)">
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
.tools {
    position: relative;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 0 12px;

    .tool-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-right: 8px;
        img{
            width: 16px;
            height: 16px;
            margin-right: 3px;
        }
        span{
            width: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 26px;
        }
    }

    .status {
        cursor: pointer;
        background-repeat: no-repeat;
        background-image: url(../assets/images/arrow-up.png);
        transition: background-image 0.6s;
        border-radius: 6px;
        overflow: hidden;
        background-color: #fff;
        width: 20px;
        height: 18px;
        background-position: center;
        background-size: cover;
        position: relative;
        bottom: -5px;
        margin: 0;
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
            display: flex;
        }

        .status {
            background-image: url(../assets/images/arrow-dowm.png);
        }
    }

    .content {
        width: calc(100% - 20px);
    }

    .open-tools {
        overflow-y: auto;
        max-height: 130px;
        flex-wrap: wrap-reverse;
        justify-content: flex-start;
        position: absolute;
        display: none;
        background-color: rgba(0, 0, 0, 0.9);
        box-shadow: 0px -2px 0px rgb(20 152 166);
        right: 0;
        bottom: 26px;
        padding: 0 32px 0 12px;
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