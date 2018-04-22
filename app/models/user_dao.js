var pool = require('../../config/mysql');


module.exports = {
    saveGuest(u_show_name, u_email, u_head_img){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('insert into user ( u_show_name, u_email,u_head_img ) values (?, ?, ?);', [u_show_name, u_email, u_head_img], function (err, result) {
                    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                        throw new Error('创建用户连接超时');
                    }
                    if (err) {
                        throw err;
                    }
                    
                    // And done with the connection.
                    connection.release();
                    resolve(result)
    
                    // Don't use the connection here, it has been returned to the pool.
                });
            })
        })
    },
    getUserByN_P(u_name,u_password) {
        
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('SELECT * FROM user where u_name = ? and u_password = ?', [u_name,u_password], function (err, result) {
                    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                        throw new Error('获取用户连接超时');
                    }
                    if (err) {
                        throw err;
                    }

                    // And done with the connection.
                    connection.release();
                    resolve(result)

                    // Don't use the connection here, it has been returned to the pool.
                });
            })
        })
    },
    getUserByu_id(u_id) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('SELECT * FROM user where u_id = ? ', u_id, function (err, result) {
                    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                        throw new Error('获取用户连接超时');
                    }
                    if (err) {
                        throw err;
                    }

                    // And done with the connection.
                    connection.release();
                    resolve(result)

                    // Don't use the connection here, it has been returned to the pool.
                });
            })
        })
    }

}