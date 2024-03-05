<script setup>
import { ref, onMounted } from 'vue';
const tools = ref();
let toolsList = ref();
const fixedTools = ref([]);
const openTools = ref([]);
const isToolsOpen = ref(false);
onMounted(() => {
    toolsList.value = getTools();
    formatTools(toolsList.value);
})
function formatTools(toolsList) {
    let data = fixedTools;
    for (let i = 0; i < toolsList.length; i++) {
        const item = toolsList[i];
        if (i != 4) {
            if (i > 4) {
                data = openTools;
            }
            data.value.push(item);
        }
    }
}
function triggleToolBtn() {
    isToolsOpen.value = !isToolsOpen.value;
}
function getTools() {
    return [
        "待办事项",
        "发货时间",
        "杜甫何如",
        "二和",
        "反击的空间",
        "大花洒福",
        "发货时间",
        "甫何盒饭",
        "电话二和",
        "反击的空间",
        "合金",
        "客服人",
        "杜甫何如的盒饭",
        "电话费二",
        "反击的空间",
        "大花洒福达合金",
        "发货时间",
        "杜甫何如",
        "电话费二和",
        "反击的空间",
        "大花洒福",
        "发货",
        "杜甫何如的盒饭",
        "电话费二和",
        "反击的空间",
        "大花洒福达合金",
        "发货时间电话客服金夫人",
        "杜甫何如的盒饭",
        "电话费二",
        "反击的空间",
    ];
}
</script>

<template>
    <div id="tools" class="tools" :class="{ open: isToolsOpen }" ref="tools">
        <div class="content">
            <div class="fixed-tools" id="fixed-tools">
                <span v-for="item in fixedTools">
                    {{ item }}
                </span>
            </div>
            <div id="open-tools" class="open-tools">
                <span v-for="item in openTools">
                    {{ item }}
                </span>
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
    padding:0 12px;

    span {
        margin-right: 8px;
        display: inline-block;
        width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 26px;
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
        margin:0;
    }

    .fixed-tools {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content:flex-start;
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