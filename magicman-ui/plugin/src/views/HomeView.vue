<script setup>
// https://github.com/sxei/chrome-plugin-demo/tree/master/page-action-demo
import { ref, onMounted, watch } from 'vue';
import javars from '@/assets/images/jarvis.jpg';
import Chat from '@/components/Chat.vue';
import Search from '@/components/Search.vue';
import Icon from '@/components/Icon.vue';
import Tools from '@/components/Tools.vue';
import { chatAnswerStore, recommendStore } from '@/stores';
const chatAnswerComStore = chatAnswerStore();
const recommendComStore = recommendStore();
// const tools = ref();
const jarvis = ref();
const content = ref();
const chats = ref([]);
// 是否显示Modal
const isActive = ref(false);
// 页面展示数据
let mainList = ref();
onMounted(() => {
    // 创建一个回调函数来接收变化通知
    const callback = function (mutationsList, observer) {
        console.log(mutationsList)
        for (const mutation of mutationsList) {
            // console.log(mutation);
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
    debugger;
    recommendComStore.get();
    // mainList.value = {
    //     recommend: recommendsComStore.recommends,
    // "你可能想了解：": ["value1", "value2", "value3"],
    // 拓展: ["关于鼎汉技术分点讨论议题", "点讨论议题", "value3"],
    // };
})
// watch(recommendComStore.recommend, (newValue, oldValue) => {
//     mainList.value.recommend = newValue;
// })
function isShowModal(bool) {
    isActive.value = bool;
}
async function searchFn(value) {
    let chat = {};
    chat.question = value;
    chats.value.push(chat);
    const index = chats.value.length - 1;
    await chatAnswerComStore.get();
    let newChat = { question: chat.question, answer: chatAnswerComStore.answer };
    chats.value.splice(index, 1, newChat);
}
function clickHandle(type, description) {
    if (type == "recommend") {
        window.open(description, '_blank');
    }
}
</script>

<template>
    <div id="jarvis" class="jarvis" :class="{ active: isActive }" ref="jarvis">
        <Icon @trigger-modal="isShowModal" :jarvis="jarvis" :isActive="isActive" />
        <div id="modal" class="modal">
            <div class="listContainer">
                <div class="tips">
                    <span>欢迎体验文档助手内测，作为一个人工智能语言模型，我可以回答你的问题，辅助你进行写作。</span>
                </div>
                <div id="content" class="content" ref="content">
                    <div class="item-content" v-if="recommendComStore.recommend.length > 0">
                        <div class="title">试试以下对话吧：</div>
                        <div class="list">
                            <template v-for="{ name, description } in recommendComStore.recommend">
                                <div class="item" @click="clickHandle('recommend', description)">{{ name }}</div>
                            </template>
                        </div>
                    </div>
                    <template v-for="{ question, answer } in chats">
                        <Chat :question="question" :answer="answer" />
                    </template>
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
    left: calc(100vw - 64px);
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

        .item-content {
            color: #666;
            background-color: #fff;
            border-radius: 10px;
            border-top-left-radius: 0;
            box-sizing: border-box;
            margin-bottom: 16px;
            overflow: hidden;
            padding: 12px 16px 16px;

            &:last-child {
                margin-bottom: 0;
            }

            .title {
                color: #999;
                font-size: 13px;
                padding: 10px 0;
                line-height: 22px;
            }

            .item {
                align-items: flex-start;
                background-color: #f7f7f7;
                border-radius: 0 12px 12px 12px;
                color: #222;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                margin-bottom: 12px;
                max-width: none;
                padding: 12px 13px;
                position: relative;
                width: auto;
                word-break: break-all;
            }

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