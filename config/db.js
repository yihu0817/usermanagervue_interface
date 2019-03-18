var  mysql =  require('mysql');
// function query(sql,parameters,callFunction){
// 	//创建数据库连接
// 	var connection = mysql.createConnection({
// 		host:'localhost',
// 		port:'3306',
// 		user:'root',
// 		password:'123456',
// 		database:'db1803'
// 	});
//
// 	connection.connect(); //打开数据库连接
//
// 	connection.query(sql,parameters,callFunction); //执行sql，回调函数处理结果
//
// 	connection.end(); //关闭数据库
// }
//
// exports.query = query;

var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'b123',//'b123',
    database: 'usermanager'
});

function query(sql, parameter, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, parameter, function (qerr, vals, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};

exports.query = query;