<template>
	<div class="menuList">
		<div class="searchBolck">
			<el-row :gutter="20">
				<el-col :span="4">
					<el-input v-model="params.dinnerName" clearable placeholder="菜品名" ></el-input>
				</el-col>
				<el-col :span="4">
					<el-select v-model="params.dinnerType" clearable placeholder="菜品类型">
						<el-option
							v-for="(item,index) in menuType"
							:key="index"
							:label="item.type_name"
							:value="item.dinnerType_id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
					<el-button icon="el-icon-refresh" @click="resetList">重置</el-button>
				</el-col>
			</el-row>
		</div>


		<div class="tableBolck">
			<div class="handerBolck">
				<el-button  size="mini"  type="success" icon="el-icon-plus" @click="resetRow(false)" v-show="params.userId">添加</el-button>
        <el-button type="primary" style="margin-left: 5px;" size="mini" @click="handleEdit" icon="el-icon-edit" v-show="params.userId">编辑</el-button>
        <el-button  size="mini" style="margin-left: 5px;" type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
			</div>

			<el-table v-loading="listLoading"
				:data="dinnerArr" 
				stripe
				style="width: 100%"
				@selection-change="selectRow"
				>
				<el-table-column align="center"
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column align="center"
					prop="dinner_name"
					label="菜单名"
					width="120">
				</el-table-column>
				<el-table-column align="center"
					label="照片"
					width="180">
					<template slot-scope="scope">
						<!-- <span>{{scope.row["img"]}}</span> -->
						<el-popover v-for="(item,index) in scope.row['img']" :key="index"
              placement="right"
              trigger="hover">
              <img :src="item.url" style="max-height: 300px;max-width: 400px;" />
              <img slot="reference" :src="item.url" alt="暂无" style="max-height: 20px;max-width: 130px;">
      			</el-popover>
					</template>
				</el-table-column>
				<el-table-column align="center"
					width="60"
					prop="type_name"
					label="类型">
				</el-table-column>

				<el-table-column align="center"
					prop="dinner_price"
					width="80"
					label="价格(元)">
				</el-table-column>

				<el-table-column label="状态"  align="center" width="100">
					<template slot-scope="scope">
						<span>{{scope.row["status"]?'推荐':'一般'}}</span>
					</template>
				</el-table-column>

				<el-table-column align="center"
					v-if="!params.userId"
					prop="name"

					label="创建者">
				</el-table-column>

				

				<el-table-column label="创建时间"  align="center" width="150">
					<template slot-scope="scope">
						<span>{{scope.row["create_time"]}}</span>
					</template>
				</el-table-column>

				
				<el-table-column
					prop="update_time" align="center"
					label="修改时间" width="150">
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
					:total="dinnerTotal">
				</el-pagination>
			</div>
			

			

		</div>



		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"    class="dialogFrom">
      <el-form :rules="rules"  ref="temp"  :model="temp" label-position="left" label-width="100px" style='width: 90%; margin-left:20px;'>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称"  prop="dinnerName">
              <el-input v-model="temp.dinnerName" style="width:90%;" placeholder="菜品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单价格" prop="dinnerPrice">
              <!-- <el-input v-model="temp.dinnerPrice" style="width:90%;"></el-input> -->

							<el-input-number v-model="temp.dinnerPrice"  :min="1"  style="width:90%;" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="菜品类型" prop="dinnerType">
              <el-select v-model="temp.dinnerType" clearable placeholder="菜品类型" style="width:90%">
								<el-option
									v-for="(item,index) in menuType"
									:key="index"
									:label="item.type_name"
									:value="item.dinnerType_id">
								</el-option>
							</el-select>
            </el-form-item>
          </el-col>

					<el-col :span="12">
            <el-form-item label="推荐状态" prop="status">
              <el-select v-model="temp.status" clearable placeholder="推荐状态" style="width:90%">
								<el-option
									v-for="(item,index) in statusArr"
									:key="index"
									:label="item.status"
									:value="item.value">
								</el-option>
							</el-select>
            </el-form-item>
          </el-col>
          
          <el-col :span="24">
            <el-form-item label="备注信息" prop="remark">
              <el-input type="textarea" v-model="temp.remark" style="width:96%;"></el-input>
            </el-form-item>
          </el-col>

					<el-col :span="24">
            <el-form-item label="菜品图片">
							<el-upload
								style="width:96%;"
								:limit = "1"
								name="_file"
								class="upload-demo"
								action="/sys/upload/img"
								:before-upload="beforeAvatarUpload"
								:on-success="successUpload"
								list-type="picture"
								:file-list="fileList">
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，不超过500kb且为1张</div>
							</el-upload>

            </el-form-item>
          </el-col>


          
          
        </el-row>
        
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button  type="primary" @click="handlerRow">确定</el-button>
        <!-- <el-button v-else type="primary" @click="updateRow">确定</el-button> -->
      </div>
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
				fileList: [],
				fileListBak: [],
				// 表单数据
				rules:{
					dinnerName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        	dinnerPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
        	dinnerType: [{  required: true, message: '不能为空', trigger: 'change' }],
        	remark: [{  required: true, message: '不能为空', trigger: 'change' }],
        	status: [{  required: true, message: '不能为空', trigger: 'change' }],
				},
				dialogFormVisible:false,
				temp:{
					userId:'',
					dinnerName: '',
					dinnerPhoto: '',
					dinnerPrice: '',
					createTime: '',
					dinnerType:'',
					remark: '',
					status:'',
					updateTime:'',
				},
				dialogStatus:'insert',
				textMap:{
					insert: '新增',
					update: '修改'
				},
				// 存储数据
				selectDinner:[],
				menuType: [],
				dinnerArr: [],
				statusArr:[{value:0,status:'一般'},{value:1,status:'推荐'}],
				// 表格数据
				params:{
					dinnerName: '',
					dinnerType: '',
					length:10,
					start: 0,
					userId: 0
				},
				paramsBar:{
					dinnerName: '',
					dinnerType: '',
					length:10,
					start: 0,
					userId: 0
				},
				userObject:{},
				dinnerTotal: 0,
				pageNum: 1,
				listLoading:true
			}
		},
		methods: {
			successUpload(response, file, fileList){
				this.fileListBak = fileList.map(item => item)
			},
      beforeAvatarUpload(file) {
        const isIMG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isIMG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isIMG && isLt2M;
      },
			// 表单操作
			handlerRow(){
				this.$refs.temp.validate(valid => {
					let urlRequest = this.dialogStatus === 'insert'?'createDinner':'updateDinner'
					this.temp.createTime = formatDateTime()
					this.temp.updateTime = formatDateTime()

					this.temp.dinnerPhoto = JSON.stringify(
					 this.fileListBak.map(item => {
						let url = item.response?item.response.fileUrl:item.url
							return {
								name: item.name,
								url: url
							}
						})
					)
					if (valid) {
						ajax('/dinner/'+urlRequest,this.temp,'.el-dialog__body').then(res => {
							this.$message.success(`${this.textMap[this.dialogStatus]}成功`)
							this.dialogFormVisible = false
							this.resetList()
						})
					} else {
						this.$message('请按照提示写入')
					}
				})
			},
			// 表格
			getList(){
				this.listLoading = true
				this.selectDinner = []
				ajax('/dinner/getDinner',this.params,false).then(res => {
					this.dinnerArr = res.data.map(item => {
						return Object.assign({},item,
							{
								create_time:parseTime(item.create_time,'{y}-{m}-{d} {h}:{i}:{s}'),
								update_time:item.update_time?parseTime(item.update_time,'{y}-{m}-{d} {h}:{i}:{s}'):'',
								img: JSON.parse(item.dinner_photo) 
							}
						)
					})
					this.dinnerTotal = res.total
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
				this.params.userId = this.userObject.user_id
				this.pageNum = 1
				this.getList()
			},
			selectRow(selection){
				this.selectDinner = selection
			},

			
			// 编辑
			handleEdit() {
				if (this.selectDinner.length !== 1){
					this.$message.error('仅选择一条记录编辑')
				} else {
					this.resetRow(this.selectDinner[0])
				}
			},
			resetRow(row){
				if(!row){
					this.dialogStatus = 'insert'
					for(let key in this.temp){
						this.temp[key] = ''
					}
					this.fileListBak = []
					this.fileList = []
				} else {
					this.dialogStatus = 'update'
					this.temp.dinnerName = row.dinner_name;
					this.temp.dinnerType = row.dinner_type;
					this.temp.status = row.status;
					this.temp.remark = row.remark;
					this.temp.dinnerId = row.dinner_id;
					this.fileList = JSON.parse(row.dinner_photo)
					this.fileListBak = this.fileList.map(item=>item)
				}
				this.temp.userId = this.userObject.user_id
				this.dialogFormVisible = true
			},
			// 删除
			handleDelete() {
				if (this.selectDinner.length === 0){
					this.$message.error('至少选择一条记录')
				} else {
					this.$confirm('此操作将永久删除这 '+this.selectDinner.length+' 条记录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						ajax('/dinner/deleteDinner',{
							dinnerId: this.selectDinner.map(item => item.dinner_id).join(',')
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
			ajax('/dinner/dinnerType',{},false).then(res => {
				this.menuType = res
			})
			this.userObject = JSON.parse(this.userMess)
			if(this.token === 'admin'){
				this.userObject.user_id = ''
			}
			this.params.userId = this.userObject.user_id
		}
	}
	
</script>

<style lang="scss" >
	$color: #c01a0c;
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
</style>