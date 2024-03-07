<template>
    <el-card shadow="never">
        <sc-form ref="formref" @submit="save" :config="config" v-model="form" :loading="loading">
            <!-- <el-button type="primary" @click="save">保 存</el-button>
            <el-button @click="reset">重 置</el-button> -->
        </sc-form>
    </el-card>
</template>

<script>
export default {
    name: 'formRender',
    props: {
        apiObj: { type: Object, default: () => { } },
    },
    data() {
        return {
            loading: false,
            config: {
                labelWidth: '130px',
                labelPosition: 'right',
                size: 'medium',
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
                    },
                    {
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
                        label: "图标",
                        component: "upload",
                        options: {
                            items: [
                                {
                                    label: "工具图标",
                                    name: "imageUrl",
                                    value: "",
                                }
                            ]
                        },
                        rules: [
                            { required: true }
                        ],
                        // TODO 必填怎么处理
                        // TODO 修改图片地址
                    }
                ]
            },
            form: {}
        }
    }, methods: {
        save() {
            this.$refs.formref.validate((valid, obj) => {
                if (valid) {
                    console.log(obj)
                    if (this.form.imageUrl != "") {
                        this.form.imageUrl = "https://pic.rmb.bdstatic.com/1fa9e5936e7272039c47f1d1b7dd8ee6.jpeg";
                        try {
                            this.apiObj.add(this.form);
                            this.$emit("close-form-modal")
                        } catch (error) {
                            this.$message.warning(error.statusText);
                        }
                    } else {
                        this.$message.warning(`图片必传`);
                        return false;
                    }
                } else {
                    this.$refs.formref.scrollToField(Object.keys(obj)[0])
                    return false
                }
            })
        },
        reset() {
            this.$refs.formref.resetFields()
        }
    }
}</script>
