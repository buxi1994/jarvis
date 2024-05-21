import config from "./config"
import api from './api'
import tool from './utils/tool'
import http from "./utils/request"
import { permission, rolePermission } from './utils/permission'

import scTable from './components/scTable'
import scTableColumn from './components/scTable/column.js'
import scFormTable from './components/scFormTable'
import scTableSelect from './components/scTableSelect'
import scPageHeader from './components/scPageHeader'
import scDialog from './components/scDialog'
import scForm from './components/scForm'
import scTitle from './components/scTitle'
import scWaterMark from './components/scWaterMark'
import scQrCode from './components/scQrCode'

import scStatusIndicator from './components/scMini/scStatusIndicator'
import scTrend from './components/scMini/scTrend'

import errorHandler from './utils/errorHandler'

import * as elIcons from '@element-plus/icons-vue'

export default {
	install(app) {
		//挂载全局对象
		app.config.globalProperties.$CONFIG = config;
		app.config.globalProperties.$TOOL = tool;
		app.config.globalProperties.$HTTP = http;
		app.config.globalProperties.$API = api;
		app.config.globalProperties.$AUTH = permission;
		app.config.globalProperties.$ROLE = rolePermission;

		//注册全局组件
		app.component('scTable', scTable);
		app.component('scTableColumn', scTableColumn);
		app.component('scFormTable', scFormTable);
		app.component('scTableSelect', scTableSelect);
		app.component('scPageHeader', scPageHeader);
		app.component('scDialog', scDialog);
		app.component('scForm', scForm);
		app.component('scTitle', scTitle);
		app.component('scWaterMark', scWaterMark);
		app.component('scQrCode', scQrCode);
		app.component('scStatusIndicator', scStatusIndicator);
		app.component('scTrend', scTrend);

		//统一注册el-icon图标
		for(let icon in elIcons){
			app.component(`ElIcon${icon}`, elIcons[icon])
		}

		//关闭async-validator全局控制台警告
		window.ASYNC_VALIDATOR_NO_WARNING = 1

		//全局代码错误捕捉
		app.config.errorHandler = errorHandler
	}
}
