<template>
    <cus-dialog ref="dialog">
        <cus-form ref="form" :API="API" :config="config" :data="form" @cancel="cancelFormHandle"></cus-form>
    </cus-dialog>
</template>

<script>
import cusDialog from '@/custom-components/cusDialog/dialog.vue';
import cusForm from '@/custom-components/cusForm/form.vue';

export default {
    components: {
        cusDialog,
        cusForm
    },
    props: {
        formItems: { type: Object, default: () => { } },
        API: { type: Object, default: () => { } },
    },
    data() {
        return {
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
    created() {
        this.config.formItems = this.formItems;
    },
    methods: {
        cancelFormHandle() {
            this.hide();
            this.reset();
        },
        //弹窗显示
        open(title) {
            this.$refs.dialog.show(title);
            return this;
        },
        //弹窗隐藏
        hide() {
            this.$refs.dialog.hide();
            return this;
        },
        // TODO reset是用来干什么的?
        reset() {
            this.$refs.form.reset()
        },
        //表单注入数据
        setData(data) {
            this.$nextTick(() => {
                this.$refs.form.setData(data);
            });
        },
    }
}</script>
