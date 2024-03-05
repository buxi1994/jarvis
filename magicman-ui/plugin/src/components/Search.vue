<script setup>
import { ref } from 'vue';
const emit = defineEmits(['triggerSearch'])
const textarea = ref();
async function searchFn(event) {
    event.preventDefault();
    emit("triggerSearch",textarea.value.value);
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
                <div class="send-bottom-btn"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.search {
    background-image: linear-gradient(90deg, #1c77ff, #4cecfc);
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
            height: 62px;
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
                background: linear-gradient(316deg, #0bd3e7 16.71%, #15c393 116.53%);
                border-radius: 8px;
                height: 26px;
                position: relative;
                width: 36px;

                &:before {
                    background: url(https://edu-wenku.bdimg.com/v1/pc/aigc/presentation-sample/send-1702458556573.svg) no-repeat;
                    background-size: cover;
                    content: "";
                    height: 16px;
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 16px;
                }
            }
        }
    }
}
</style>