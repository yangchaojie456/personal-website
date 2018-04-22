var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    // host: 'itbilu.com',
    user: 'root',
    password: '123456',
    database:'personal_website'
});


module.exports = pool;


// // Get a connection
// pool.getConnection(function (err, connection) {
//     // Use the connection
//     connection.query('SELECT something FROM sometable', function (err, rows) {
//         // And done with the connection.
//         connection.release();

//         // Don't use the connection here, it has been returned to the pool.
//     });
// });

// connection level transaction

// connection.beginTransaction(function (err) {
//     if (err) { throw err; }
//     connection.query('INSERT INTO posts SET title=?', title, function (err, result) {
//         if (err) {
//             return connection.rollback(function () {
//                 throw err;
//             });
//         }

//         var log = 'Post ' + result.insertId + ' added';

//         connection.query('INSERT INTO log SET data=?', log, function (err, result) {
//             if (err) {
//                 return connection.rollback(function () {
//                     throw err;
//                 });
//             }
//             connection.commit(function (err) {
//                 if (err) {
//                     return connection.rollback(function () {
//                         throw err;
//                     });
//                 }
//                 console.log('success!');
//             });
//         });
//     });
// });

// 连接超时

// if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
//     throw new Error('表 count 操作超时！');
// }