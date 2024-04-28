import config from "@/config"
import http from "@/utils/request"

export default {
	ver: {
		url: `${config.API_URL}/demo/ver`,
		name: "获取最新版本号",
		get: async function(params){
			return await http.get(this.url, params);
		}
	},
	post: {
		url: `${config.API_URL}/demo/post`,
		name: "分页列表",
		post: async function(data){
			return await http.post(this.url, data, {
				headers: {
					//'response-status': 401
				}
			});
		}
	},
	page: {
		url: `${config.API_URL}/demo/page`,
		name: "分页列表",
		get: async function(params){
			return await http.get(this.url, params);
		}
	},
	tools: {
		name: "工具",
		get: async function(params){
			params.type = "link,modal";
			return await http.get("https://localhost:8090/magicman/scene/toolsinfo", params);
		},
		add: async function(params){
			return await http.post("https://localhost:8090/magicman/scene/add/tool", params);
		},
		update:async function(params){
			return await http.post("https://localhost:8090/magicman/scene/update/tool", params);
		},
		delete: async function(params){
			return await http.delete("https://localhost:8090/magicman/scene/delete/tools", params);
		},
	},
	recommend: {
		name: "推荐",
		get: async function(params){
			params.type = "recommend";
			return await http.get("https://localhost:8090/magicman/scene/toolsinfo", params);
		},
		add: async function(params){
			return await http.post("https://localhost:8090/magicman/scene/add/tool", params);
		},
		update:async function(params){
			return await http.post("https://localhost:8090/magicman/scene/update/tool", params);
		},
		delete: async function(params){
			return await http.delete("https://localhost:8090/magicman/scene/delete/tools", params);
		},
	},
	group: {
		name: "群组",
		get: async function(params){
			return await http.get("https://localhost:8090/magicman/scene/group/info", params);
		},
		add: async function(params){
			return await http.post("https://localhost:8090/magicman/scene/submit/group", params);
		},
		update:async function(params){
			return await http.post("https://localhost:8090/magicman/scene/update/group", params);
		},
		delete: async function(params){
			return await http.delete("https://localhost:8090/magicman/scene/delete/group", params);
		},
	},
	feedback: {
		name: "反馈",
		get: async function(params){
			return await http.get("https://localhost:8090/magicman/scene/feedback/info", params);
		},
		add: async function(params){
			return await http.post("https://localhost:8090/magicman/scene/submit/feedback", params);
		},
		update:async function(params){
			return await http.post("https://localhost:8090/magicman/scene/update/feedback", params);
		},
		// delete: async function(params){
		// 	return await http.delete("https://localhost:8090/magicman/scene/delete/tools", params);
		// },
	},
	menu: {
		url: `${config.API_URL}/demo/menu`,
		name: "普通用户菜单",
		get: async function(){
			return await http.get(this.url);
		}
	},
	status: {
		url: `${config.API_URL}/demo/status`,
		name: "模拟无权限",
		get: async function(code){
			return await http.get(this.url, {}, {
				headers: {
					"response-status": code
				}
			});
		}
	}
}
