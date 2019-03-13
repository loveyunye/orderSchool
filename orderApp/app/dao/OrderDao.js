const DinnerSql = {
  getDinnerSql:function(queryObject){
    // ss.user_id = ${queryObject.userId} 
    const strUserOption = queryObject.userId? `ss.user_id = ${queryObject.userId}  and`:``
    return `SELECT ss.*,sd.type_name,su.name FROM SchoolOrder.sys_dinner ss left join
    SchoolOrder.dinner_type  sd on  sd.dinnerType_id = ss.dinner_type  
    left join sys_user su on ss.user_id=su.user_id
    where  `+strUserOption+`
    locate('${queryObject.dinnerName}',ss.dinner_name)>0 and
    locate('${queryObject.dinnerType}',ss.dinner_type)>0   limit ${queryObject.start},${queryObject.length}
    `
  },
  getDinnerNum:function(queryObject){
    const strUserOption = queryObject.userId? `ss.user_id = ${queryObject.userId}  and`:``
    return `SELECT count(*) as num FROM SchoolOrder.sys_dinner ss  where `+strUserOption+`
    locate('${queryObject.dinnerName}',ss.dinner_name)>0 and
    locate('${queryObject.dinnerType}',ss.dinner_type)>0`
  },
  createSql:function(DinnerObj){
    return `INSERT INTO SchoolOrder.sys_dinner 
    (user_id, dinner_name, dinner_photo, dinner_price, create_time, remark, status,dinner_type) 
    VALUES ('${DinnerObj.userId}', '${DinnerObj.dinnerName}',
    '${DinnerObj.dinnerPhoto}', '${DinnerObj.dinnerPrice}', '${DinnerObj.createTime}', '${DinnerObj.remark}','${DinnerObj.status}','${DinnerObj.dinnerType}');`
  },
  updateSql: function(updateObj){
    return `UPDATE SchoolOrder.sys_dinner 
    SET dinner_name = '${updateObj.dinnerName}', dinner_photo = '${updateObj.dinnerPhoto}', 
    dinner_price = '${updateObj.dinnerPrice}', update_time = '${updateObj.updateTime}', remark = '${updateObj.remark}' ,
    dinner_type = '${updateObj.dinnerType}',status = '${updateObj.status}'
    WHERE (dinner_id = '${updateObj.dinnerId}');`
  },
  deleteSql: function(DinnerId) {
    return `delete from SchoolOrder.sys_dinner where dinner_id in (${DinnerId})`
  },
  typeSql:function(){
    return `SELECT * FROM SchoolOrder.dinner_type`
  },

  getDinnerSqlMobile:function(){
    const strUserOption = queryObject.userId? `ss.user_id = ${queryObject.userId}  and`:``
    return `SELECT ss.*,sd.type_name,su.name FROM SchoolOrder.sys_dinner ss left join
    SchoolOrder.dinner_type  sd on  sd.dinnerType_id = ss.dinner_type  
    left join sys_user su on ss.user_id=su.user_id
    where  `+strUserOption+`
    locate('${queryObject.dinnerName}',ss.dinner_name)>0 and
    locate('${queryObject.dinnerType}',ss.dinner_type)>0   limit ${queryObject.start},${queryObject.length}`
  }
}
export default DinnerSql