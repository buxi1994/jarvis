<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useChatAnswerStore } from '@/stores';
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import Loading from '../assets/images/Loading.vue';
const chatAnswerStore = useChatAnswerStore();
const { chatStatus } = storeToRefs(chatAnswerStore);
const textarea = ref();
const emit = defineEmits(['triggerSearch']);
function searchFn(event) {
    console.log(JSON.stringify(event.type));
    // 点击，才能触发暂停。回车不可以触发暂停
    if (event.type == "click") {
        // loading状态可以暂停
        if (chatStatus.value == "loading") {
            chatAnswerStore.stopChatAnswer();
            return;
        }
    }
    // 未输入内容，不可以执行；
    if (textarea.value.value.trim().length <= 0) {
        return;
    }
    // pending状态，不可以再次触发
    if (chatStatus.value != "done") {
        ElMessage({
            message: '当前对话进行中.',
            type: 'warning',
        })
        return;
    }
    event.preventDefault();
    emit("triggerSearch", textarea.value.value);
    // 清空数据
    textarea.value.value = "";
}
</script>

<template>
    <div class="search">
        <div class="input">
            <textarea ref="textarea" @keyup.enter="searchFn" placeholder="小助手最新黑科技：AI辅助生成PPT，输入&quot;/&quot;选取功能快速体验"
                autocomplete="off" class="input" style="text-indent: 0px;"></textarea>
            <div class="send-bottom" @click="searchFn">
                <div class="send-bottom-btn">
                    <el-icon color="#fff" :class="chatStatus == 'pending' ? 'is-loading' : ''">
                        <!-- 请求已发，但未响应 -->
                        <i-ep-loading v-if="chatStatus == 'pending'" />
                        <!-- 请求已响应，但未结束 -->
                        <i-ep-video-pause v-else-if="chatStatus == 'loading'"/>
                        <!-- 无请求||请求响应结束，可以继续发送请求 -->
                        <i-ep-promotion v-else="chatStatus == 'done'"/>
                    </el-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';

.search {
    background-image: linear-gradient(90deg, @secondary-color, @primary-color);
    border-radius: 12px;
    box-shadow: 0 0 12px 0 rgba(0, 155, 109, .15);
    box-sizing: border-box;
    height: 100%;
    padding: 2px;
    width: calc(100% - 24px);
    margin-left: 12px;

    .input {
        border: 0 !important;
        border-radius: 10px;
        padding: 2px 3px;
        background-color: #fff;
        box-sizing: border-box;
        position: relative;
        width: 100%;

        textarea {
            border: none;
            box-sizing: border-box;
            color: #222;
            line-height: 20px;
            outline: 0;
            overflow-y: auto;
            width: 100%;
            font-size: 14px;
            height: 43px;
            resize: none;
            /* IE and Edge 隐藏滚动条*/
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            &:focus {
                outline: none;
            }
        }

        .send-bottom {
            display: flex;
            justify-content: flex-end;

            .send-bottom-btn {
                cursor: pointer;
                text-align: center;
                background: linear-gradient(316deg, @primary-color 16.71%, @primary-color 116.53%);
                border-radius: 8px;
                height: 26px;
                width: 36px;
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: center;
            }
        }
    }
}
</style>