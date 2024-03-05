<script setup>
import { ref, onMounted } from 'vue';
import javars from '@/assets/images/jarvis.jpg';
const emit = defineEmits(['triggerModal'])
const props = defineProps(['jarvis','isActive']);
const icon = ref();
onMounted(() => {
    icon.value.addEventListener("mousedown", iconMousedownFn);
    icon.value.addEventListener("click", iconClickFn);
})

let isDragging = false; // 初始化拖拽状态
let dragStarted = false; // 标记拖拽
function iconMousedownFn(e) {
    e.preventDefault();
    isDragging = false;
    dragStarted = true;
    console.log(
        "mousedown---isDragging:" + isDragging + "---dragStarted:" + dragStarted
    );
    // 获取鼠标在元素内的初始位置
    let startX = e.clientX - props.jarvis.offsetLeft;
    let startY = e.clientY - props.jarvis.offsetTop;
    function mouseMoveHandler(e) {
        console.log(
            "mouseMoveHandler---isDragging:" +
            isDragging +
            "---dragStarted:" +
            dragStarted
        );
        if (!dragStarted) return;
        isDragging = true;
        // 计算新的位置
        let newX = e.clientX - startX;
        let newY = e.clientY - startY;

        // 获取页面的有效区域大小
        const pageWidth = document.documentElement.clientWidth;
        const pageHeight = document.documentElement.clientHeight;

        // 获取元素的大小
        const elementWidth = props.jarvis.offsetWidth;
        const elementHeight = props.jarvis.offsetHeight;

        // 计算边界
        const minX = 0;
        const maxX = pageWidth - elementWidth;
        const minY = 0;
        const maxY = pageHeight - elementHeight;

        // 确保元素不会移出页面的有效区域
        newX = Math.min(Math.max(newX, minX), maxX);
        newY = Math.min(Math.max(newY, minY), maxY);

        // 更新元素位置
        props.jarvis.style.left = newX + "px";
        props.jarvis.style.top = newY + "px";
    }

    function mouseUpHandler(e) {
        console.log(
            "mouseUpHandler---isDragging:" +
            isDragging +
            "---dragStarted:" +
            dragStarted
        );
        e.preventDefault();
        dragStarted = false;
        // 移除事件监听
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    }
    // 添加事件监听
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
}
function iconClickFn(e) {
    console.log(
        "click---isDragging:" + isDragging + "---dragStarted:" + dragStarted
    );
    if (isDragging) {
        e.preventDefault(); // 如果是拖拽操作，阻止click事件的默认行为
        console.log(1);
        isDragging = false; // 重置拖拽状态
    } else {
        console.log(2);
        if (props.isActive) {
            emit('triggerModal',false);
        } else {
            emit('triggerModal',true);
            // 获取页面的有效区域大小
            const pageWidth = document.documentElement.clientWidth;
            if (props.jarvis.offsetLeft > pageWidth / 2) {
                props.jarvis.style.left = pageWidth - 340 + "px";
            } else {
                props.jarvis.style.left = "10px";
            }
            props.jarvis.style.top = "2%";
        }
    }
}
</script>

<template>
    <div class="icon" ref="icon">
        <img :src="javars" />
    </div>
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