<template>
    <el-container>
        <el-header class="header-tabs">
            <el-tabs type="card" v-model="groupId" @tab-change="tabChange">
                <el-tab-pane label="所有" name="all"></el-tab-pane>
                <el-tab-pane label="待处理" name="pending"></el-tab-pane>
                <el-tab-pane label="延期处理" name="defer"></el-tab-pane>
                <el-tab-pane label="已解决" name="done"></el-tab-pane>
            </el-tabs>
        </el-header>
        <el-header>
            <div class="left-panel">
                <el-button type="primary" icon="el-icon-plus" @click="addTool"></el-button>
                <el-button type="primary" icon="el-icon-edit" :disabled="selection.length != 1"
                    @click="editTool"></el-button>
            </div>
        </el-header>
        <el-main class="nopadding">
            <cus-table ref="table" :tableProps="tableProps" :API="API" @selectionChange="selectionChange"></cus-table>
        </el-main>
    </el-container>
    <cus-dialog ref="dialog">
        <div v-html="content"></div>
    </cus-dialog>
</template>

<script>
import cusTable from "@/custom-components/cusTable/table.vue";
import cusDialog from "@/custom-components/cusDialog/dialog.vue";

export default {
    components: {
        cusDialog,
        cusTable
    },
    data() {
        return {
            content: "",
            groupId: "all",
            selection: [],
            API: this.$API.demo.feedback,
            tableProps: [{
                type: "selection",
                width: 50,
            }, {
                prop: "title",
                label: "标题",
                width: 150,
            }, {
                prop: "status",
                label: "当前状态",
                width: 150,
                type:"filter",
                typeFilters: [
                    { text: '待处理', value: 'pending' },
                    { text: '延期处理', value: 'defer' },
                    { text: '已解决', value: 'done' }
                ],
                options:{
                    "pending":"待处理",
                    "defer":"延期处理",
                    "done":"已解决"
                }
            }, {
                type: "event",
                label: "详细说明",
                events: [
                    {
                        prop: "description",
                        label: "查看详情",
                        click: (param) => {
                            this.$refs.dialog.show("详细说明");
                            this.content = param;
                        },
                    }
                ],
            }, {
                prop: "creator",
                label: "创建人",
            }, {
                prop: "editor",
                label: "修改人",
            }, {
                prop: "comment",
                label: "修改人备注",
            }, {
                prop: "createTime",
                label: "修改时间",
            }]
        }
    },
    methods: {
        //标签切换
        tabChange(name) {
            this.$refs.table.reload({
                status: name
            })
        },
        //表格选择后回调事件
        selectionChange(selection) {
            this.selection = selection;
        },
        //增加
        addTool() {
            this.$store.commit('editFeedbackMode', 'add');
            this.$router.push({ path: '/feedback/form' });
        },
        //编辑
        editTool() {
            if (this.selection.length == 1) {
                let rowData = this.selection[0];
                this.$store.commit('editFeedback', rowData);
                this.$store.commit('editFeedbackMode', 'edit');
                this.$router.push({  path: '/feedback/form' });
            }
        }
    }
}
</script>

<style></style>