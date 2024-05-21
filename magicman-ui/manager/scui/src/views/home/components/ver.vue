<template>
	<el-card shadow="hover" header="版本信息">
		<div style="height: 210px;text-align: center;">
			<img src="img/ver.svg" style="height:140px"/>
			<h2 style="margin-top: 15px;">Magic Man {{$CONFIG.APP_VER}}</h2>
		</div>
	</el-card>
</template>

<script>
	export default {
		title: "版本信息",
		description: "当前项目版本信息",
	}
</script>
