export default class UserModel {
  // 构造函数
  // constructor(userId,account,password,name,typeId,remark,protrait){
  //   this.userId = userId
  //   this.account = account
  //   this.password = password
  //   this.name = name
  //   this.typeId = typeId
  //   this.remark = remark
  //   this.protrait = protrait
  //   this.typeName = typeName
  // }
  constructor(userObject){
    this.userId = userObject.userId
    this.account = userObject.account
    this.password = userObject.password
    this.name = userObject.name
    this.typeId = userObject.typeId
    this.remark = userObject.remark
    this.protrait = userObject.protrait
    this.typeName = userObject.typeName
  }
  
}