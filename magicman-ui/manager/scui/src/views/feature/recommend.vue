<template>
	<cus-table :tableProps="tableProps" :API="API" :filterOptions="filterOptions" :formItems="formItems"></cus-table>
</template>

<script>
import cusTable from "./components/table.vue";

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
				prop: "groupName",
				label: "群组",
			}, {
				prop: "description",
				label: "说明",
				width: 250,
			}, {
				prop: "createTime",
				label: "修改时间",
				width: 150
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
								let list = await this.$API.demo.group.get();
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