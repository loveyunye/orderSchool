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
  // 获取客户信息 BYID
  UserC.prototype.getUserById = function(req, res){
    dataHandler(UserSql.getUserById(req.query.user_id)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  // 修改信息
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
  // 获取客户列表
  UserC.prototype.getUserList = function(req,res){
    dataHandler(UserSql.getUserList(req.query)).then(result => {
      dataHandler(UserSql.getUserNum(req.query)).then(num => {
        res.send({data:result,total:num[0].num})
      })
    }).catch(error => {})
  }

  // 删除客户 
  UserC.prototype.deleteUser = function(req,res){
    dataHandler(UserSql.deleteSql(req.query.userIds)).then(result => {
      res.send(result)
    }).catch(error => {})
  }
  return UserC
})()

export default UserController