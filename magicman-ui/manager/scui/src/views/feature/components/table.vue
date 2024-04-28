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
			<div class="right-panel" v-if="filterOptions.length>0">
				<cus-filterBar :options="filterOptions" @filterChange="change">
					<template #default="{ filterLength, openFilter }">
						<el-badge :value="filterLength" type="danger" :hidden="filterLength <= 0">
							<el-button icon="el-icon-filter" @click="openFilter"></el-button>
						</el-badge>
					</template>
				</cus-filterBar>
			</div>
		</el-header>
		<el-main class="nopadding">
			<cus-table ref="table" :tableProps="tableProps" :API="API" :tableParams="filterData"
				@selectionChange="selectionChange"></cus-table>
		</el-main>
		<dialog-form :formItems="formItems" ref="dialog" :API="API" @refreshTable="refreshTools" />
	</el-container>
</template>

<script>
import dialogForm from "./dialogForm.vue";
import cusTable from "@/custom-components/cusTable/table.vue";
import cusFilterBar from '@/custom-components/cusFilterBar/filterBar.vue';

export default {
	name: 'tableBase',
	components: {
		dialogForm,
		cusTable,
		cusFilterBar
	},
	props: {
		tableProps: { type: Object, default: () => { } },
		API: { type: Object, default: () => { } },
		formItems: { type: Object, default: () => { } },
		filterOptions: { type: Array, default: ()=>[] },
	},
	data() {
		return {
			selection: [],
			filterData: {},			
		}
	},
	methods: {
		change(data) {
			this.filterData = data;
			this.reload(data);
		},
		filterHandler(value, row, column) {
			const property = column['property']
			return row[property] === value
		},
		//表格选择后回调事件
		selectionChange(selection) {
			this.selection = selection;
		},
		//删除(支持批量删除)
		delTools() {
			this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
				type: 'warning'
			}).then(async () => {
				const loading = this.$loading();
				const deleteIds = [];
				this.selection.forEach(item => {
					console.log(JSON.stringify(this.selection));
					deleteIds.push(item.id);
				})
				try {
					await this.API.delete(deleteIds);
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
			this.$refs.dialog.open("新增").setData({});
		},
		//编辑
		editTool() {
			if (this.selection.length == 1) {
				let rowData = this.selection[0];
				let dom = this.$refs.dialog.open('编辑');
				// 增加延迟是为了解决如下链接bug 
				// https://github.com/element-plus/element-plus/issues/13299
				setTimeout(() => {
					dom.setData(rowData);
				}, 200);
			}
		},
		// 获取列表
		refreshTools() {
			this.$refs.table.refresh();
		},
		// 重载
		reload(params) {
			this.$refs.table.reload(params);
		}
	}
}
</script>

<style></style>