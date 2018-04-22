
// 获取所有文章列表
let blog_dao = require('../models/blog_dao');

module.exports = {
    
    async getAllArticle() {

        let articleList = await blog_dao.getAllArticle();

        articleList.forEach(element => {
            // 新增格式化时间
            let date = new Date(element.a_create_time)
            element['a_format_create_time'] = date.getFullYear() + ',' + date.getMonth() + ',' + date.getDate()
        });

        return articleList
    },
    async getArticleById(a_id){
        let articleList = await blog_dao.getArticleById(a_id);
        let date = new Date(articleList[0].a_create_time);
        articleList[0]['a_format_create_time'] = date.getFullYear() + ' / ' + date.getMonth() + ' / ' + date.getDate()
        return articleList[0]
    },
    async saveArticle({a_title, a_author, a_category, a_brief, a_content, a_keyword, a_banner}){
        let article = await blog_dao.saveArticle(a_title, a_author, a_category, a_brief, a_content, a_keyword, a_banner);
        return article
    },
    async deleteArticle(a_id) {
        let article = await blog_dao.deleteArticle(a_id)
        return article
    }
}