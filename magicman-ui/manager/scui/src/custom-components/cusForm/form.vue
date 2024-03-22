<template>
    <sc-form ref="formref" :config="config" v-model="form" :loading="loading">
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
                    try {
                        if (Object.keys(this.data).length == 0) {
                            await this.API.add(this.form);
                        } else {
                            await this.API.update(this.form);
                        }
                        this.isSaveing = false;
                        this.reset();
                        this.$message.success("提交成功");
                        this.$nextTick(()=>{
                            this.$emit("cancel");
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
            this.$refs.formref.resetFields()
        },
        //表单注入数据
        setData(data) {
            if (data) {
                this.form = data;
            }
        },
    }
}</script>
