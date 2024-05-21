<template>
	<div :class="['widgets-home']" ref="main">
		<div class="widgets-content">
			<div class="widgets-top">
				<div class="widgets-top-title">
					控制台
				</div>
			</div>
			<div class="widgets" ref="widgets">
				<div class="widgets-wrapper">
					<div v-if="nowCompsList.length <= 0" class="no-widgets">
						<el-empty image="img/no-widgets.svg" description="没有部件啦" :image-size="280"></el-empty>
					</div>
					<el-row :gutter="15">
						<el-col v-for="(item, index) in grid.layout" v-bind:key="index" :md="item" :xs="24">
							<div v-for="(element, key) in grid.copmsList[index]" v-bind:key="key">
								<div class="widgets-item">
									<component :is="allComps[element]"></component>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import allComps from './components'

export default {
	data() {
		return {
			allComps: allComps,
			selectLayout: [],
			defaultGrid: this.$CONFIG.DEFAULT_GRID,
			grid: []
		}
	},
	created() {
		this.grid =  JSON.parse(JSON.stringify(this.defaultGrid))
	},
	computed: {
		allCompsList() {
			var allCompsList = []
			for (var key in this.allComps) {
				allCompsList.push({
					key: key,
					title: allComps[key].title,
					icon: allComps[key].icon,
					description: allComps[key].description
				})
			}
			var myCopmsList = this.grid.copmsList.reduce(function (a, b) { return a.concat(b) })
			for (let comp of allCompsList) {
				const _item = myCopmsList.find((item) => { return item === comp.key })
				if (_item) {
					comp.disabled = true
				}
			}
			return allCompsList
		},
		nowCompsList() {
			return this.grid.copmsList.reduce(function (a, b) { return a.concat(b) })
		}
	},
}
</script>

<style scoped lang="scss">
.widgets-home {
	display: flex;
	flex-direction: row;
	flex: 1;
	height: 100%;
}

.widgets-content {
	flex: 1;
	overflow: auto;
	overflow-x: hidden;
	padding: 15px;
}

.widgets-top {
	margin-bottom: 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.widgets-top-title {
	font-size: 18px;
	font-weight: bold;
}

.widgets {
	transform-origin: top left;
	transition: transform .15s;
}
</style>
