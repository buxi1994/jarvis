<script setup>
    const status = {
        "reload":{text:"重新生成",icon:"Refresh",click:()=>{alert("重新")}},
        "loading":{text:"停止生成",icon:"VideoPause",click:()=>{alert("停止")}},
    };
    defineProps(['curStatus']);
    
</script>
<template>
    <div v-if="status[curStatus]" class='loading'>
        <el-button size="small" @click="status[curStatus].click" :icon="status[curStatus].icon">{{ status[curStatus].text }}</el-button>
    </div>
</template>

<style lang="less" scoped>
.loading {
    text-align: center;
    font-size: 14px;
    margin-bottom: 6px;
    color: rgba(255, 255, 255, 0.8);
}
</style>