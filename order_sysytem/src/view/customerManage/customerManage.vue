<template>
	<div class="dashboard">
		客户管理

	</div>
</template>

<script type="text/javascript">
	import ajax from '@/utils/ajax.js'
	import { distinct } from '@/utils'
	import RouteDetail from '@/components/RouteDetail'
	import RouteInstructions from '@/components/RouteInstructions'
	import RouteOrder from '@/components/RouteOrder'
  import BaseDialog from '@/components/BaseDialog'


	export default {
		data() {
			return {
				introduction: '',
				newsList: [],
				noticeList: [],
				routeList: [],
				newsImgs: [],
				cnameArr: ['课程编号','课程名称','关键词','包含基地','所属区域'],
				itemArr: ['courseSerialNumber','courseName','courseThemeName','baseName','coursePlaceName'],
				itemWidth: ['120','300','300','280','200'],

				// dialog_route_detail
				routeDetail: {teachArr:[]},
				dialogDetail: false,

				// dialog_route_instructions
				dialogInstruction: false,
				// dialog_route_order
				dialogOrder: {},
				dialogOrderShow:false,


				// 增加基地
				baseDialogShow: false,
        baseId:0,

			}
		},
		methods: {
		},
		components:{
			RouteDetail,RouteInstructions,RouteOrder,BaseDialog
		}
	}
	
</script>

<style lang="scss" >
	$color: #c01a0c;

</style>