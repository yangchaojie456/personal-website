var express = require('express');
var router = express.Router();
var blog_service = require('../app/service/blog_service')
var comment_service = require('../app/service/comment_service')
var user_service = require('../app/service/user_service')
var reply_service = require('../app/service/reply_service')

router.get('/', async function (req, res) {

    let data = {
        articleList: await blog_service.getAllArticle(),
        role:req.session.admin?true:false
    }
    // console.log(r)
    res.render('blog', data)
});

router.get('/:blog_name', async function (req, res) {
    // 先更新文章阅读量
    let article = await blog_service.getArticleById(req.params.blog_name)
    let comment = await comment_service.getCommentBya_Id(article.a_id)
    let data = {
        article,
        comment,
        isSession: req.session.u_id ? true : false
    }
    // console.log(data)
    res.render('blog/article.html', data);
});

// 发送评论
router.post('/sendCommit', async function (req, res) {
    let u_id = 0    
    if (req.session.u_id) {
        u_id = req.session.u_id
    } else {
        if (!req.body.name) {
            return res.json({
                success: false,
                message: "昵称不能为空"
            })
        }
        if (!req.body.email) {
            return res.json({
                success: false,
                message: "邮箱不能为空"
            })
        }
        // 保存用户信息  获取 u_id
        u_id = await user_service.saveGuest(req.body.name, req.body.email, req.body.gender)
    }
    if (!req.body.commit){
        return res.json({
            success: false,
            message: "评论不能为空"
        })
    }
   
    // 保存评论信息
    let c_id = await comment_service.saveComment(req.body.articleId, u_id, req.body.commit)
    // 存入用户信息到session
    req.session.regenerate(function (err) {
        if (err) {
            return res.json({ ret_code: 2, ret_msg: '登录失败' });
        }
        req.session.u_id = u_id
        // 返回json
        res.json({
            success: true,
            message: "评论成功"
        })
    });

})
// 发送回复
router.post('/sendReply', async function (req, res) {
    let u_id = 0
    if (req.session.u_id) {
        u_id = req.session.u_id
    } else {
        if (!req.body.name) {
            return res.json({
                success: false,
                message: "昵称不能为空"
            })
        }
        if (!req.body.email) {
            return res.json({
                success: false,
                message: "邮箱不能为空"
            })
        }
        // 保存用户信息  获取 u_id
        u_id = await user_service.saveGuest(req.body.name, req.body.email, req.body.gender)
    }
    // 根据评论id获取 r_to_user_id
    
    let r_to_user = await comment_service.getCommentByc_Id(req.body.commit_Id)
    if (!req.body.commit) {
        return res.json({
            success: false,
            message: "评论不能为空"
        })
    }

    
    // 保存评论信息
    let c_id = await reply_service.saveReply(u_id, req.body.commit_Id, r_to_user[0].u_id , req.body.commit)
    // 存入用户信息到session
    req.session.regenerate(function (err) {
        if (err) {
            return res.json({ ret_code: 2, ret_msg: '登录失败' });
        }
        req.session.u_id = u_id
        // 返回json
        res.json({
            success: true,
            message: "评论成功"
        })
    });

})
router.post('/deleteArticle', async function (req, res) {
    let article = await blog_service.deleteArticle(req.body.a_id)
    console.log(article)
    if (article.affectedRows>0){
        return res.json({
            success:true,
            message:'删除成功'
        })
    }
    res.json({
        success:false,
        message:'删除出错'
    })
    
})
module.exports = router;