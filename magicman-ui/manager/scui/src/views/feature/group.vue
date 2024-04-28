<template>
    <cus-table :tableProps="tableProps" :API="API" :formItems="formItems"></cus-table>
</template>

<script>
import cusTable from "./components/table.vue";

export default {
    components: {
        cusTable
    },
    data() {
        return {
            API: this.$API.demo.group,
            formItems: [
                {
                    label: "组名",
                    name: "name",
                    value: "",
                    component: "input",
                    options: {
                        maxlength: "128",
                        placeholder: "",
                    },
                    rules: [
                        { required: true, message: "名称必填", trigger: "blur" }
                    ],
                }, {
                    label: "创建人",
                    name: "creator",
                    value: "",
                    component: "input",
                    options: {
                        maxlength: "32",
                        placeholder: "",
                    },
                },
                {
                    label: "描述",
                    name: "description",
                    value: "",
                    component: "input",
                    options: {
                        maxlength: "255",
                    },
                }
            ],
            tableProps: [{
                type: "selection",
                width: 50,
            }, {
                prop: "name",
                label: "组名",
                width: 150,
            }, {
                prop: "creator",
                label: "创建人",
                width: 150,
            }, {
                prop: "description",
                label: "说明",
                width: 250,
            }, {
                prop: "createTime",
                label: "修改时间",
                width: 150
            }]
        }
    }
}
</script>

<style></style>