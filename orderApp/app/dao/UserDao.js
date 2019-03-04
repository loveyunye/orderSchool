const UserSql = {
  getUserSql:function(password,accout){
    return `SELECT su.*, ct.type_name FROM SchoolOrder.sys_user su
    LEFT JOIN
    SchoolOrder.customer_type ct ON su.type_id = ct.type_id
    WHERE
    su.password = '${password}'
    AND su.accout = '${accout}'`
  },
  updateSql:function(obj){
    return `UPDATE SchoolOrder.sys_user 
    SET accout = '${obj.accout}', password = '${obj.password}', address = '${obj.address}', portrait = '${obj.portrait}', 
    phone = '${obj.phone}',
    name = '${obj.name}', remark = '${obj.remark}' WHERE (user_id = '${obj.user_id}');
    `
  },

  deleteSql:function(userIds){
    return `delete from SchoolOrder.sys_user where user_id in (${userIds})`
  },

  createUser: function(userStr){
    return `INSERT INTO SchoolOrder.sys_user (accout, password, name, type_id, remark, portrait, address, phone)
    VALUES ('${userStr.accout}', '${userStr.password}', '${userStr.name}', '${userStr.type_id}', '${userStr.remark}', '${userStr.portrait}','${userStr.address}','${userStr.phone}')`;
  },
  getCustomerType: function(){
    return `SELECT * FROM SchoolOrder.customer_type;`
  },
  getUserList: function(queryObject){
    return `SELECT * FROM SchoolOrder.sys_user 
    WHERE
    type_id=2
    AND locate('${queryObject.name}',name)>0 limit ${queryObject.start},${queryObject.length}`
  },
  getUserNum: function(queryObject){
    return `SELECT count(*) as num FROM SchoolOrder.sys_user 
    WHERE
    type_id=2
    AND locate('${queryObject.name}',name)>0`
  }
}
export default UserSql