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
    SET accout = '${obj.accout}', password = '${obj.password}', 
    name = '${obj.name}', remark = '${obj.remark}' WHERE (user_id = '${obj.userId}');
    `
  },
  createUser: function(userStr){
    return `INSERT INTO SchoolOrder.sys_user (accout, password, name, type_id, remark, portrait)
    VALUES ('${userStr.accout}', '${userStr.password}', '${userStr.name}', '${userStr.typeId}', '${userStr.remark}', '${userStr.portrait}')`;
  },
  getCustomerType: function(){
    return `SELECT * FROM SchoolOrder.customer_type;`
  }
}
export default UserSql