<template>
    <cus-table :tableProps="tableProps" :filterOptions="filterOptions" :API="API" :formItems="formItems"></cus-table>
</template>

<script>
import cusTable from "./components/table.vue";

export default {
    components: {
        cusTable
    },
    data() {
        return {
            API: this.$API.tools,
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
                                label: "链接跳转",
                                value: "link"
                            },
                            {
                                label: "弹窗",
                                value: "modal"
                            }
                        ]
                    },
                    rules: [
                        { required: true }
                    ],
                }, {
                    label: "群组",
                    name: "groupId",
                    value: "",
                    component: "select",
                    options: {
                        remote: {
                            api: "https://localhost:8090/magicman/scene/group/info",
                            data: {}
                        },
                        addDataToForm: (curConfig, form) => {
                            if (curConfig.name === "groupId" && curConfig.label === "群组") {
                                const items = curConfig.options.items;
                                for (const item of items) {
                                    if (item.id === form.groupId) {
                                        form.groupName = item.name;
                                        break;
                                    }
                                }
                            }
                        }
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
                    name: "icon",
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
            }, {
                prop: "imageUrl",
                type: "img",
                label: "图标",
            }, {
                prop: "type",
                label: "类型",
                type: "filter",
                typeFilters: [
                    { text: '链接跳转', value: 'link' },
                    { text: '弹窗', value: 'modal' }
                ],
                options: {
                    "link": "链接跳转",
                    "modal": "弹窗"
                }
            }, {
                prop: "relation",
                label: "关联网址",
            }, {
                prop: "groupName",
                label: "群组",
            }, {
                prop: "description",
                label: "说明",
            }, {
                prop: "createTime",
                label: "修改时间",
            }],
            filterOptions: [
                {
                    label: '群组',
                    value: 'groupId',
                    type: 'select',
                    placeholder: '选择群组',
                    clearable: true,
                    extend: {
                        request: async () => {
                            try {
                                let list = await this.$API.group.get();
                                let data = list.data && list.data.dataList;
                                return data.map(item => {
                                    return {
                                        label: item.name,
                                        value: item.id
                                    }
                                })
                            } catch (error) {
                                return {};
                            }
                        }
                    }
                },
            ]
        }
    }
}
</script>

<style></style>