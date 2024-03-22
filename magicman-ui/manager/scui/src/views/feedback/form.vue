<template>
    <el-main>
        <el-card shadow="never">
            <cus-form ref="form" :API="API" :config="config" :data="formData" @cancel="cancelFormHandle"></cus-form>
        </el-card>
    </el-main>
</template>

<script>
import cusForm from '@/custom-components/cusForm/form.vue';

export default {
    components: {
        cusForm
    },
    data() {
        return {
            formData: {},
            isSaveing: false,
            API: this.$API.demo.feedback,
        }
    },
    created() {
        this.resetFormData();
    },
    watch: {
        mode() {
            this.resetFormData();
        }
    },
    computed: {
        mode() {
            return this.$store.state.feedback.mode;
        },
        config() {
            let formItems;
            if (this.mode == "edit") {
                formItems = [{
                    label: "标题",
                    name: "title",
                    value: "",
                    component: "input",
                    options: {
                        disabled: true,
                        placeholder: "标题",
                    },
                }, {
                    label: "创建人",
                    name: "creator",
                    value: "",
                    component: "input",
                    options: {
                        placeholder: "创建人",
                        disabled: true,
                    },
                },
                {
                    label: "描述",
                    placeholder: "描述",
                    name: "description",
                    disabled: true,
                    value: "",
                    component: "editor",
                }, {
                    label: "修改人",
                    name: "editor",
                    value: "",
                    component: "input",
                    options: {
                        maxlength: "20",
                        placeholder: "修改人",
                    },
                }, {
                    label: "修改人备注",
                    name: "comment",
                    value: "",
                    component: "input",
                    options: {
                        placeholder: "备注",
                        maxlength: "255",
                    },
                    rules: [
                        { required: true, message: "备注必填" }
                    ]
                }, {
                    label: "状态",
                    component: "radio",
                    name: "status",
                    options: {
                        items: [
                            {
                                label: "延期处理",
                                value: "defer"
                            },
                            {
                                label: "已解决",
                                value: "done"
                            }
                        ]
                    },
                    rules: [
                        { required: true, message: "状态必选" }
                    ]
                }];
            } else {
                formItems = [{
                    label: "标题",
                    name: "title",
                    value: "",
                    component: "input",
                    options: {
                        placeholder: "标题",
                        maxlength: "50",
                    },
                    rules: [
                        { required: true, message: "标题必填" }
                    ]
                }, {
                    label: "创建人",
                    name: "creator",
                    value: "",
                    component: "input",
                    options: {
                        placeholder: "创建人",
                        maxlength: "20",
                    },
                },
                {
                    label: "描述",
                    placeholder: "描述",
                    name: "description",
                    value: "",
                    component: "editor",
                }];
            }
            return {
                labelWidth: '130px',
                labelPosition: 'right',
                size: 'medium',
                formItems
            }
        }
    },
    methods: {
        cancelFormHandle() {
            this.$store.commit('editFeedbackMode', 'add');
            this.$store.commit('resetFeedback');
        },
        resetFormData() {
            if (this.mode == "edit") {
                Object.assign(this.formData, this.$store.state.feedback.data);
            } else {
                this.formData = {};
            }
        },
    }
}
</script>

<style></style>
