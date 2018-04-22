var pool = require('../../config/mysql');

// 获取所有文章
module.exports = {
    getAllArticle(){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function (err, connection) {
                    // Use the connection
                    connection.query('SELECT * FROM article', function (err, result) {
                        if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                            throw new Error('获取所有文章连接超时');
                        }
                        if(err){
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
    getArticleById(a_id){
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('SELECT * FROM article where a_id = ?',a_id, function (err, result) {
                    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                        throw new Error('获取所有文章连接超时');
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
    // 添加文章
    saveArticle(a_title, a_author, a_category, a_brief, a_content,a_keyword,a_banner) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('insert into article (a_title, a_author, a_category, a_brief, a_content,a_keyword,a_banner) values (?,?,?,?,?,?,?) ', [a_title, a_author, a_category, a_brief, a_content, a_keyword, a_banner], function (err, result) {
                    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                        throw new Error('添加文章连接超时');
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
    // 删除文章
    deleteArticle(a_id) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // Use the connection
                connection.query('delete from article where a_id=?', a_id, function (err, result) {
                    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                        throw new Error('删除文章连接超时');
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
}