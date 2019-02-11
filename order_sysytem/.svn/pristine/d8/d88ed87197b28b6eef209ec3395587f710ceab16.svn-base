<template>
  <div>
    <xu-dialog :showDialog='dialogOrder'  @close="closeDetail" class="route_order" marginTop="40px">
			<div class="dialog_header">
        预约详情
      </div>
      <div class="dialog_content reservaDetail">
        <table style="width:100%"   cellpadding="0" cellspacing="0">
          <tr><td colspan="2"><span>课程信息</span></td></tr>
          <tr>
            <td style="width:50%">预约课程名称: {{allDetail.route.courseName}}</td>
            <td>包含基地: {{allDetail.route.baseName}}</td>
          </tr>
          <tr><td colspan="2"><span>预约者信息</span></td></tr>
          
          <tr>
            <td>预约人: {{allDetail.reserve.reserveName}}</td>
            <td>预约人工号/学号: {{allDetail.reserve.reserveCode}}</td>
            
          </tr>
          <tr>
            <td>所在单位: 
              {{allDetail.reserve.reserveOrganizationStructureName}}
            </td>
            <td>所在党支部: 
              {{allDetail.reserve.reserveCommunity}}
            </td>
          </tr>
          <tr>
            <td>联系电话: 
              {{allDetail.reserve.reservePhone}}
            </td>
            <td>电子邮箱: {{allDetail.reserve.reserveEmail}}</td>
          </tr>
          <tr><td colspan="2"><span>宣教员信息</span></td></tr>
          <tr>
            <td>宣教员: 
              {{allDetail.reservaRoute.reservaRouteTeacherName}} 
            </td>
            <td>联系方式: 
              {{allDetail.reservaRoute.reservaRouteTeacherPhone}}
            </td>
          </tr>
          <tr>
            <td>电子邮箱:
              {{allDetail.reservaRoute.reservaRouteTeacherEmail}}
            </td>
            <td ></td>
          </tr>


          <tr><td colspan="2"><span>预约信息</span></td></tr>

          <tr>
            <td>预约时间: 
              {{allDetail.reservaRoute.reservaRouteDate}} / &nbsp;{{allDetail.reservaRoute.reservaRouteTimeSlot}}
            </td>
            <td>预约单位: 
              {{allDetail.reservaRoute.reservaRouteCollege}}
            </td>
          </tr>
          <tr>
            <td>出发校区:
              {{allDetail.reservaRoute.reservaRoutePlace}}
            </td>
            <td >出发地址：{{allDetail.reservaRoute.reservaRouteAddress}}</td>
          </tr>
          <tr>
            <td>预约党支部: 
              {{allDetail.reservaRoute.reservaRouteCommunity}}
            </td>
            <td>参加人数: {{allDetail.reservaRoute.reservaRouteScale}}</td>
          </tr>
          <tr>
            <td>联系人: {{allDetail.reservaRoute.reservaRouteName}}</td>
            <td>联系人工号/学号: {{allDetail.reservaRoute.reservaRouteCode}}</td>
          </tr>
          <tr>
            <td>联系人电话: {{allDetail.reservaRoute.reservaRoutePhone}}</td>
            <td>电子邮箱: {{allDetail.reservaRoute.reservaRouteMail}}</td>
          </tr>

          <tr>
            <td colspan="2">
              
              <div>备注: </div>
              {{allDetail.reservaRoute.reservaComments}}
            </td>
          </tr>
        </table>
      </div>


		</xu-dialog>
  </div>
</template>
<script>
  import XuDialog from './XuDialog.vue'
  import ajax from '@/utils/ajax'

  export default {
    props:['dialogShow','reservaId'],
    data() {
      return {
        allDetail:{
          route:{},
          reservaRoute:{},
          reserve: {}
        },
        dialogOrder:false
      }
    },
    methods: {
      closeDetail() {
        this.$emit('close')
      }
    },
    watch: {
      dialogShow(val) {
        this.dialogOrder = val
      },
      reservaId(val) {
        if(val) {
          ajax('/portal/reserve/getReservaRouteDetailed.do',{
            id: val
          },'.reservaDetail').then(res => {
            this.allDetail = res.data
          })
        }
      }
    },
    mounted() {
      this.dialogOrder = this.dialogShow?true:false
    },
    components:{
      XuDialog
    }
  }
</script>

<style lang="scss">
  .route_order {
    $bannerColor:#c01a0c;
    .dialog_header {
      background-color: $bannerColor;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      // padding: 20px 50px;
      color: #fff;
      line-height: 80px;
      text-align: center;
      font-size: 22px;

    }
    .dialog_content {
      padding-bottom: 50px;
      table {

        td {
          span {
            font-weight: bold;
            color: $bannerColor;
          }
          width: 50%;
          padding: 6px;
          border-bottom: 0.05px #ccc solid;
          div {
            float: left;
          }
        }
        td + td {
          border-left: 0.05px #ccc solid;
        }

      }
    }

    
  }
    
</style>

