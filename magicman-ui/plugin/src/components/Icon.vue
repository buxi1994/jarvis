<script setup>
import { ref, watch, onMounted, computed, nextTick } from 'vue';
import { debounce } from '@/utils';

const emit = defineEmits(['triggerModal']);
const props = defineProps(['jarvis', 'isActive']);
const icon = ref();
let dragStarted = false; // 标记拖拽
let preventClick = false; // 阻止click事件
let lastX = 0;
let lastY = 0;
const x = ref(0);
const y = ref(0);
let rafId = null;
let offsetRange = {};
const iconOffset = ref(0);
const jarvisWidth = ref(56);

const calOffsetRange = () => {
    // 获取页面的有效区域大小
    const pageWidth = document.documentElement.clientWidth;
    const pageHeight = document.documentElement.clientHeight;

    // 获取jarvis图标的大小
    const elementWidth = jarvisWidth.value;
    const elementHeight = props.jarvis.offsetHeight;
    const elementLeft = props.jarvis.offsetLeft;
    const elementTop = props.jarvis.offsetTop;
    const extra = 10;

    // 计算边界
    const left = 0 - elementLeft + extra;
    const right = pageWidth - elementLeft - elementWidth - extra;
    const top = 0 - elementTop + extra;
    const bottom = pageHeight - elementTop - elementHeight;

    offsetRange = { left, right, top, bottom }
    finalXY(x.value + iconOffset.value, y.value);
}
watch(() => props.jarvis, (value, oldValue) => {
    if (props.jarvis) {
        calOffsetRange();
    }
})
watch(() => props.isActive, (value, oldValue) => {
    console.log(value+","+oldValue);
    calOffsetRange();
})

watch([x, y], () => {
    rafId = requestAnimationFrame(updatePosition);
})

const finalXY = (newX, newY) => {
    x.value = Math.min(Math.max(newX, offsetRange.left), offsetRange.right);
    y.value = Math.min(Math.max(newY, offsetRange.top), offsetRange.bottom);
}

const mouseMoveHandler = (event) => {
    if (!dragStarted) return;
    preventClick = true;
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    // 计算新的位置
    let newX = x.value + deltaX;
    let newY = y.value + deltaY;

    finalXY(newX, newY);

    lastX = event.clientX;
    lastY = event.clientY;
}

const updatePosition = () => {
    props.jarvis.style.transform = `translate(${x.value}px,${y.value}px)`;
}

const iconMousedownFn = (event) => {
    preventClick = false;
    dragStarted = true;
    // 获取鼠标在元素内的初始位置
    lastX = event.clientX;
    lastY = event.clientY;
    // 添加事件监听
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
    // event.stopPropagation();
}
const mouseUpHandler = (e) => {
    dragStarted = false;
    cancelAnimationFrame(rafId);
    // 移除事件监听
    document.removeEventListener("mousemove", mouseMoveHandler);
}
const iconClickFn = (e) => {
    if (preventClick) {
        // 重置
        preventClick = false;
    } else {
        const status = !props.isActive;
        if (status) {
            // 即将展开
            iconOffset.value = -160 + 28;
            jarvisWidth.value = 320;
        } else {
            // 即将关闭
            iconOffset.value = 160 - 28;
            jarvisWidth.value = 56;
        }
        emit('triggerModal', status);
    }
}
onMounted(() => {
    window.addEventListener('resize', calOffsetRange);
})
onUnmounted(() => {
    mouseUpHandler();
    window.removeEventListener('resize', calOffsetRange);
});
</script>

<template>
    <div class="icon" ref="icon" @click="iconClickFn" @mousedown.prevent="iconMousedownFn" />
</template>

<style lang="less" scoped>
.icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    animation: glow 2s infinite alternate;

    &::after {
        content: "";
        width: 100%;
        height: 100%;
        background-image: url(../assets/images/ai.png);
        background-size: cover;
    }
}

@keyframes glow {
    from {
        box-shadow: 0 0 3px rgba(79, 236, 252, 0.4);
    }

    to {
        box-shadow: 0 0 10px rgba(79, 236, 252, 1);
    }
}

.icon>img {
    height: 100%;
}
</style>