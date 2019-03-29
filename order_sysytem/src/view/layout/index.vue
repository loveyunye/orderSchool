<template>
	<div class="layout-container">
		<el-row>
			<el-col :span="3">
				<SiderMenu/>
			</el-col >
			<el-col :span="21">
				<div class="layout-admin">
					<nav-bar class="nav"></nav-bar>
					<div class="app-main" :style="{height: minWidth}">
						<!-- <keep-alive > -->
							<router-view :key="key"></router-view>
						<!-- </keep-alive> -->
					</div>


					<div class="admin_footer">
						校园订餐@2019  {{minWidth}}
						Created by fu
					</div>
				</div>

				
			</el-col >
		</el-row>
		


		
	</div>
</template>

<script type="text/javascript">
	import NavBar from './navBar'
	import SiderMenu from './sider'
	export default {
		data() {
			return {
				minWidth: '500px'
			}
		},
		computed: {
			key() {
				return this.$route.fullPath
			}
		},
		components:{
			NavBar,SiderMenu
		},
		mounted() {
			this.minWidth = (document.body.clientHeight - 120 ) + 'px'
		}
	}
	
</script>

<style type="text/scss" lang="scss">
	.layout-container {
		width: 100%;
		height: 100%;
		background-color: #f0f0f0;
		.nav {
			position: absolute;
			top: 0;
			z-index: 200;
			height: 50px;
			background-color: #fff;
		}
		.layout-admin {
			padding-top: 70px;
			position: relative;
		}
		.app-main {
			// width: 100%;
      // margin: 0 auto 0;
			overflow-y: scroll;
			// overflow-x: hidden;
			&::-webkit-scrollbar {
				width: 5px;
				height: 5px;
			}
			&::-webkit-scrollbar-thumb {
				background-color: rgba(31,120,189,1);
				border-radius: 2.5px;
			}
				 
			
		}
		.admin_footer {
			// bottom: 20px;
			margin: 0 auto;
			color: #666;
			text-align: center;
			// padding:30px 0 20px;
			height: 50px;
			line-height: 50px;
			font-size: 14px;
		}
	}
</style>
