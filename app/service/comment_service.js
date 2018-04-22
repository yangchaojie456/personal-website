// 获取评论
let comment_dao = require('../models/comment_dao');
let reply_dao = require('../models/reply_dao');
let user_dao = require('../models/user_dao');
module.exports = {
    
    async getCommentBya_Id(a_id) {
        let commentList = await comment_dao.getCommentBya_Id(a_id);
        for (let i = 0, l = commentList.length;i<l;i++){
            commentList[i].c_author = (await user_dao.getUserByu_id(commentList[i].u_id))[0]
            commentList[i].replyList = await reply_dao.getReplyByc_Id(commentList[i].c_id)
            for (let j = 0, j_l = commentList[i].replyList.length;j<j_l;j++){
                commentList[i].replyList[j].r_author = (await user_dao.getUserByu_id(commentList[i].replyList[j].u_id))[0]
                commentList[i].replyList[j].r_to_user = (await user_dao.getUserByu_id(commentList[i].replyList[j].r_to_user_id))[0]
            }
        }

        return commentList
    },
    async getCommentByc_Id(c_id) {
        let comment = await comment_dao.getCommentByc_Id(c_id)
        return comment
    },
    async saveComment(a_id, u_id, c_content){
        let comment = await comment_dao.saveComment(a_id, u_id,c_content)
        return comment.insertId
    }
}