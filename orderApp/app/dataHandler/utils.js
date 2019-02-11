let createConnectionPool,pool,getMysqlConnection;

createConnectionPool = _.once(function() {
  return mysql.createPool(_.extend(config.getMysqlConfig(), {
    connectionLimit: 10,
    acquireTimeout: 10000,
    multipleStatements: true,
    queueLimit: 50
  }));
});


getMysqlConnection = function(cb) {
  return pool.getConnection(cb);
};

exports.pool = pool = createConnectionPool();
exports.pool = getMysqlConnection();

// 连接池占用过多时
pool.on('enqueue', function() {
  //console.log('no mysql connection is available');
});