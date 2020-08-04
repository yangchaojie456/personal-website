// 用于接收微信消息和事件的接口
const express = require('express');
const router = express.Router();
const crypto = require('crypto'); //引入加密模块
const config = require('../config/wechat.conf'); //引入配置文件
const wechat = require('../wechat/wechat')

var wechatApp = new wechat(config); //实例wechat 模块

router.get('/', async function(req, res) {
    wechatApp.auth(req, res);
});
router.get('/getAccessToken', async function (req, res) {

    res.send(await wechatApp.getAccessToken())
});

router.post('/', async function (req, res) {
    var str = await wechatApp.handleMsg(req, res)
    console.log(str)
    res.send(str);
});
module.exports = router;