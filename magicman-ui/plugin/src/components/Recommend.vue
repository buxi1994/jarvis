<script setup>
import { onBeforeMount } from 'vue'
import { useRecommendStore } from '@/stores';
const recommendStore = useRecommendStore();
onBeforeMount(() => {
    recommendStore.get();
});
function clickHandle(type, description) {
    if (type == "recommend") {
        window.open(description, '_blank');
    }
}
</script>

<template>
    <div class="item-content" v-if="recommendStore.recommend.length > 0">
        <div class="title">试试以下对话吧：</div>
        <div class="list">
            <template v-for="{ name, description } in recommendStore.recommend">
                <div class="item" @click="clickHandle('recommend', description)">{{ name }}</div>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.item-content {
    color: #666;
    background-color: #fff;
    border-radius: 10px;
    border-top-left-radius: 0;
    box-sizing: border-box;
    margin-bottom: 16px;
    overflow: hidden;
    padding: 8px 10px;
    box-shadow: 0px 0px 0px 2px @primary-color;
    margin: 2px 2px 16px;

    &:last-child {
        margin-bottom: 2px;
    }

    .title {
        color: #999;
        font-size: 13px;
        padding: 6px 0 10px;
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
        padding: 10px 13px;
        position: relative;
        width: auto;
        word-break: break-all;
    }
}
</style>