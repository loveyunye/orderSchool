const OrderSql = {
  getOrderMobile:function(queryObject){
    const statusStr  = queryObject.isHistory==='0'?'0,1':'2'
    return `SELECT so.*,ss.portrait,ss.phone,ss.name,ss.address FROM SchoolOrder.sys_order so left join SchoolOrder.sys_user ss on ss.user_id = so.business_id 
    where so.mobile_userId = ${queryObject.mobile_userId} and so.order_status in (${statusStr})   order by  so.order_id desc limit 0,20 
    ; 
    `
  },
  // getOrderNum:function(queryObject){
  //   const strUserOption = queryObject.userId? `ss.user_id = ${queryObject.userId}  and`:``
  //   return `SELECT count(*) as num FROM SchoolOrder.sys_Order ss  where `+strUserOption+`
  //   locate('${queryObject.OrderName}',ss.Order_name)>0 and
  //   locate('${queryObject.OrderType}',ss.Order_type)>0`
  // },
  createSql:function(OrderObj){
    return `INSERT INTO SchoolOrder.sys_order 
    (order_content, mobile_userId, business_id, order_status, create_time, remark, total_price) 
    VALUES ('${OrderObj.order_content}', '${OrderObj.mobile_userId}',
    '${OrderObj.business_id}', '${OrderObj.order_status}', '${OrderObj.create_time}', '${OrderObj.remark}','${OrderObj.total_price}');`
  },
  getOrderSystem: function(queryObject){
    return `SELECT ss.name,ss.portrait, so.*,sm.* FROM ( SchoolOrder.sys_order so left join SchoolOrder.mobile_customer sm on sm.mobile_userId = so.mobile_userId )
    left join
    SchoolOrder.sys_user ss on ss.user_id = so.business_id
    where locate('${queryObject.userId}',so.business_id)>0 
    and locate('${queryObject.status}',so.order_status)>0   order by  so.order_id desc 
    limit ${queryObject.start},${queryObject.length}
    ;`
  },

  getOrderNumber: function(queryObject){
    return `SELECT count(*) as num FROM SchoolOrder.sys_order so  
    where locate('${queryObject.userId}',so.business_id)>0 
    and locate('${queryObject.status}',so.order_status)>0
    ;`
  },

  deleteSql: function(OrderId) {
    return `delete from SchoolOrder.sys_Order where Order_id in (${OrderId})`
  },
  typeSql:function(){
    return `SELECT * FROM SchoolOrder.Order_type`
  },
  // 设置订单状态
  setOrderStatus:function(queryObject){
    return `UPDATE SchoolOrder.sys_order SET order_status = '${queryObject.statusCode}' WHERE (order_id = '${queryObject.orderId}');`
  },

  // 获取新订单状态
  getOrderNumByStatus: function(queryObject) {
    return `SELECT sum(total_price) as price, count(*) as num FROM SchoolOrder.sys_order where locate('${queryObject.userId}',business_id)>0 and locate('${queryObject.status}',order_status)>0`
  },


  // 商家排行
  businessRank: function() {
    return `SELECT count(ss.total_price) as number,sum(ss.total_price) as price, su.name FROM SchoolOrder.sys_order ss 
    left join SchoolOrder.sys_user su on su.user_id = ss.business_id  
    where order_status = 2 
    group by ss.business_id order by  sum(ss.total_price) desc limit 0,10;`;
  }
  
}
export default OrderSql