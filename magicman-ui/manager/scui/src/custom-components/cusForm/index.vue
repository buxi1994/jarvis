<template>
    <el-dialog :title="titleMap[mode]" v-model="visible" :width="600" destroy-on-close
        @closed="cancelHandle">
        <sc-form ref="formref" :config="config" v-model="form" :loading="loading">
            <el-button @click="cancelHandle">取 消</el-button>
            <el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
        </sc-form>
    </el-dialog>
</template>

<script>
export default {
    name: 'formRender',
    props: {
        apiObj: { type: Object, default: () => { } },
        formItems: { type: Object, default: () => { } },
    },
    data() {
        return {
            mode: "add",
            titleMap: {
                add: '新增',
                edit: '编辑'
            },
            visible: false,
            isSaveing: false,
            config: {
                labelWidth: '130px',
                labelPosition: 'right',
                size: 'medium',
                formItems: []
            },
            form: {}
        }
    },
    created(){
        this.config.formItems = this.formItems;
    },
    watch: {
        visible(bool) {
            if (!bool) {
                this.reset();
            }
        }
    },
    methods: {
        cancelHandle(){
            this.visible = false;
            this.$emit("cancel-form-modal");
            this.$refs.formref.resetFields();
            this.isSaveing = false;
        },
        //显示
        open(mode = 'add') {
            this.mode = mode;
            this.visible = true;
            return this;
        },
        submit() {
            this.$refs.formref.validate(async (valid, obj) => {
                if (valid) {
                    this.isSaveing = true;
                    // eslint-disable-next-line
                    debugger;
                    console.log(JSON.stringify(obj));
                    if (this.form.imageUrl != "") {
                        try {
                            if (this.mode == "add") {
                                await this.apiObj.add(this.form);
                            } else {
                                await this.apiObj.update(this.form);
                            }
                            this.isSaveing = false;
                            this.$emit("success-form-modal");
                            this.$refs.formref.resetFields();
                            this.visible = false;
                        } catch (error) {
                            this.$message.warning(error.statusText);
                        }
                    } else {
                        this.isSaveing = false;
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
            console.log("执行了reset");
            this.$refs.formref.resetFields()
        },
        //表单注入数据
        setData(data) {
            if (data) {
                this.form.id = data.id
                this.form.name = data.name
                this.form.imageUrl = data.imageUrl
                this.form.description = data.description
                this.form.relation = data.relation
            }
        }
    }
}</script>
