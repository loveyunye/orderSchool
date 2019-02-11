import dataHandler from '../dataHandler/pool'
import DinnerSql from '../dao/DinnerDao'


const DinnerController = (function(){
  function DinnerC(){}
  // 获取菜单
  DinnerC.prototype.getDinner = function(req, res){
    dataHandler(DinnerSql.getDinnerSql(req.query)).then(result => {
      //console.log(DinnerSql.getDinnerSql(req.query))
      dataHandler(DinnerSql.getDinnerNum(req.query)).then(num => {
        
        res.send({data:result,total:num[0].num})

      })

    }).catch(error => {})
  }
  // 创建菜单
  DinnerC.prototype.createDinner = function(req, res){
    dataHandler(DinnerSql.createSql(req.query)).then(result => {
      res.send(result)
    }).catch(error => {})
  }

  DinnerC.prototype.updateDinner = function(req, res){
    dataHandler(DinnerSql.updateSql(req.query)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  
  DinnerC.prototype.deleteDinner = function(req, res){
    dataHandler(DinnerSql.deleteSql(req.query.dinnerId)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 
  DinnerC.prototype.getDinnerType = function(req, res){
    dataHandler(DinnerSql.typeSql()).then(result => {
      res.send(result)
    }).catch(error => {})
  }

  return DinnerC
})()

export default DinnerController