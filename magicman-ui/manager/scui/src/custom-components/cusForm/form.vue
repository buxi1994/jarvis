<template>
    <sc-form ref="formref" :config="config" v-model="form">
        <el-button @click="cancelHandle">取 消</el-button>
        <el-button type="primary" :loading="isSaveing" @click="submit">保 存</el-button>
    </sc-form>
</template>

<script>
export default {
    props: {
        API: { type: Object, default: () => { } },
        config: { type: Object, default: () => { } },
        data: { type: Object, default: () => { } },
        cancel: { type: Object, default: () => { } },
    },
    data() {
        return {
            isSaveing: false,
            form: {...this.data}
        }
    },
    watch: {
        data(value) {
            this.form = {...value};
        }
    },
    methods: {
        cancelHandle() {
            this.reset();
            this.isSaveing = false;
            this.$emit("cancel");
        },
        submit() {
            this.$refs.formref.validate(async (valid, obj) => {
                if (valid) {
                    this.isSaveing = true;
                    // 适用于Select功能，将key-value都提交的情况
                    if (this.config.formItems) {
                        for (const iterator of this.config.formItems) {
                            const addDataToForm = iterator.options && iterator.options.addDataToForm;
                            if (addDataToForm && typeof addDataToForm === "function") {
                                addDataToForm(iterator,this.form);
                            }
                        }
                    }
                    try {
                        if (Object.keys(this.data).length == 0) {
                            await this.API.add(this.form);
                        } else {
                            await this.API.update(this.form);
                        }
                        this.isSaveing = false;
                        this.reset();
                        this.$message.success("提交成功");
                        this.$nextTick(() => {
                            // 第二个参数为true，代表提交成功后需要刷新数据
                            this.$emit("cancel", true);
                        })
                    } catch (error) {
                        this.$message.warning(error ? error.statusText : "提交失败");
                    }
                } else {
                    this.$refs.formref.scrollToField(Object.keys(obj)[0])
                    return false
                }
            })
        },
        reset() {
            return this.$refs.formref.resetFields();
        },
    }
}</script>
