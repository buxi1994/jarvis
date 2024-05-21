/**
 * @description 所有 api 
 */
import config from "@/config"
import http from "@/utils/request"

export default {
	auth:{
		token: {
			url: `${config.API_URL}/token`,
			name: "登录获取TOKEN",
			post: async function (data = {}) {
				// eslint-disable-next-line
				debugger;
				return await http.post(this.url, data);
			},
		},
	},
	tools: {
		name: "工具",
		get: async function (params) {
			params.type = "link,modal";
			return await http.get(
				"https://localhost:8090/magicman/scene/toolsinfo",
				params
			);
		},
		add: async function (params) {
			return await http.post(
				"https://localhost:8090/magicman/scene/add/tool",
				params
			);
		},
		update: async function (params) {
			return await http.post(
				"https://localhost:8090/magicman/scene/update/tool",
				params
			);
		},
		delete: async function (params) {
			return await http.delete(
				"https://localhost:8090/magicman/scene/delete/tools",
				params
			);
		},
	},
	recommend: {
		name: "推荐",
		get: async function (params) {
			params.type = "recommend";
			return await http.get(
				"https://localhost:8090/magicman/scene/toolsinfo",
				params
			);
		},
		add: async function (params) {
			return await http.post(
				"https://localhost:8090/magicman/scene/add/tool",
				params
			);
		},
		update: async function (params) {
			return await http.post(
				"https://localhost:8090/magicman/scene/update/tool",
				params
			);
		},
		delete: async function (params) {
			return await http.delete(
				"https://localhost:8090/magicman/scene/delete/tools",
				params
			);
		},
	},
	group: {
		name: "群组",
		get: async function (params) {
			return await http.get(
				"https://localhost:8090/magicman/scene/group/info",
				params
			);
		},
		add: async function (params) {
			return await http.post(
				"https://localhost:8090/magicman/scene/submit/group",
				params
			);
		},
		update: async function (params) {
			return await http.post(
				"https://localhost:8090/magicman/scene/update/group",
				params
			);
		},
		delete: async function (params) {
			return await http.delete(
				"https://localhost:8090/magicman/scene/delete/group",
				params
			);
		},
	},
	feedback: {
		name: "反馈",
		get: async function (params) {
			return await http.get(
				"https://localhost:8090/magicman/scene/feedback/info",
				params
			);
		},
		add: async function (params) {
			return await http.post(
				"https://localhost:8090/magicman/scene/submit/feedback",
				params
			);
		},
		update: async function (params) {
			return await http.post(
				"https://localhost:8090/magicman/scene/update/feedback",
				params
			);
		},
	},
};
