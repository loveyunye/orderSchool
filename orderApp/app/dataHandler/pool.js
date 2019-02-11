import mysql from 'mysql'
import config from '../config/config'

let pool = global.pool
if(!pool) {
  pool = mysql.createPool(Object.assign({},config.getMysqlConfig(), {
    connectionLimit: 10,
    acquireTimeout: 10000,
    multipleStatements: true,
    queueLimit: 50
  }));
  global.pool = pool
}

pool.on('enqueue', function() {
  //console.log('no mysql connection is available');
});

export default function(sql){
  return new Promise((resolve,reject) => {
    try {
      pool.getConnection((err,conn) => {
        if(err){
          reject(err)
        } else {
          conn.query(sql,(err,result)=>{
            err?reject(err):resolve(result);
          })
          conn.release();
        }
      })
    }
    catch(err){
      reject(err)
    }
  })
}
