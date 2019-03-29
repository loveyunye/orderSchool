<template>
	<div class="dashboard">
		<el-row :gutter="10">
			<el-col :span="12" v-for="(item, index) in showBlock" :key="index">
				<div class="show-block">
					<span>{{item.label}} :</span>
					<span class="light-span">{{item.value}} {{item.unit}}</span>
				</div>
			</el-col>
		</el-row>
		
		<BusinessView v-if="userObject.user_id" style="margin-top:10px"/>
		<div  v-else>
			<BusinessRank :show="userObject.user_id===''"/>
		</div>


		
	</div>
</template>

<script type="text/javascript">
	import ajax from '@/utils/ajax.js'
	import { mapGetters } from 'vuex'
	import BusinessRank from './businessRank'
	import BusinessView from './businessView'

	export default {
		data() {
			return {
				userObject:{},
				isAdmin: false,
				minWidth: '',
				showBlock: [
					{
						value: 2,
						label: '总完成订单量',
						unit: '份'
					},
					{
						value: 2,
						label: '总完成订单收入',
						unit: '元'
					},
				]
			}
		},
		methods: {
			getPriceNum() {
				ajax('/sys/order/getOrderNumByStatus',{
					userId: this.userObject.user_id,
					status: 2
				}).then(res => {
					const [result] = res;
					this.showBlock[0].value = result.num?result.num:0;
					this.showBlock[1].value = result.price?result.price:0;
				})
			}
		},
		computed:{
			...mapGetters([
				'userMess',
				'token'
			])
		},
		mounted() {
			this.userObject = JSON.parse(this.userMess)
			if(this.token === 'admin'){
				this.userObject.user_id = ''
				this.isAdmin = true
			} 
			this.getPriceNum();
			this.minWidth = (document.body.clientHeight - 120 - 80 - 100 ) + 'px'

		},
		components: {
			BusinessRank,BusinessView
		}
	}
	
</script>

<style lang="scss" >
	$color: #c01a0c;
	.dashboard {
		box-sizing: border-box;
		width: 100%;
		padding: 0 10px;
		.show-block {
			background-color: #fff;
			padding: 40px;
			line-height: 40px;
			font-size: 30px;
			color: #555;
			.light-span {
				font-size: 40px;
				color: #333;
				display: block;
				float: right;
			}

			
		}
		#BusinessRank {
			background-color: #fff;
			padding: 20px;
			height: 400px;
			margin-top: 10px;
		}
	}
	
</style>