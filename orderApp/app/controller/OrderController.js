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

  //设置订单状态
  OrderC.prototype.setOrderStatus = function(req, res){
    dataHandler(OrderSql.setOrderStatus(req.query)).then(result => {
      res.send(result);
    }).catch(error => {})
  }

  // 获取总订单
  OrderC.prototype.getOrderNumByStatus = function(req, res){
    dataHandler(OrderSql.getOrderNumByStatus(req.query)).then(result => {
      res.send(result);
    }).catch(error => {})
  }
  
  // 商家排行
  OrderC.prototype.businessRank = function(req, res){
    dataHandler(OrderSql.businessRank()).then(result => {
      res.send(result);
    }).catch(error => {})
  }
  return OrderC
})()

export default OrderController