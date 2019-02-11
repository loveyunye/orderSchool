<template>
	<div class="login-container">
		<div class="loginHeader">
			<!-- <img src="../../assets/title_new.png" width="700px"> -->
			校园订餐
		</div>
		<!-- <router-link to="/">登陆</router-link> -->
		<el-form class="login-form"  :model="loginForm" :rules="loginRules" ref="loginForm">
			<div class="title-container">
				<div class="accout">用户登录</div>
			</div>

			<el-form-item prop="userName">
				<div class="formDiv">
					<div class="name">用户名:</div><div class="input"><input 
						style="border: none;
						outline:none;
    				width: 80%;
						background-color:#fff;
    				border-bottom: 1px solid #777;line-height: 40px;padding-left:10px;"
					 type="text" v-model="loginForm.userName"></div>
				</div>
			</el-form-item>
			<el-form-item prop="password">
				<div class="formDiv">
					<div class="name">密码:</div><div class="input"><input 
					style="border: none;
    				width: 80%;
						background-color:#fff;
						outline:none;
    				border-bottom: 1px solid #777;line-height: 40px;padding-left:10px;"
					type="password" v-model="loginForm.password"></div>
				</div>
			</el-form-item>
			<!-- <el-form-item>
				验证码 <input type="text">
			</el-form-item> -->
			<!-- <el-button @click.native="loginUserInfo">登陆</el-button> -->
			<div class="submit">
				<el-button type="primary" style="width:80%;margin-bottom:20px;" :loading="loading" @click.native.prevent="loginUserInfo">登录</el-button>
			</div>
		</el-form>


		<div class="loginFooter">
			校园订餐@2019 
			Created by fu
			
		</div>
	</div>
</template>

<script type="text/javascript">

	export default {
		data() {
			return {
				loginForm: {
					userName: 'admin',
					password: '123456'
				},
				loginRules: {
					userName: [{ required: true, trigger: 'blur' , message: '不能为空'}],
					password: [{ required: true, trigger: 'blur',  message: '不能为空'}]
				},
				loading:false,
			}
		},
		methods: {
			authCard() {
				window.location.href = 'https://zjuam.zju.edu.cn/cas/oauth2.0/authorize?client_id=gb0B3oGJyPtjid7RJF&redirect_uri=http://xcjxjd.zju.edu.cn/slianclass-pc-web/login/zju.do&response_type=code&state=reserve'
			},

			loginUserInfo() {
				this.$refs.loginForm.validate(valid => {
					if(valid) {
						this.loading = true
						this.$store.dispatch('LoginUserInfo',this.loginForm).then(res=>{
							if(res){
								this.$router.push({ path: '/'})
							}else {
								this.$message.error('登录信息错误')
							}
							this.loading = false

						})
					}
				})
			}
		},
		mounted() {

		}
	}

	
</script>

<style type="text/scss" scoped lang='scss'>
	$bg:#1890ff;
	.login-container {
		position: fixed;
		height: 100%;
		width: 100%;
		// background: url('../../assets/banner_new.png') ;
		background-color: #001529;
		background-size: auto 100%;
		background-position: center 0;

		.loginHeader {
			margin-top: 45px;
			text-align: center;
			line-height: 200px;
			height: 200px;
			font-size: 40px;
			color: #fff;
			font-family: "KaiTi"," DFKai-SB","STKaiti";

			// overflow: hidden;

			// width: 750px;
			// margin: 45px auto;
			// line-height: 90px;
			// font-family: "KaiTi"," DFKai-SB","STKaiti";

		
		}

		.login-form {
			background-color: #fff;
			border-radius: 4px;
			padding: 20px;
			margin: 20px auto;
			width: 320px;
			div.title-container {
				overflow: hidden;
				padding: 10px 20px 20px;
				div {
					width: 100%;
					height: 36px;
				}
				div.accout {
					float: left;
					line-height: 36px;
					text-align: center;
					border-bottom: 2px solid $bg;
				}
				div.card {
					float: right;
					.el-button {
						background-color: #c01a0c;
						color: #fff;
						// border: none;
						// padding: none;
						// height: 30px;
						// line-height: 30px;
					}
				}
			}

			div.formDiv {
				padding: 0 10px;
				div { display: inline-block; line-height: 40px;}
				div.name {
					width: 20%;
					line-height: 40px;

				}
				div.input {
					width: 80%;
					input: {
						border: none;
						width: 100%;
					}
				}
			}

			div.submit {
				padding-top: 20px;
				text-align: center;
				.el-button {
					background-color: $bg;
				}
			}
		}
		.loginFooter {
			position: fixed;
			width: 100%;
			bottom: 30px;
			text-align: center;
			color: #f2f2f2;
			font-size: 12px;
			line-height: 20px;
		}
		
	}
</style>
