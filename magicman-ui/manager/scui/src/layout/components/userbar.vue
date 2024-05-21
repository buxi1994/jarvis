<template>
	<div class="user-bar">
		<div class="screen panel-item hidden-sm-and-down" @click="screen">
			<el-icon><el-icon-full-screen /></el-icon>
		</div>
		<el-dropdown class="user panel-item" trigger="click" @command="handleUser">
			<div class="user-avatar">
				<el-avatar :size="30">{{ userNameF }}</el-avatar>
				<label>{{ userName }}</label>
				<el-icon class="el-icon--right"><el-icon-arrow-down /></el-icon>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item divided command="outLogin">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				userName: "",
				userNameF: "",
			}
		},
		created() {
			var userInfo = this.$TOOL.data.get("USER_INFO");
			this.userName = userInfo.userName;
			this.userNameF = this.userName.substring(0,1);
		},
		methods: {
			//个人信息
			handleUser(command) {
				if(command == "outLogin"){
					this.$confirm('确认是否退出当前用户？','提示', {
						type: 'warning',
						confirmButtonText: '退出',
						confirmButtonClass: 'el-button--danger'
					}).then(() => {
						this.$router.replace({path: '/login'});
					}).catch(() => {
						//取消退出
					})
				}
			},
			//全屏
			screen(){
				var element = document.documentElement;
				this.$TOOL.screen(element)
			},
		}
	}
</script>

<style scoped>
	.user-bar {display: flex;align-items: center;height: 100%;}
	.user-bar .panel-item {padding: 0 10px;cursor: pointer;height: 100%;display: flex;align-items: center;}
	.user-bar .panel-item i {font-size: 16px;}
	.user-bar .panel-item:hover {background: rgba(0, 0, 0, 0.1);}
	.user-bar .user-avatar {height:49px;display: flex;align-items: center;}
	.user-bar .user-avatar label {display: inline-block;margin-left:5px;font-size: 12px;cursor:pointer;}
</style>
