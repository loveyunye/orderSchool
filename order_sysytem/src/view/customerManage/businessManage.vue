<template>
	<div class="businessManage">
    <div class="searchBolck">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="params.name" clearable placeholder="商家名称" ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetList">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="tableBolck">
      <div class="handerBolck">
        <el-button  size="mini"  type="success" icon="el-icon-plus" @click="resetRow(false)">添加</el-button>
        <el-button  size="mini" style="margin-left: 5px;" type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      </div>

      <el-table v-loading="listLoading"
        :data="userList" 
        stripe
        style="width: 100%"
        @selection-change="selectRow"
        >
        <el-table-column align="center"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center"
          prop="name"
          label="商家名"
          width="100">
        </el-table-column>
        <el-table-column align="center"
          label="头像"
          width="100">
          <template slot-scope="scope">
            <el-popover 
              placement="right"
              trigger="hover">
              <img :src="scope.row.portrait" style="max-height: 300px;max-width: 400px;" />
              <img slot="reference" :src="scope.row.portrait" alt="暂无" style="max-height: 20px;max-width: 130px;">
            </el-popover>
          </template>
        </el-table-column>

       

        <el-table-column
          prop="phone" align="center"
          label="联系方式" width="100">
        </el-table-column>

        <el-table-column
          prop="accout" align="center"
          label="账号" width="100">
        </el-table-column>

        <el-table-column align="center"
          label="密码"
          width="100">
          <template slot-scope="scope">
            ******
          </template>
        </el-table-column>

         <el-table-column
          prop="address" align="center"
          label="地址" width="200">
        </el-table-column>
        
       

        <el-table-column
          prop="remark" align="center"
          label="备注">
        </el-table-column>

      </el-table>

      <div class="page_block">
        <el-pagination
          @current-change = "pageChange"
          background
          :current-page.sync="pageNum"
          layout="total, prev, pager, next"
          :total="userTotal">
        </el-pagination>
      </div>
      

      

    </div>


		



		<el-dialog title="新增" :visible.sync="dialogFormVisible"    class="dialogFrom">
      <el-form  ref="userObject" class="messForm"  :model="userObject" label-position="left" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="8" :offset="1">
            <el-upload
              
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
          <el-col :span="12">
            <el-form-item label="用户名称:"  prop="name">
              <el-input v-model="userObject.name"  style="width:90%;" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="商铺地址:"  prop="address">
              <el-input v-model="userObject.address"  style="width:90%;" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="头像地址:"  prop="portrait">
              <el-input v-model="userObject.portrait"  style="width:90%;" disabled  placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="账号名称:"  prop="accout">
              <el-input v-model="userObject.accout"  style="width:90%;" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="账号密码:"  prop="password">
              <el-input v-model="userObject.password"  disabled  style="width:90%;" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="联系方式:"  prop="phone">
              <el-input v-model="userObject.phone"   style="width:90%;" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="备注信息:"  prop="remark">
              <el-input v-model="userObject.remark"  type="textarea" style="width:90%;" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="block">

        </div>
        <el-row>
          <el-col :span="12" :offset="8" style="text-align:center">
            <el-button type="primary" style="margin-left: 5px;" v-if="uneditStatus" @click="handlerRow" icon="el-icon-plus"  >确定</el-button>
           
            <el-button     icon="el-icon-error"  @click="dialogFormVisible =!dialogFormVisible">取消</el-button>
          </el-col>
        </el-row>	
        
      </el-form>

      
    </el-dialog>
	</div>
</template>

<script type="text/javascript">
	import ajax from '@/utils/ajax.js'
	import { mapGetters } from 'vuex'
	import { parseTime ,formatDateTime} from '../../utils'


	export default {
		data() {
			return {
        // 表单数据
				
				dialogFormVisible:false,

        userObject:{
					user_id: '',
          address:'',
          name: '',
          portrait: '',
          accout: '',
          password: '',
          type_id:2,
          phone:''
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


				
				// 存储数据
				selectUser:[],
				userList: [],
				// 表格数据
				params:{
          name: '',
					length:10,
					start: 0
				},
				paramsBar:{
					name: '',
					length:10,
					start: 0
				},
				userTotal: 0,
				pageNum: 1,
				listLoading:true
			}
		},
		methods: {

      handleAvatarSuccess(res, file) {
				this.userObject.portrait = res.fileUrl
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
			},
			// 表单操作
			handlerRow(){
				this.$refs.userObject.validate(valid => {
          if (valid) {
						ajax('/sys/user/createUser',this.userObject,'.messForm').then(res => {
              this.$message.success(`新增成功`)
              this.dialogFormVisible = false
							this.getList()
						})
					} else {
						this.$message('请按照提示写入')
					}
				})
			},
			// 表格
			getList(){
				this.listLoading = true
				this.selectUser = []
				ajax('/sys/user/getUserList',this.params,false).then(res => {
					this.userList = res.data.map(item => {
						return item
					})
					this.userTotal = res.total
					this.listLoading = false

				})
			},
			pageChange(val){
				this.params.start = this.params.length*(val-1)
				this.getList()
			},
			resetList(){
				for(let k in  this.params){
					this.params[k] = this.paramsBar[k]
				}
				this.pageNum = 1
				this.getList()
			},
			selectRow(selection){
				this.selectUser = selection
			},
			resetRow(row){
				if(!row){
					for(let key in this.userObject){
						this.userObject[key] = ''
          }
          this.userObject.type_id = 2
          this.userObject.password = 123456
          this.imageUrl = '';

				} 
				this.dialogFormVisible = true
			},
			// 删除
			handleDelete() {
				if (this.selectUser.length === 0){
					this.$message.error('至少选择一条记录')
				} else {
					this.$confirm('此操作将永久删除这 '+this.selectUser.length+' 条记录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
            this.$confirm('用户将永远消除?', '第二次提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              ajax('/user/deleteUser',{
                userIds: this.selectUser.map(item => item.user_id).join(',')
              },false).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.resetList()
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });

						
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
					});
				}
			}
		},
		components:{
			
		},
		computed:{
			...mapGetters([
				'userMess',
				'token'
			])
		},
		mounted(){
			this.getList()

		}
	}
	
</script>

<style lang="scss" >
	$color: #c01a0c;
	.businessManage {
	
		.searchBolck {
			background-color: #fff;
			padding: 20px;
			margin-bottom: 10px;
		}
		.tableBolck {
			background-color: #fff;
			padding: 20px;
		}
		.handerBolck {
			padding: 0 10px 10px;
		}
		.page_block {
			display: flex;
			justify-items: center;
			.el-pagination {
				margin: 20px auto 0;
			}
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