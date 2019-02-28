<template>
	<div class="customerManage">
		<el-tabs v-model="activeName2" >
			<el-tab-pane label="商家管理" name="first">
				<business-manage/>


			</el-tab-pane>
			<el-tab-pane label="小程序用户管理" name="second">
				


			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script type="text/javascript">
	import BusinessManage from './businessManage.vue'

	export default {
		data() {
			return {
				activeName2: "first"
			}
		},
		components:{
			BusinessManage
		}
	}
	
</script>

<style lang="scss" >
	$color: #c01a0c;
	.customerManage {
		.el-tabs__nav-scroll {
			overflow: hidden;
			background-color: #fff;
			padding-left: 20px;
			line-height: 50px;
			height: 50px;
		}
		.el-tabs__header {
			margin: 0;
		}
		.el-tabs__item {
			font-weight: 400;
		}

	}
</style>