<template>
	<div >
		
		<el-form  ref="userObject" class="messForm"  :model="userObject" label-position="left" label-width="100px" :rules="rules">
			<el-row>
				<el-col :span="5" :offset="2">
					<el-upload
						:disabled="uneditStatus"
						class="avatar-uploader"
						action="/sys/upload/img"
						name="_file"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-col>
				<el-col :span="8">
					<el-form-item label="用户名称:"  prop="name">
						<el-input v-model="userObject.name" :disabled="uneditStatus" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="商铺地址:"  prop="address" v-if="userObject.user_id!==1">
						<el-input v-model="userObject.address" :disabled="uneditStatus" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="用户类型:"  prop="type_name">
						<el-input v-model="userObject.type_name" style="width:90%;" disabled placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="联系方式:"  prop="phone" v-if="userObject.user_id!==1">
						<el-input v-model="userObject.phone" :disabled="uneditStatus"  style="width:90%;" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="头像地址:"  prop="portrait">
						<el-input v-model="userObject.portrait"  style="width:90%;" disabled  placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="账号名称:"  prop="accout">
						<el-input v-model="userObject.accout" disabled style="width:90%;" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="账号密码:"  prop="password">
						<el-input v-model="userObject.password" :disabled="uneditStatus" :type="uneditStatus?'password':'text'" style="width:90%;" placeholder=""></el-input>
					</el-form-item>

					
					<el-form-item label="备注信息:"  prop="remark">
						<el-input v-model="userObject.remark" :disabled="uneditStatus" type="textarea" style="width:90%;" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="block">

			</div>
			<el-row>
				<el-col :span="5" :offset="8" style="text-align:center">
        	<el-button type="primary" style="margin-left: 5px;" v-if="uneditStatus" @click="editMess" icon="el-icon-edit"  >修改</el-button>
					<el-button   type="success"  icon="el-icon-success" v-else @click="confirmEdit">确定</el-button>
					<el-button     icon="el-icon-error" v-if="!uneditStatus" @click="getUserMess">取消</el-button>
				</el-col>
			</el-row>	
			
		</el-form>
		
		
		

	</div>
</template>

<script type="text/javascript">
	import ajax from '@/utils/ajax.js'
	import { mapGetters } from 'vuex'
import { valid } from 'semver';


	export default {
		data() {
			return {
				userObject:{
					user_id: '',
					address:'',
					phone: ''
					
				},
				imageUrl: '',
				uneditStatus: true,

				rules:{
					name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        	address: [{ required: true, message: '不能为空', trigger: 'blur' }],
        	type_name: [{  required: true, message: '不能为空', trigger: 'change' }],
        	portrait: [{  required: true, message: '不能为空', trigger: 'change' }],
        	accout: [{  required: true, message: '不能为空', trigger: 'change' }],
        	password: [{  required: true, message: '不能为空', trigger: 'change' }],
        	phone: [{  required: true, message: '不能为空', trigger: 'change' }]
				},
			}
		},
		methods: {
			confirmEdit(){
				this.$refs.userObject.validate(valid => {
					if (valid) {
						ajax('/sys/user/updateUser',this.userObject,'.messForm').then(res => {
							this.$message.success(`修改成功`)
							this.$store.dispatch('setUserMess',this.userObject)
							this.getUserMess()
						})
					} else {
						this.$message('请按照提示写入')
					}
				})
			},
			editMess(){
				this.$prompt('请输入当前用户密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
					if(value === this.userObject.password){
						this.uneditStatus = false;
					} else {
						this.$message({
							type: 'error',
							message: '密码输入错误'
						});
					}
          
        }).catch(() => {      
        });
			},
			handleAvatarSuccess(res, file) {
				this.userObject.portrait = res.fileUrl
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
				
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
			},
			getUserMess(){
				this.uneditStatus = true
				this.userObject = JSON.parse(this.userMess)
				this.imageUrl = this.userObject.portrait
				
			}
		},
		computed:{
			...mapGetters([
				'userMess',
				'token'
			])
		},
		mounted(){
			this.getUserMess()
		}
	}
	
</script>

<style lang="scss">
	$color: #c01a0c;
	.messForm {
		background-color: #fff;
		padding: 20px;
		// max-width: 600px;
		min-height: 400px;

		.block {
			height: 30px;
		}
		.el-button {
			width: 100px;
		}

		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
	}

	
</style>