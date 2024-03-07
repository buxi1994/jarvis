<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="tool_add"></el-button>
				<el-button type="primary" icon="el-icon-edit" :disabled="selection.length != 1"
					@click="editTool"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length == 0"
					@click="delTools"></el-button>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="list.Tools" row-key="id" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="名称" prop="name" width="150"></el-table-column>
				<el-table-column label="图标" width="150">
					<template #default="scope">
						<div style="display: flex; align-items: center;width:50%">
							<el-image fit="cover" :src="scope.row.imageUrl" />
						</div>
					</template>
				</el-table-column>
				<el-table-column label="类型" prop="type" width="150" :filters="typeFilters"
					:filter-method="filterHandler">

					<template #default="scope">
						<el-tag v-if="scope.row.type == 'link'">{{ scope.row.type }}</el-tag>
						<el-tag v-if="scope.row.type == 'action'">{{ scope.row.type }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="说明" prop="description" width="250"></el-table-column>
				<el-table-column label="修改时间" prop="createTime" width="150" sortable></el-table-column>
			</scTable>
		</el-main>
		<sc-dialog v-model="isShowModal" draggable :title="modalTitle">
			<form-layout :apiObj="list.Tools" @close-form-modal="closeFormModal"></form-layout>
		</sc-dialog>
	</el-container>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
	name: 'tableBase',
	components: {
		'form-layout': defineAsyncComponent(() => import("./form.vue")),
	},
	data() {
		return {
			modalTitle: "编辑",
			isShowModal: false,
			typeFilters: [
				{ text: 'link', value: 'link' },
				{ text: 'action', value: 'action' }
			],
			list: {
				Tools: this.$API.demo.list,
			},
			selection: [],
		}
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
		closeFormModal() {
			this.isShowModal = false;
			this.refreshTools();
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
					await this.list.Tools.delete(deleteIds);
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
		tool_add() {
			this.isShowModal = true;
			// this.dialog.save = true
			// this.$nextTick(() => {
			// 	this.$refs.saveDialog.open()
			// })
		},
		//编辑
		editTool(row) {
			this.isShowModal = true;
			console.log(row);
			// this.dialog.save = true
			// this.$nextTick(() => {
			// 	this.$refs.saveDialog.open('edit').setData(row)
			// })
		},
		// 获取列表
		refreshTools() {
			this.$refs.table.refresh();
		}

	}
}
</script>

<style></style>
