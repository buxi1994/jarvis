<script setup>
// https://github.com/sxei/chrome-plugin-demo/tree/master/page-action-demo
import { ref, onMounted, watch } from 'vue';
import javars from '@/assets/images/jarvis.jpg';
import Chat from '@/components/Chat.vue';
import Search from '@/components/Search.vue';
import Icon from '@/components/Icon.vue';
import Recommend from '@/components/Recommend.vue';
import Tools from '@/components/Tools.vue';
const jarvis = ref();
const content = ref();
const searchContent = ref({});
// 是否显示Modal
const isActive = ref(false);
onMounted(() => {
    // 创建一个回调函数来接收变化通知
    const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                content.value.scrollTo(0, content.value.scrollHeight);
            }
        }
    };
    // 创建MutationObserver实例，传入回调函数
    const observer = new MutationObserver(callback);
    // 使用配置对象指定观察的类型
    const config = { attributes: false, childList: true, subtree: false };
    // 开始观察目标节点
    observer.observe(content.value, config);
})
function isShowModal(bool) {
    isActive.value = bool;
}
function searchFn(value) {
    searchContent.value = {
        question: value,
        time: new Date().getTime()
    }
}
</script>

<template>
    <div class="jarvis" :class="{ active: isActive }" ref="jarvis">
        <Icon @trigger-modal="isShowModal" :jarvis="jarvis" :isActive="isActive" />
        <div class="modal">
            <div class="listContainer">
                <div class="tips">
                    <span>欢迎体验文档助手内测，作为一个人工智能语言模型，我可以回答你的问题，辅助你进行写作。</span>
                </div>
                <div class="content" ref="content">
                    <Recommend />
                    <Chat :content="searchContent" />
                </div>
            </div>
            <Tools />
            <Search @trigger-search="searchFn" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.jarvis {
    position: fixed;
    top: 2%;
    left: calc(100vw - 84px);
    width: 56px;
    display: flex;
    justify-content: right;
    flex-direction: column;
    align-items: center;
}

.jarvis.active {
    width: 320px;

    .modal {
        width: 100%;
        height: fit-content;
    }
}

.modal {
    display: block;
    position: relative;
    width: 0;
    height: 0;
    transition: width 0.5s ease-out, height 0.5s ease-out;
    overflow: hidden;
    z-index: -1;
    top: -18px;
    background-color: rgba(0, 0, 0, 0.9);
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: 4px 4px 1px 0 #4fecfc;
    color: #4fecfc;
    padding-bottom: 12px;
}

.listContainer {
    padding: 28px 12px 6px;
    font-family: "arial";
    font-size: 12px;

    .content {
        /* IE and Edge 隐藏滚动条*/
        -ms-overflow-style: none;
        scrollbar-width: none;
        max-height: 480px;
        margin: 10px 0 0;
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}

.tips {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 10px;
    margin-top: 12px;

    span {
        color: #858585;
    }
}
</style>