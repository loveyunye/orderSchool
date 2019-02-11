<template>
	<div >
		<el-form  ref="userObject" class="messForm"  :model="userObject" label-position="left" label-width="100px" >
			<el-row>
				<el-col :span="8">
					<el-form-item label="用户名称"  prop="dinnerName">
						<el-input v-model="userObject.name" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="商铺地址"  prop="dinnerName">
						<el-input v-model="userObject.address" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="用户类型"  prop="dinnerName">
						<el-input v-model="userObject.type_name" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="用户头像"  prop="dinnerName">
						<el-input v-model="userObject.portrait" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="账号名称"  prop="dinnerName">
						<el-input v-model="userObject.accout" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="账号密码"  prop="dinnerName">
						<el-input v-model="userObject.password" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
		</el-form>
		
		

	</div>
</template>

<script type="text/javascript">
	import ajax from '@/utils/ajax.js'
	import { mapGetters } from 'vuex'


	export default {
		data() {
			return {
				userObject:{
					user_id: ''
				}
			}
		},
		methods: {
		},
		computed:{
			...mapGetters([
				'userMess',
				'token'
			])
		},
		mounted(){
			console.log(this.userMess)
			this.userObject = JSON.parse(this.userMess)
		}
	}
	
</script>

<style lang="scss" >
	$color: #c01a0c;
	.messForm {
		background-color: #fff;
		padding: 20px;
		// max-width: 600px;
		min-height: 400px;
	}
</style>