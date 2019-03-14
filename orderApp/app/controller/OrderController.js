import dataHandler from '../dataHandler/pool'
import OrderSql from '../dao/OrderDao'


const OrderController = (function(){
  function OrderC(){}
  // 获取订单信息
  OrderC.prototype.getOrder = function(req, res){
    dataHandler(OrderSql.getOrderSql(req.query)).then(result => {
      //console.log(OrderSql.getOrderSql(req.query))
      dataHandler(OrderSql.getOrderNum(req.query)).then(num => {
        
        res.send({data:result,total:num[0].num})

      })

    }).catch(error => {})
  }
  // 创建菜单
  OrderC.prototype.createOrder = function(req, res){
    dataHandler(OrderSql.createSql(req.query)).then(result => {
      res.send(result)
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