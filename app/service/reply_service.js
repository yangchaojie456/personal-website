
let reply_dao = require('../models/reply_dao');

module.exports = {
    async saveReply(u_id, c_id,r_to_user_id, r_content) {
        let reply = await reply_dao.saveReply(u_id, c_id, r_to_user_id, r_content)
        return reply.insertId
    }
}