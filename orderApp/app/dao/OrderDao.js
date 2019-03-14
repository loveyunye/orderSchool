const OrderSql = {
  getOrderSql:function(queryObject){
    const strUserOption = queryObject.userId? `ss.user_id = ${queryObject.userId}  and`:``
    return `SELECT ss.*,sd.type_name,su.name FROM SchoolOrder.sys_dinner ss left join
    SchoolOrder.dinner_type  sd on  sd.dinnerType_id = ss.dinner_type  
    left join sys_user su on ss.user_id=su.user_id
    where  `+strUserOption+`
    locate('${queryObject.dinnerName}',ss.dinner_name)>0 and
    locate('${queryObject.dinnerType}',ss.dinner_type)>0   limit ${queryObject.start},${queryObject.length}
    `
  },
  getOrderNum:function(queryObject){
    const strUserOption = queryObject.userId? `ss.user_id = ${queryObject.userId}  and`:``
    return `SELECT count(*) as num FROM SchoolOrder.sys_Order ss  where `+strUserOption+`
    locate('${queryObject.OrderName}',ss.Order_name)>0 and
    locate('${queryObject.OrderType}',ss.Order_type)>0`
  },
  createSql:function(OrderObj){
    return `INSERT INTO SchoolOrder.sys_Order 
    (user_id, Order_name, Order_photo, Order_price, create_time, remark, status,Order_type) 
    VALUES ('${OrderObj.userId}', '${OrderObj.OrderName}',
    '${OrderObj.OrderPhoto}', '${OrderObj.OrderPrice}', '${OrderObj.createTime}', '${OrderObj.remark}','${OrderObj.status}','${OrderObj.OrderType}');`
  },
  updateSql: function(updateObj){
    return `UPDATE SchoolOrder.sys_Order 
    SET Order_name = '${updateObj.OrderName}', Order_photo = '${updateObj.OrderPhoto}', 
    Order_price = '${updateObj.OrderPrice}', update_time = '${updateObj.updateTime}', remark = '${updateObj.remark}' ,
    Order_type = '${updateObj.OrderType}',status = '${updateObj.status}'
    WHERE (Order_id = '${updateObj.OrderId}');`
  },
  deleteSql: function(OrderId) {
    return `delete from SchoolOrder.sys_Order where Order_id in (${OrderId})`
  },
  typeSql:function(){
    return `SELECT * FROM SchoolOrder.Order_type`
  },

  getOrderSqlMobile:function(){
    
  }
}
export default OrderSql