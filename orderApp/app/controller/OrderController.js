import dataHandler from '../dataHandler/pool'
import OrderSql from '../dao/OrderDao'


const OrderController = (function(){
  function OrderC(){}
  //客户  获取订单信息 移动端
  OrderC.prototype.getOrderMobile = function(req, res){
    dataHandler(OrderSql.getOrderMobile(req.query)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 创建订单
  OrderC.prototype.createOrder = function(req, res){
    dataHandler(OrderSql.createSql(req.body)).then(result => {
      res.send(result)
    }).catch(error => {})
  }

  //客户  获取订单信息 后台管理系统
  OrderC.prototype.getOrderSystem = function(req, res){
    dataHandler(OrderSql.getOrderSystem(req.query)).then(result => {
      dataHandler(OrderSql.getOrderNumber(req.query)).then(num => {
        
        res.send({data:result,total:num[0].num})

      })
    }).catch(error => {})
  }


  OrderC.prototype.updateOrder = function(req, res){
    dataHandler(OrderSql.updateSql(req.query)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  
  OrderC.prototype.deleteOrder = function(req, res){
    dataHandler(OrderSql.deleteSql(req.query.OrderId)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 
  OrderC.prototype.getOrderType = function(req, res){
    dataHandler(OrderSql.typeSql()).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  
  return OrderC
})()

export default OrderController