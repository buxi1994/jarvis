<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="addTool"></el-button>
				<el-button type="primary" icon="el-icon-edit" :disabled="selection.length != 1"
					@click="editTool"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length == 0"
					@click="delTools"></el-button>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="Api" row-key="id" @selection-change="selectionChange" stripe>
				<template v-for="(item, index) in tableAttr" :key="index">
					<el-table-column v-if="item.type == 'selection'" type="selection"
						:width="item.width"></el-table-column>
					<el-table-column v-else-if="item.type == 'img'" :label="item.label" :width="item.width">
						<template #default="scope">
							<div style="display: flex; align-items: center;width:50px;height:50px">
								<el-image fit="cover" :src="scope.row[item.prop]" />
							</div>
						</template>
					</el-table-column>
					<el-table-column v-else-if="item.type == 'filter'" :label="item.label" :width="item.width"
						:prop="item.prop" :filters="item.typeFilters || []" :filter-method="filterHandler">
						<template #default="scope">
							<template v-for="(filter, filterIndex) in item.typeFilters" :key="filterIndex">
								<el-tag v-if="scope.row[item.prop] == filter.value">{{ scope.row[item.prop] }}</el-tag>
							</template>
						</template>
					</el-table-column>
					<el-table-column v-else :label="item.label" :prop="item.prop" :width="item.width"></el-table-column>
				</template>
			</scTable>
		</el-main>
		<form-dialog v-if="dialog.visible" :formItems="formItems" ref="formDialog" :apiObj="Api" @success-form-modal="successFormModal" @close-form-modal="cancelFormModal" />
	</el-container>
</template>

<script>
import formDialog from "@/custom-components/cusForm/index.vue";

export default {
	name: 'tableBase',
	components: {
		formDialog
	},
	props: {
		tableProps: { type: Object, default: () => { } },
		API:{type: Object, default: () => { }},
		formItems:{type: Object, default: () => { }},
	},
	data() {
		return {
			dialog: {
				visible: false
			},
			typeFilters: [
				{ text: 'link', value: 'link' },
				{ text: 'action', value: 'action' }
			],
			Api: {},
			selection: [],
			editData: {},
			tableAttr: [],
		}
	},
	created() {
		this.tableAttr = this.tableProps;
		this.Api = this.API;
	},
	methods: {
		filterHandler(value, row, column) {
			const property = column['property']
			return row[property] === value
		},
		//表格选择后回调事件
		selectionChange(selection) {
			this.selection = selection;
		},
		successFormModal() {
			this.cancelFormModal();
			this.refreshTools();
		},
		cancelFormModal(){
			console.log("do   closeFormModal");
			this.dialog.visible = false;
		},
		//删除(支持批量删除)
		delTools() {
			this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
				type: 'warning'
			}).then(async () => {
				// eslint-disable-next-line
				debugger;
				const loading = this.$loading();
				const deleteIds = [];
				this.selection.forEach(item => {
					console.log(JSON.stringify(this.selection));
					deleteIds.push(item.id);
				})
				try {
					await this.Api.delete(deleteIds);
					this.$message.success("删除成功");
					this.refreshTools();
					loading.close();
				} catch (error) {
					loading.close();
					this.$message.warning(error.statusText)
				}
			}).catch(() => {
			})
		},
		//增加
		addTool() {
			this.dialog.visible = true;
			this.$nextTick(() => {
				this.$refs.formDialog.open();
			})
		},
		//编辑
		editTool() {
			this.dialog.visible = true;
			if (this.selection.length == 1) {
				let rowData = this.selection[0];
				this.$nextTick(() => {
					this.$refs.formDialog.open('edit').setData(rowData);
				})
			}
		},
		// 获取列表
		refreshTools() {
			this.$refs.table.refresh();
		}
	}
}
</script>

<style></style>