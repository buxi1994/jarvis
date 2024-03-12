// 静态路由配置
// 书写格式与动态路由格式一致，全部经由框架统一转换
// 比较动态路由在meta中多加入了role角色权限，为数组类型。一个菜单是否有权限显示，取决于它以及后代菜单是否有权限。
// routes 显示在左侧菜单中的路由(显示顺序在动态路由之前)
// 示例如下

const routes = [
	{
		name: "dashboard",
		path: "/dashboard",
		meta: {
			title: "控制台",
			icon: "el-icon-menu",
			affix: true,
		},
		component: "home",
	},
	{
		name: "feature",
		path: "/feature",
		meta: {
			title: "特性",
			icon: "el-icon-files",
			type: "menu",
		},
		children: [
			{
				name: "tools",
				path: "/feature/tools",
				meta: {
					title: "工具",
					icon: "el-icon-box",
					affix: true,
				},
				component: "tools/index",
			},
			{
				name: "recommend",
				path: "/feature/recommend",
				meta: {
					title: "推荐",
					icon: "el-icon-medal",
					affix: true,
				},
				component: "recommend/index",
			},
		],
	},
];

export default routes;
