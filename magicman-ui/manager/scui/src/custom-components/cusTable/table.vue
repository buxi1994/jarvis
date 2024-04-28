<template>
    <scTable ref="table" :params="tableParams" :apiObj="API" row-key="id" @selection-change="selectionChange(selection)" stripe>
        <template v-for="(item, index) in tableProps" :key="index">
            <el-table-column v-if="item.type == 'selection'" type="selection" :width="item.width"></el-table-column>
            <el-table-column v-else-if="item.type == 'img'" :label="item.label" :width="item.width">
                <template #default="scope">
                    <div style="display: flex; align-items: center;width:50px;height:50px">
                        <el-image fit="cover" :src="scope.row[item.prop]" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-else-if="item.type == 'filter'" :label="item.label" :width="item.width" :prop="item.prop"
                :filters="item.typeFilters || []" :filter-method="filterHandler">
                <template #default="scope">
                    <template v-for="(filter, filterIndex) in item.typeFilters" :key="filterIndex">
                        <el-tag v-if="scope.row[item.prop] == filter.value">{{ item.options[scope.row[item.prop]]
                            }}</el-tag>
                    </template>
                </template>
            </el-table-column>
            <el-table-column v-else-if="item.type == 'event'" :label="item.label" :width="item.width">
                <template #default="scope">
                    <template v-for="(eventItem, eventItemIndex) in item.events" :key="eventItemIndex">
                        <el-button size="small" type="primary" @click="eventItem.click(scope.row[eventItem.prop])">{{
        eventItem.label }}</el-button>
                    </template>
                </template>
            </el-table-column>
            <el-table-column v-else :label="item.label" :prop="item.prop" :width="item.width"></el-table-column>
        </template>
    </scTable>
</template>

<script>
export default {
    props: {
        tableProps: { type: Object, default: () => { } },
        tableParams: { type: Object, default: () => { } },
        API: { type: Object, default: () => { } },
        selectionChange: { type: Function, default: () => { } },
    },
    methods: {
        // 过滤
        filterHandler(value, row, column) {
            const property = column['property']
            return row[property] === value
        },
        // 获取列表
        refresh() {
            this.$refs.table.refresh();
        },
        // 重载
        reload(params) {
            this.$refs.table.reload(params);
        }
    }
}
</script>