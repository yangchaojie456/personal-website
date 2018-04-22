var pool = require('../../config/mysql');


module.exports = {

    getReplyByc_Id(c_id) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('SELECT * FROM reply where c_id = ? ORDER BY r_create_time asc', c_id, function (err, result) {
                    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                        throw new Error('获取所有评论连接超时');
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
    saveReply(u_id, c_id, r_to_user_id, r_content) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('insert into reply (u_id, c_id,r_to_user_id, r_content) values (?,?,?,?) ', [u_id, c_id, r_to_user_id, r_content], function (err, result) {
                    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                        throw new Error('穿件回复连接超时');
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