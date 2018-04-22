var pool = require('../../config/mysql');


module.exports = {

    getCommentBya_Id(a_id) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('SELECT * FROM comment where a_id = ? ORDER BY c_create_time asc', a_id, function (err, result) {
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

    getCommentByc_Id(c_id) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('SELECT * FROM comment where c_id = ?', c_id, function (err, result) {
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
    saveComment(a_id, u_id, c_content) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('insert into comment (a_id, u_id, c_content) values (?,?,?) ', [a_id, u_id, c_content], function (err, result) {
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
    }

}