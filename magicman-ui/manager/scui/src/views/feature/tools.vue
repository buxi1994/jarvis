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
            API: this.$API.demo.tools,
            formItems: [
                {
                    label: "名称",
                    name: "name",
                    value: "",
                    component: "input",
                    options: {
                        maxlength: "6",
                        placeholder: "工具名称",
                    },
                    rules: [
                        { required: true, message: "名称必填", trigger: "blur" }
                    ],
                }, {
                    label: "类型",
                    name: "type",
                    value: "link",
                    component: "radio",
                    options: {
                        items: [
                            {
                                label: "action",
                                value: "action"
                            },
                            {
                                label: "link",
                                value: "link"
                            }
                        ]
                    },
                    rules: [
                        { required: true }
                    ],
                },
                {
                    label: "描述",
                    name: "description",
                    value: "",
                    component: "input",
                    options: {
                        maxlength: "255",
                    },
                    rules: [
                        { required: true, message: "描述必填" }
                    ],
                },
                {
                    label: "关联网址",
                    name: "relation",
                    value: "",
                    component: "input",
                    options: {
                        maxlength: "255",
                    },
                    rules: [
                        { required: true, message: "网址必填" }
                    ],
                },
                {
                    label: "图标",
                    component: "upload",
                    name:"icon",
                    options: {
                        items: [
                            {
                                label: "工具图标",
                                name: "imageUrl",
                                value: "",
                                cropper: true,
                                compress: 1,
                                aspectRatio: 1,
                                rules: [
                                    { required: true, message: "图标必填" }
                                ]
                            }
                        ]
                    },
                    rules: [
                        { required: true }
                    ]
                }
            ],
            tableProps: [{
                type: "selection",
                width: 50,
            }, {
                prop: "name",
                label: "名称",
                width: 150,
            }, {
                prop: "imageUrl",
                type: "img",
                label: "图标",
                width: 150,
            }, {
                prop: "type",
                label: "类型",
                type: "filter",
                width: 150,
                typeFilters: [
                    { text: '链接', value: 'link' },
                    { text: '动作', value: 'action' }
                ],
                options:{
                    "link":"链接",
                    "action":"动作"
                }
            }, {
                prop: "relation",
                label: "关联网址",
                width: 250,
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