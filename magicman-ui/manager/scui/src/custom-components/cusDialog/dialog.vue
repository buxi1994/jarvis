<template>
    <sc-dialog v-model="visible" :title="title" @closed="hide">
        <slot></slot>
    </sc-dialog>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            visible: false,
        }
    },
    methods: {
        hide() {
            this.title = "";
            this.visible = false;
            return this;
        },
        show(title) {
            this.title = title;
            this.visible = true;
            return this;
        }
    }
}</script>
