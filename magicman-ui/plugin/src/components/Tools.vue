<script setup>
import { ref, onMounted } from 'vue';
import { useToolsStore } from '@/stores';
const toolsComStore = useToolsStore();
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
    toolsList.value = formatTools(toolsComStore.tools);
}
function clickHandle(type,description) {
    if (type == "link") {
        window.open(description, '_blank');
    }
}
</script>

<template>
    <div class="tools" :class="{ open: isToolsOpen }" ref="tools">
        <div class="content">
            <div class="fixed-tools">
                <div class="tool-item" v-for="{name,imageUrl,type,description} in fixedTools" @click="clickHandle(type,description)">
                    <img :src="imageUrl" />
                    <span>
                        {{ name }}
                    </span>
                </div> 
            </div>
            <div class="open-tools">
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
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 0 12px;
    color:#222;

    .tool-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-right: 8px;
        margin-top: 6px;
        background: #fff;
        border-radius: 8px;
        outline: none;
        padding: 3px;
        img{
            width: 16px;
            height: 16px;
            margin-right: 6px;
        }
        span{
            width: 56px;
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
        width: 20px;
        height: 30px;
        background-position: center;
        background-size: cover;
        position: relative;
        bottom: -8px;
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
        width: calc(100% - 12px);
    }

    .open-tools {
        overflow-y: auto;
        max-height: 114px;
        flex-wrap: wrap-reverse;
        justify-content: flex-start;
        position: absolute;
        display: none;
        background-color: rgba(0, 0, 0, 0.9);
        box-shadow: 0px -1px 1px rgb(0, 0, 0, 0.6);
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