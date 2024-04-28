<template>
	<div class="sc-filterBar">
		<slot :filterLength="filterObjLength" :openFilter="openFilter">
			<el-badge :value="filterObjLength" type="danger" :hidden="filterObjLength <= 0">
				<el-button icon="el-icon-filter" @click="openFilter"></el-button>
			</el-badge>
		</slot>

		<el-drawer title="过滤器" v-model="drawer" :size="360" append-to-body>
			<el-container>
				<el-main style="padding:0">
					<template #label>
						<div class="tabs-label">过滤项</div>
					</template>
					<el-scrollbar>
						<div class="sc-filter-main">
							<h2>设置过滤条件</h2>
							<div v-if="filter.length <= 0" class="nodata">
								没有过滤条件
							</div>
							<table v-else>
								<tr v-for="(item, index) in filter" :key="index">
									<td>
										<el-tag :disable-transitions="true">{{ index + 1 }}</el-tag>
									</td>
									<td>
										<el-input v-if="!item.field.type" v-model="item.value" placeholder="请选择过滤字段"
											disabled></el-input>
										<!-- 输入框 -->
										<el-input v-if="item.field.type == 'text'" v-model="item.value"
											:placeholder="item.field.placeholder || '请输入'"></el-input>
										<!-- 下拉框 -->
										<el-select v-if="item.field.type == 'select'" v-model="item.value"
											:placeholder="item.field.placeholder || '请选择'" filterable
											:multiple="item.field.extend.multiple" :loading="item.selectLoading"
											:clearable="item.field.clearable"
											@visible-change="visibleChange($event, item)"
											:remote="item.field.extend.remote"
											:remote-method="(query) => { remoteMethod(query, item) }">
											<el-option v-for="field in item.field.extend.data" :key="field.value"
												:label="field.label" :value="field.value"></el-option>
										</el-select>
										<!-- 日期 -->
										<el-date-picker v-if="item.field.type == 'date'" v-model="item.value"
											type="date" value-format="YYYY-MM-DD"
											:placeholder="item.field.placeholder || '请选择日期'"
											style="width: 100%;"></el-date-picker>
										<!-- 日期范围 -->
										<el-date-picker v-if="item.field.type == 'daterange'" v-model="item.value"
											type="daterange" value-format="YYYY-MM-DD" start-placeholder="开始日期"
											end-placeholder="结束日期" style="width: 100%;"></el-date-picker>
										<!-- 日期时间 -->
										<el-date-picker v-if="item.field.type == 'datetime'" v-model="item.value"
											type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
											:placeholder="item.field.placeholder || '请选择日期'"
											style="width: 100%;"></el-date-picker>
										<!-- 日期时间范围 -->
										<el-date-picker v-if="item.field.type == 'datetimerange'" v-model="item.value"
											type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
											start-placeholder="开始日期" end-placeholder="结束日期"
											style="width: 100%;"></el-date-picker>
										<!-- 自定义日期 -->
										<el-date-picker v-if="item.field.type == 'customDate'" v-model="item.value"
											:type="item.field.extend.dateType || 'date'"
											:value-format="item.field.extend.valueFormat"
											:placeholder="item.field.placeholder || '请选择'" start-placeholder="开始日期"
											end-placeholder="结束日期" style="width: 100%;"></el-date-picker>
										<!-- 开关 -->
										<el-switch v-if="item.field.type == 'switch'" v-model="item.value"
											active-value="1" inactive-value="0"></el-switch>
										<!-- 标签 -->
										<el-select v-if="item.field.type == 'tags'" v-model="item.value" multiple
											filterable allow-create default-first-option no-data-text="输入关键词后按回车确认"
											:placeholder="item.field.placeholder || '请输入'"></el-select>
									</td>
								</tr>
							</table>
						</div>
					</el-scrollbar>
				</el-main>
				<el-footer>
					<el-button type="primary" @click="ok" :disabled="filter.length <= 0">立即过滤</el-button>
					<el-button @click="clear">清空过滤</el-button>
				</el-footer>
			</el-container>
		</el-drawer>
	</div>
</template>

<script>
export default {
	name: 'filterBar',
	props: {
		filterName: { type: String, default: "" },
		options: { type: Object, default: () => { } }
	},
	emits: ['filterChange'],
	data() {
		return {
			drawer: false,
			fields: this.options,
			filter: []
		}
	},
	computed: {
		filterObj() {
			const obj = {}
			this.filter.forEach((item) => {
				obj[item.field.value] = `${item.value}`
			})
			return obj
		},
		filterObjLength() {
			return this.filter.length;
		}
	},
	mounted() {
		//显示的过滤项
		this.fields.forEach((item) => {
			this.filter.push({
				field: item,
				value: ''
			})
		})
	},
	methods: {
		//打开过滤器
		openFilter() {
			this.drawer = true
		},
		//下拉框显示事件处理异步
		async visibleChange(isopen, item) {
			if (isopen && item.field.extend.request && !item.field.extend.remote) {
				item.selectLoading = true;
				try {
					var data = await item.field.extend.request()
				} catch (error) {
					console.log(error);
				}
				item.field.extend.data = data;
				item.selectLoading = false;
			}
		},
		//下拉框显示事件处理异步搜索
		async remoteMethod(query, item) {
			if (!item.field.extend.request) {
				return false;
			}
			if (query !== '') {
				item.selectLoading = true;
				try {
					var data = await item.field.extend.request(query);
				} catch (error) {
					console.log(error);
				}
				item.field.extend.data = data;
				item.selectLoading = false;
			} else {
				item.field.extend.data = [];
			}
		},
		//立即过滤
		ok() {
			this.filterObjLength = this.filter.length
			this.$emit('filterChange', this.filterObj)
			this.drawer = false
		},
		//清空过滤
		clear() {
			for (const iterator of this.filter) {
				iterator.value = "";
			}
			this.$emit('filterChange', this.filterObj)
			this.drawer = false;
		}
	}
}
</script>

<style scoped>
.tabs-label {
	padding: 0 20px;
}

.nodata {
	height: 46px;
	line-height: 46px;
	margin: 15px 0;
	border: 1px dashed #e6e6e6;
	color: #999;
	text-align: center;
	border-radius: 3px;
}

.sc-filter-main {
	padding: 20px;
	border-bottom: 1px solid #e6e6e6;
	background: #fff;
}

.sc-filter-main h2 {
	font-size: 12px;
	color: #999;
	font-weight: normal;
}

.sc-filter-main table {
	width: 100%;
	margin: 15px 0;
}

.sc-filter-main table tr {}

.sc-filter-main table td {
	padding: 5px 10px 5px 0;
}

.sc-filter-main table td:deep(.el-input .el-input__inner) {
	vertical-align: top;
}

.sc-filter-main table td .el-select {
	display: block;
}

.sc-filter-main table td .el-date-editor.el-input {
	display: block;
	width: 100%;
}

.root {
	display: flex;
	height: 100%;
	flex-direction: column
}

.root:deep(.el-tabs__header) {
	margin: 0;
}

.root:deep(.el-tabs__content) {
	flex: 1;
	background: #f6f8f9;
}

.root:deep(.el-tabs__content) .el-tab-pane {
	overflow: auto;
	height: 100%;
}
</style>
