var express = require('express');
var router = express.Router();
var user_service = require('../app/service/user_service')
var blog_service = require('../app/service/blog_service')

// 定义登录页面
router.get('/login', async function (req, res) {
    if (req.session.admin) {
        return res.render('CMS/write_article.html')
    }
    res.render('CMS/login')
});
// 定义一个登录接口
router.post('/login', async function (req, res) {

    var sess = req.session//用这个属性获取session中保存的数据，而且返回的JSON数据
    var result = await user_service.getUserByN_P(req.body.name, req.body.password)

    if(result.success){
        req.session.admin = {
            name: result.userName,
            role: result.role
        }
        
    }
    res.json(result)    
});
// 写文章
router.post('/writeArticle', async function (req, res) {
    
    
    let article = await blog_service.saveArticle(req.body)
    console.log(article.insertId)
    if (article.insertId){
        return res.json({
            success:true,
            message:'发布成功'
        })
    }
    res.json({
        success:false,
        message:'失败'
    })
});
module.exports = router;