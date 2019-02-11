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
				<el-button  size="mini"  type="success" icon="el-icon-plus" @click="handleInsert" v-show="params.userId">添加</el-button>
        <el-button type="primary" style="margin-left: 5px;" size="mini" icon="el-icon-edit" v-show="params.userId">编辑</el-button>
        <el-button  size="mini" style="margin-left: 5px;" type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
			</div>

			<el-table v-loading="listLoading"
				:data="dinnerArr"
				stripe
				style="min-height:400px;width: 100%"
				@selection-change="selectRow"
				>
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="dinner_name"
					label="菜单名"
					width="120">
				</el-table-column>
				<el-table-column
					prop="dinner_photo"
					label="照片"
					width="180">
				</el-table-column>
				<el-table-column
					prop="type_name"
					label="类型">
				</el-table-column>
				<el-table-column
					v-if="!params.userId"
					prop="name"
					label="创建者">
				</el-table-column>

				<el-table-column label="创建时间"  align="center">
					<template slot-scope="scope">
						<span>{{scope.row["create_time"]}}</span>
					</template>
				</el-table-column>

				
				<el-table-column
					prop="update_time"
					label="修改时间">
				</el-table-column>

				<el-table-column
					prop="remark"
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



		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"    >
      <el-form :rules="rules"  ref="temp"  :model="temp" label-position="left" label-width="110px" style='width: 90%; margin-left:20px;'>
        <el-row>
          

          <el-col :span="12">
            <el-form-item label="菜单名称"  prop="videoUrl">
              <el-input v-model="temp.dinnerName" style="width:90%;" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单价格" prop="videoDuration">
              <!-- <el-input v-model="temp.dinnerPrice" style="width:90%;"></el-input> -->

							<el-input-number v-model="temp.dinnerPrice"  :min="1"  style="width:90%;" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="菜品类型" prop="videoTypeId">
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
            <el-form-item label="推荐状态" prop="videoTypeId">
              <el-select v-model="temp.status" clearable placeholder="菜品类型" style="width:90%">
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
            <el-form-item label="视频名称" prop="videoName">
              <el-input v-model="temp.remark" style="width:90%;"></el-input>
            </el-form-item>
          </el-col>


          
          
        </el-row>
        
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='insert'" type="primary" @click="insertRow">确定</el-button>
        <el-button v-else type="primary" @click="updateRow">确定</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script type="text/javascript">
	import ajax from '@/utils/ajax.js'
	import { mapGetters } from 'vuex'
	import { parseTime ,formatDateTime} from '../../utils'
import { parse } from 'semver';

	export default {
		data() {
			return {
				// 表单数据
				rules:{},
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
				statusArr:[],
				// 表格数据
				// tableColun:[
				// 	{
				// 		label:'菜单名',
				// 		value: 'dinner_name',
				// 		width: '120',
				// 	},
				// 	{
				// 		label:'菜单名',
				// 		value: 'dinner_name',
				// 		width: '120',
				// 	},
				// 	{
				// 		label:'菜单名',
				// 		value: 'dinner_name',
				// 		width: '120',
				// 	},
				// 	{
				// 		label:'菜单名',
				// 		value: 'dinner_name',
				// 		width: '120',
				// 	}
				// ],

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
			// 表单操作
			insertRow(){

			},
			updateRow(){

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

			// 增加
			handleInsert() {
				this.dialogFormVisible = true
			},
			// 编辑
			handleEdit() {

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