require('babel-polyfill');
const mysql = require('mysql');
let pool = global.pool;
if(!pool){
	pool = mysql.createPool({
		host:'101.132.44.31',
		user:'root',
		password:'root',
		database:'SchoolOrder'
	})
	global.pool = pool;
}
function getConnection(){
	return new Promise((resolve,reject)=>{
		pool.getConnection((err,conn)=>{
			err?reject(err):resolve(conn);
		})
	})
}

function execute(sql){
	return new Promise((resolve,reject)=>{
		let connection;
		getConnection().then(conn=>{
			connection = conn;
			conn.query(sql,(err,result)=>{
				err?reject(err):resolve(result);
			})
		}).catch(err=>{reject(err)}).finally(()=>{
			if(connection){connection.release();}
		})
	})
}

module.exports = {execute}