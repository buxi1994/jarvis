<template>
	<cus-table :tableProps="tableProps" :API="API" :formItems="formItems"></cus-table>
</template>

<script>
import cusTable from "@/custom-components/cusTable/index.vue";

export default {
	components: {
		cusTable
	},
	data() {
		return {
			API: this.$API.demo.recommend,
			formItems: [
				{
					label: "名称",
					name: "name",
					value: "",
					component: "input",
					options: {
						maxlength: "10",
						placeholder: "推荐标题",
					},
					rules: [
						{ required: true, message: "名称必填", trigger: "blur" }
					],
				}, {
					label: "类型",
					name: "type",
					value: "recommend",
					component: "radio",
					options: {
						items: [
							{
								label: "recommend",
								value: "recommend"
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
				prop: "type",
				label: "类型",
				width: 150,
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