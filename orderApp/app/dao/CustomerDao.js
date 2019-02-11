const CustomerSql = {
  getUserSql:function(password,phone){
    return `SELECT * FROM SchoolOrder.mobile_customer
    WHERE
    password = '${password}'
    AND phone = '${phone}'`
  },
  updateSql:function(obj){
    return `UPDATE SchoolOrder.mobile_customer 
    SET name = '${obj.name}', phone = '${obj.phone}', 
    password = '${obj.password}', avataUrl = '${obj.avataUrl}',address = '${obj.address}',remark = '${obj.remark}'
    WHERE (mobile_userId = '${obj.customerId}');
    `
  },
  createUser: function(userStr){
    return `INSERT INTO SchoolOrder.mobile_customer (name,phone,password, avataUrl, address, remark)
    VALUES ('${userStr.name}', '${userStr.phone}', '${userStr.password}', '${userStr.avataUrl}', '${userStr.address}',
    '${userStr.remark}')`;
  }
}
export default CustomerSql