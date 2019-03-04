const CustomerSql = {
  getUserSql:function(password,phone){
    return `SELECT * FROM SchoolOrder.mobile_customer
    WHERE
    password = '${password}'
    AND phone = '${phone}'`
  },
  updateSql:function(obj){
    return `UPDATE SchoolOrder.mobile_customer 
    SET name = '${obj.nickName}', phone = '${obj.phone}', 
    password = '${obj.password}', avataUrl = '${obj.avataUrl}',address = '${obj.address}',remark = '${obj.remark}'
    WHERE (mobile_userId = '${obj.customerId}');
    `
  },
  createUser: function(userStr){
    return `INSERT INTO SchoolOrder.mobile_customer (nickName,phone,password, avatarUrl, address, gender, remark)
    VALUES ('${userStr.nickName}', '${userStr.phone}', '${userStr.password}', '${userStr.avatarUrl}', '${userStr.address}',
    '${userStr.gender}',
    '${userStr.remark}')`;
  },
  queryByphone: function(phone){
    return `SELECT * FROM SchoolOrder.mobile_customer
    WHERE
    phone = '${phone}'`
  }
}
export default CustomerSql