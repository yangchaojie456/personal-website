

let user_dao = require('../models/user_dao');

module.exports = {
    // 获取用户
    async getUserByN_P(u_name,u_password) {
        let users = await user_dao.getUserByN_P(u_name, u_password);
        if(users.length === 0){
            return {
                success:false,
                message:'用户名或密码错误'
            }
        }        
        return {
            success:true,
            message:'登录成功',
            role: users[0].u_role,
            userName:users[0].u_show_name
        }
    },
    // 添加游客
    async saveGuest(u_show_name, u_email, u_head_img) {
        let users = await user_dao.saveGuest(u_show_name, u_email, u_head_img);
        return users.insertId       
    },
    
}