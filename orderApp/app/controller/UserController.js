import dataHandler from '../dataHandler/pool'
import UserSql from '../dao/UserDao'
import UserModel from '../model/UserModel'

let usermodel = new UserModel({})

const UserController = (function(){
  function UserC(){}
  // 获取客户信息
  UserC.prototype.getUser = function(req, res){
    dataHandler(UserSql.getUserSql(req.query.password,req.query.accout)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 修改密码
  UserC.prototype.updateUser = function(req, res){
    dataHandler(UserSql.updateSql(Object.assign({},usermodel,req.query))).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 创建用户
  UserC.prototype.createUser = function(req, res){
    dataHandler(UserSql.createUser(req.query)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 获取客户类型
  UserC.prototype.userTypes = function(req, res){
    dataHandler(UserSql.getCustomerType()).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  return UserC
})()

export default UserController