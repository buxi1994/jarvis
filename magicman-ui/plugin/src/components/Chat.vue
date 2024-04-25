<script setup>
import { watch, ref } from "vue";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from 'pinia'
import { useChatAnswerStore } from '@/stores';
import md from "@/utils/md";
const props = defineProps(['content']);
const chatAnswerStore = useChatAnswerStore();
const { getChatAnswer, editStatus,reset } = chatAnswerStore;
const { chatAnswer, chatStatus } = storeToRefs(chatAnswerStore);
const chats = ref([]);
watch(() => props.content, (value, oldValue) => {
    let chat = {};
    chat.question = value.question;
    chats.value.push(chat);
    editStatus("pending")
    getChatAnswer();
})
chatAnswerStore.$subscribe((mutation, state) => {
    if (chatStatus.value == "done") {
        setTimeout(() => {
            reset();
        }, 0);
    }
    if (chatAnswer.value.length > 0) {
        const index = chats.value.length - 1;
        let chat = chats.value[index];
        let newChat = { question: chat.question, answer: md.render(chatAnswer.value), status: chatStatus.value };
        chats.value.splice(index, 1, newChat);
    }
})
</script>

<template>
    <template v-for="({ question, answer, status }, index) in chats" :key="index">
        <div class="user-question">
            <div>{{ question }}</div>
        </div>
        <div v-if="answer && answer.length>0" class="item-content" v-html="answer" />
        <!-- <Loading :curStatus="status" /> -->
    </template>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less'; 

.user-question {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;

    div {
        background-color: @primary-color;
        border-radius: 12px;
        border-top-right-radius: 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        line-height: 22px;
        min-height: 26px;
        outline: none;
        padding: 9px 14px;
        white-space: normal;
        word-break: break-word;
    }
}

.item-content {
    color: #666;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 0px 2px @primary-color;
    border-top-left-radius: 0;
    box-sizing: border-box;
    margin: 0 2px 16px;
    overflow: hidden;
    padding: 8px 10px;

    &:last-child {
        margin-bottom: 2px;
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
</style>