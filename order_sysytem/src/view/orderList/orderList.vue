<template>
	<div class="orderList">
		<div class="searchBolck">
			<el-row :gutter="20">
				<el-col :span="4">
					<el-select v-model="params.status" clearable placeholder="订单状态">
						<el-option
							v-for="(label,value) in statusObject"
							:key="value"
							:label="label"
							:value="value">
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
			<!-- <div class="handerBolck">
				<el-button  size="mini"  type="success" icon="el-icon-plus"  v-show="params.userId">添加</el-button>
        <el-button type="primary" style="margin-left: 5px;" size="mini"  icon="el-icon-edit" v-show="params.userId">编辑</el-button>
        <el-button  size="mini" style="margin-left: 5px;" type="danger" icon="el-icon-delete" >删除</el-button>
			</div> -->

			<el-table v-loading="listLoading"
				:data="orderArr" 
				stripe
				style="width: 100%"
				>
				<el-table-column label="操作( 请按实际运作进行 )" v-if="params.userId"  align="center">
					<template slot-scope="scope">
						<el-button  size="mini" v-show="scope.row['order_status']===0" @click="setStatus(scope.row,1)" type="primary" icon="el-icon-success">已准备好，开始派送</el-button>
						<el-button  size="mini" v-show="scope.row['order_status']===1" @click="setStatus(scope.row,2)"  type="success" icon="el-icon-success">派送结束，完成订单</el-button>
						<span v-show="scope.row['order_status']===2" @click="setStatus(scope.row,1)">历史订单，无法操作</span>
					</template>
				</el-table-column>
				
				<el-table-column align="center"
					prop="nickName"
					label="客户"
					width="120">
				</el-table-column>
				<el-table-column align="center"
					label="头像"
					width="100">
					<template slot-scope="scope">
						<!-- <span>{{scope.row["avatarUrl"]}}</span> -->
						<el-popover 
              placement="right"
              trigger="hover">
							<!-- {{scope.row['avatarUrl']}} -->
              <img :src="scope.row['avatarUrl']" style="max-height: 300px;max-width: 400px;" />
              <img slot="reference" :src="scope.row['avatarUrl']" alt="暂无" style="max-height: 20px;max-width: 130px;">
      			</el-popover>
					</template>
				</el-table-column>
				<el-table-column align="center"
					width="100"
					prop="phone"
					label="联系方式">
				</el-table-column>
				

				
				<el-table-column label="订单价格"  align="center" width="120">
					<template slot-scope="scope">
						<span>￥{{scope.row["total_price"]}}</span>
					</template>
				</el-table-column>

				<el-table-column label="订单状态"  align="center" width="120">
					<template slot-scope="scope">
						<span>{{statusObject[scope.row["order_status"]]}}</span>
					</template>
				</el-table-column>

				<el-table-column align="center"
					width="180"
					prop="address"
					label="派送地址">
				</el-table-column>

				<el-table-column align="center"
					v-if="!params.userId"
					prop="name"

					label="创建者">
				</el-table-column>
				<el-table-column label="下单时间"  align="center">
					<template slot-scope="scope">
						<span>{{scope.row["create_time"]}}</span>
					</template>
				</el-table-column>
				
				<el-table-column type="expand" label="订单详情" width="120">
				  <template slot-scope="scope">
						<el-row v-for="(item, index) in scope.row.content" :key="index">
							<el-col :span="5" :offset="2">
							 	菜单名：	{{ item.dinner_name }}
							</el-col>
							<el-col :span="5">
							 	价格：	{{ item.dinner_price }}¥
							</el-col>
							<el-col :span="5">
							 	数量：	{{ item.number }}
							</el-col>
							<el-col :span="5">
							 	<el-popover 
									placement="right"
									trigger="hover">
									<img :src="item.dinner_photo" style="max-height: 300px;max-width: 400px;" />
									<img slot="reference" :src="item.dinner_photo" alt="暂无" style="max-height: 20px;max-width: 130px;">
								</el-popover>
							</el-col>
						</el-row>

				  </template>
				 </el-table-column>
			</el-table>

			<div class="page_block">
				<el-pagination
					@current-change = "pageChange"
					background
					:current-page.sync="pageNum"
					layout="total, prev, pager, next"
					:total="orderTotal">
				</el-pagination>
			</div>
		</div>


	</div>
</template>

<script type="text/javascript">
	import ajax from '@/utils/ajax.js'
	import { mapGetters } from 'vuex'
	import { parseTime ,formatDateTime} from '../../utils'


	export default {
		data() {
			return {
				statusObject: {
					0: '商家还未接单',
					1: '美食正在派送',
					2: '订单已经完成'
				},
				// 存储数据
				selectorder:[],
				menuType: [],
				orderArr: [],
				statusArr:[{value:0,status:'一般'},{value:1,status:'推荐'}],
				// 表格数据
				params:{
					status: '',
					length:10,
					start: 0,
					userId: 0
				},
				paramsBak:{
					status: '',
					length:10,
					start: 0,
					userId: 0
				},
				userObject:{},
				orderTotal: 0,
				pageNum: 1,
				listLoading:true
			}
		},
		methods: {
			setStatus(item, statuCode) {
				console.log(item,statuCode);
				ajax('/sys/order/setOrderStatus',{
					orderId: item.order_id,
					statusCode: statuCode
				}).then(res => {
					this.params = Object.assign({},this.params,this.paramsBak);
					this.getList();
				})
			},

			// 表格
			getList(){
				this.listLoading = true
				this.selectorder = []
				ajax('/sys/order/getOrderSystem',this.params,false).then(res => {
					this.orderArr = res.data.map(item => Object.assign({},
						item,{
							create_time: parseTime(item.create_time,'{y}-{m}-{d} {h}:{i}:{s}'),
							content: JSON.parse(item.order_content)
						}
					))
					this.orderTotal = res.total
					this.listLoading = false
					console.log(this.orderArr)

				})
			},
			pageChange(val){
				this.params.start = this.params.length*(val-1)
				this.getList()
			},
			resetList(){
				for(let k in  this.params){
					this.params[k] = this.paramsBak[k]
				}
				this.params.userId = this.userObject.user_id
				this.pageNum = 1
				this.getList()
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
			this.userObject = JSON.parse(this.userMess)
			if(this.token === 'admin'){
				this.userObject.user_id = ''
			} 
			// else {
			// 	this.params.userId = this.userObject.user_id
			// 	this.paramsBak.userId = this.userObject.user_id
			// }
			this.params.userId = this.userObject.user_id
			this.paramsBak.userId = this.userObject.user_id
			
			this.getList()

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