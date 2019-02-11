import dataHandler from '../dataHandler/pool'
import CustomerSql from '../dao/CustomerDao'

const CustomerController = (function(){
  function CustomerC(){}
  // 用户登录
  CustomerC.prototype.getUser = function(req, res){
    dataHandler(CustomerSql.getUserSql(req.query.password,req.query.phone)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 创建客户
  CustomerC.prototype.createCustomer = function(req,res){
    dataHandler(CustomerSql.createUser(req.query)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 修改信息
  CustomerC.prototype.updateCustomer = function(req,res){
    dataHandler(CustomerSql.updateSql(req.query)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  return CustomerC
})()

export default CustomerController