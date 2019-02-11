<template>
  <div>
    <xu-dialog :showDialog='dialogDetail'  @close="closeDetail" class="routeDetail" width="850px">
			<div class="dialog_header">
        <el-row>
          <el-col :span="12">
            课程编号： {{ routerObject.courseSerialNumber}}
          </el-col>
          
          <!-- <el-col :span="18">
            基地： <span  class="base" @click="baseDetail(routerObject.baseId)">{{routerObject.baseName}}</span>
          </el-col> -->
          <el-col :span="12">
            课程评分： 
          </el-col>
          <el-col :span="12">
            课程名称： {{routerObject.courseName}}
          </el-col>
          <el-col :span="12">
            <div class="rate">
                <!-- <el-rate v-model="routerObject.evaluation" show-score disabled score-template=""></el-rate> -->
              
              <el-col :span="14">
                <el-rate v-model="routerObject.evaluation" show-score disabled score-template=""></el-rate>
              </el-col>
              <el-col :span="6">
                {{routerObject.evaluation?routerObject.evaluation+'分':'暂无评分'}} 
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dialog_content">
        <el-row id="routeMess" :gutter="20">
          <el-col :span="12">
            <ul >
              <li><span>关键词：</span>{{routerObject.courseThemeName}}</li>
              <li><span>承建单位：</span>{{routerObject.courseCompany}}</li>
              <li><span>课程管理员：</span>{{routerObject.courseAdminName}} {{routerObject.courseAdminPhone}} {{routerObject.courseAdminEmail}}</li>
              <li><span>包含基地：</span><span  class="base" @click="baseDetail(routerObject.baseId)">{{routerObject.baseName}}</span></li>
              <li><span>基地地址：</span>{{routerObject.baseFullAddress}}</li>
              <!-- <li>
                <span>宣教员：</span><span class="base" v-for="(item,index) in routerObject.teachArr" :key="index"  @click="teachDetail(item.split('&')[1])">{{item.split('&')[0]}}</span>
              </li> -->
              <li>
                <span>课程简介：</span>
                <div class="introduction">
                  {{routerObject.courseIntroduction?routerObject.courseIntroduction:'暂无安排'}}
                </div>
              </li>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul >
              <li><span>开放时间：</span>{{routerObject.courseOpenDate}}</li>
              <li><span>是否需要门票：</span>{{routerObject.courseNeedKey}}</li>
              <li><span>推荐路线及交通：</span>{{routerObject.courseRecommendRoute}}</li>
              <li><span>交通用时：</span>{{routerObject.courseTraffHours}}</li>
              <li><span>参观用时：</span>{{routerObject.courseVisitingHours}}</li>
              <li>
                <span>食宿信息：</span>{{routerObject.courseBoardInfo}}
              </li>
              <li>
                <span>注意事项：</span>
                <div class="introduction">
                  {{routerObject.courseInfo?routerObject.courseInfo:'暂无'}}
                </div>
              </li>
            </ul>
          </el-col>
        </el-row>


        <!-- <div class="block">
          <div class="title">宣教员：</div>
          <div class="word ">
             <span class="teachArr" v-for="(item,index) in routerObject.teachArr" :key="index"  @click="teachDetail(item.split('&')[1])">{{item.split('&')[0]}}</span>
          </div>
        </div>
        <div class="block">
          <div class="title">课程简介</div>
          <div class="word">
            {{routerObject.courseIntroduction?routerObject.courseIntroduction:'暂无安排'}}
          </div>
        </div>
        <div class="block">
          <div class="title">课程评价</div>
          <div class="rate">
            <el-col :span="8">
              <el-rate v-model="routerObject.evaluation" show-score disabled score-template=""></el-rate>
            </el-col>
            <el-col :span="7">
              {{routerObject.evaluation}} 分
            </el-col>
          </div>
        </div> -->
      </div>
		</xu-dialog>

		<BaseDialog :dialogShow="baseDialogShow"  @close="baseDialogShow=false" :baseId="baseId"></BaseDialog>

		<TeachDialog :dialogShow="teachDialogShow"  @close="teachDialogShow=false" :teachId="teachId"></TeachDialog>


  </div>
</template>
<script>
	import XuDialog from './XuDialog.vue'
  import BaseDialog from './BaseDialog.vue'
  import TeachDialog from './TeachDialog.vue'
  

  export default {
    props:['routeDetail','showDetail'],
    data() {
      return {
        dialogDetail:true,
        routerObject:{
          teachArr: []
        },
        // baseDialog_ show
        baseDialogShow: false,
        baseId:0,

        // teachDialog_show
        teachDialogShow: false,
        teachId:0,
      }
    },
    methods: {
      teachDetail(id){
        this.teachDialogShow = true
        this.teachId = +id

      },
      closeDetail() {
        this.$emit('close')
      },
      baseDetail(id) {
        this.baseId = id
        this.baseDialogShow = true
      }
    },
    watch: {
      routeDetail(val) {
        this.routerObject = val
      },
      showDetail(val) {
        this.dialogDetail = val
      }
    },
    mounted() {
      this.routerObject = JSON.parse(JSON.stringify(this.routeDetail))
      this.dialogDetail = this.showDetail?true:false
    },
    components:{
      XuDialog,BaseDialog,TeachDialog
    }
  }
</script>

<style lang="scss">
	$bannerColor: #c01a0c;

  .routeDetail {
    .dialog_header {
      background-color: $bannerColor;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding: 20px 50px;
      color: #fff;
      line-height: 24px;
      font-size: 16px;
      .base {
        text-decoration: underline;
        cursor: pointer;
        margin-right: 10px;
      }
      
    }
    .dialog_content {
      #routeMess li {
        list-style: disc;
        line-height: 30px;
        & span:nth-child(1){
          font-weight: bold;
        }
        & .base {
          text-decoration: underline;
          cursor: pointer;
          margin-right: 10px;
        }
        & .introduction {
          text-indent: 28px;
          line-height: 20px;
        }
      }
    }

    .dialog_content {
      padding: 20px 50px 50px;
      div.block {
        padding: 10px 0 10px;
        .title {
          color: #333;
          font-size: 16px;
          padding-bottom: 10px;
        }
        .teachArr {
          text-decoration: underline;
          cursor: pointer;
          margin-right: 10px;
        }
        .word {
          color: #555;
        }
        .rate {
          font-size: 20px;
          line-height: 30px;
          color: #aaa;
          .el-rate__icon {
            font-size: 30px;
          }
        }
      }
    }
  }
    
</style>

