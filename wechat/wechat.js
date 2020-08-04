const crypto = require('crypto'), //引入加密模块
    https = require('https'), //引入 htts 模块
    util = require('util'), //引入 util 工具包
    accessTokenJson = require('./config/accessToken'); //引入本地存储的 access_token
const request = require('request')
const fs = require('fs')
const parseString = require('xml2js').parseString; //引入xml2js包
const msg = require('./msg')
//构建 WeChat 对象 即 js中 函数就是对象
var WeChat = function (config) {
    //设置 WeChat 对象属性 config
    this.config = config;
    //设置 WeChat 对象属性 token
    this.token = config.token;
    //设置 WeChat 对象属性 appID
    this.appID = config.appID;
    //设置 WeChat 对象属性 appScrect
    this.appScrect = config.appScrect;
    //设置 WeChat 对象属性 apiDomain
    this.apiDomain = config.apiDomain;
    //设置 WeChat 对象属性 apiURL
    this.apiURL = config.apiURL;


}
/**
 * 微信接入验证
 */
WeChat.prototype.auth = function (req, res) {
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature, //微信加密签名
        timestamp = req.query.timestamp, //时间戳
        nonce = req.query.nonce, //随机数
        echostr = req.query.echostr; //随机字符串

    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [this.token, timestamp, nonce];
    array.sort();

    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型 
    var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密

    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
        res.send(echostr);
    } else {
        res.send('mismatch');
    }
}

/**
 * 获取微信 access_token
 */
WeChat.prototype.getAccessToken = function () {
    return new Promise((resolve, reject) => {
        //获取当前时间 
        var currentTime = new Date().getTime();
        //格式化请求地址
        var url = util.format(this.apiURL.accessTokenApi, this.apiDomain, this.appID, this.appScrect);

        //判断 本地存储的 access_token 是否有效
        if (accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime) {
            request(url, (error, response, data) => {

                var result = JSON.parse(data)
                if (data.indexOf("errcode") < 0) {
                    accessTokenJson.access_token = result.access_token;
                    accessTokenJson.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
                    //更新本地存储的
                    fs.writeFile('./config/accessToken.json', JSON.stringify(accessTokenJson), function (err) {
                        if (err) {
                            throw err
                        }
                        //将获取后的 access_token 返回
                        resolve(accessTokenJson.access_token);
                    });
                } else {
                    //将错误返回
                    resolve(data);
                }
            })
        } else {
            //将本地存储的 access_token 返回
            resolve(accessTokenJson.access_token);
        }
    });
}

/**
 * 微信消息
 */
WeChat.prototype.handleMsg = function (req, res) {
    return new Promise((resolve, reject) => {

        var buffer = [];
        //监听 data 事件 用于接收数据
        req.on('data', function (data) {
            buffer.push(data);
        });
        //监听 end 事件 用于处理接收完成的数据
        req.on('end', function () {

            //输出接收完成的数据   
            var msgXml = Buffer.concat(buffer).toString('utf-8').toString('utf-8');
            msgXml = "<xml>" + (msgXml.split('<xml>')[1].split('</xml>')[0]) + "</xml>"
            //解析xml
            parseString(msgXml, {
                explicitArray: false
            }, function (err, result) {
                if (!err) {
                    //打印解析结果

                    result = result.xml;
                    var toUser = result.ToUserName; //接收方微信
                    var fromUser = result.FromUserName; //发送方微信
                    //判断消息类型
                    if (result.MsgType.toLowerCase() === "event") {
                        //判断事件类型

                        switch (result.Event.toLowerCase()) {
                            case 'subscribe':
                                //回复消息

                                resolve(msg.txtMsg(fromUser, toUser, '欢迎关注 杨朝杰的求职 公众号\n回复1（查看技能）\n回复2（查看个人信息）\n回复3（查看工作经历）\n回复4（查看最近一年的项目）\n回复5（获取联系方式）'))
                                break;
                            case 'click':
                                var contentArr = [{
                                    Title: "Node.js 微信自定义菜单",
                                    Description: "使用Node.js实现自定义微信菜单",
                                    PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                                    Url: "http://blog.csdn.net/hvkcoder/article/details/72868520"
                                },
                                {
                                    Title: "Node.js access_token的获取、存储及更新",
                                    Description: "Node.js access_token的获取、存储及更新",
                                    PicUrl: "http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                                    Url: "http://blog.csdn.net/hvkcoder/article/details/72783631"
                                },
                                {
                                    Title: "Node.js 接入微信公众平台开发",
                                    Description: "Node.js 接入微信公众平台开发",
                                    PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                                    Url: "http://blog.csdn.net/hvkcoder/article/details/72765279"
                                }
                                ];
                                //回复图文消息
                                resolve(msg.graphicMsg(fromUser, toUser, contentArr));
                                break;
                        }
                    } else if (result.MsgType.toLowerCase() === "text") {
                        //根据消息内容返回消息信息
                        switch (result.Content) {
                            case '1':
                                var contentArr = [{
                                    Title: "个人技能（游戏版本）",
                                    Description: "游戏版本",
                                    PicUrl: "http://www.yangchaojie.top/assets/images/wechat/1.jpg",
                                    Url: "http://www.yangchaojie.top/game-mobile.html"
                                }, {
                                    Title: "个人技能（书面版本）",
                                    Description: "书面版本",
                                    PicUrl: "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1413071116,1299738759&fm=85&s=95C6FC1684F16B82685E96F40300502F",
                                    Url: "http://yangchaojie.top/assets/personal-information/info.html"
                                }];
                                //回复个人技能
                                resolve(msg.graphicMsg(fromUser, toUser, contentArr));
                                break;
                            case '2':
                                // var contentArr = [{
                                //     Title: "个人信息",
                                //     Description: "",
                                //     PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                                //     Url: "http://blog.csdn.net/hvkcoder/article/details/72868520"
                                // }];
                                // resolve(msg.graphicMsg(fromUser, toUser, contentArr));
                                //回复个人信息
                                resolve(msg.txtMsg(fromUser, toUser, `
姓名：杨朝杰\n
年龄：27\n
职能：web前端工程师\n
现居地：上海\n
电话：13813467232\n
邮箱：yangchaojie456@126.com\n
酷站-站长：https://coolz.com.cn\n
求职意向\n
工作性质：全职\n
期望职业：WEB前端开发、\n
期望行业：互联网/电子商务\n
工作地区：上海\n
期望月薪：面议\n
目前状况：在职平安城科
                                `));
                                break;
                            case '3':
                                var contentArr = [{
                                    Title: "2018.5至今 平安城科 web前端工程师",
                                    Description: "",
                                }, {
                                    Title: "2017.5至2018.5 宝朔金融科技 web前端工程师",
                                    Description: "",
                                    PicUrl: "https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1707/bc704fd1-c022-4af4-8921-6a4dfb01d0fb.jpg",
                                    Url: "https://www.bxjr.com/"
                                }, {
                                    Title: "2016.3-2017.4 河南纤原网络科技有限公司 前端工程师",
                                    Description: "",
                                    // PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                                    Url: "http://www.zgqywl.com/index.html"
                                }, {
                                    Title: "2015.10-2016.1 郑州鑫荣网络技术有限公司 前端工程师",
                                    Description: "",
                                    // PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                                    // Url: "http://blog.csdn.net/hvkcoder/article/details/72868520"
                                }];
                                //回复工作经历
                                resolve(msg.graphicMsg(fromUser, toUser, contentArr));
                                break;
                            case '4':
                                var contentArr = [{
                                    Title: "宝象金融",
                                    Description: "",
                                    PicUrl: "https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1707/bc704fd1-c022-4af4-8921-6a4dfb01d0fb.jpg",
                                    Url: "https://www.bxjr.com/"
                                }, {
                                    Title: "双胞胎金服",
                                    Description: "",
                                    PicUrl: "https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1805/afccb811-4952-4651-aecb-0de2b99ab375.png",
                                    Url: "https://www.twinsfax.com/"
                                }, {
                                    Title: "合末藝科",
                                    Description: "",
                                    PicUrl: "https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1805/c0695423-77ce-4d36-a02e-681120ee59a1.png",
                                    Url: "http://m.hmcfvip.com/"
                                }, {
                                    Title: "涨薪宝企业管理系统",
                                    Description: "",
                                    PicUrl: "https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1805/ed40aac8-816a-4642-bb0a-b1cb52ee7212.png",
                                    Url: "https://www.bxjr.com/zxbsalary/"
                                }, {
                                    Title: "宝朔金融科技",
                                    Description: "",
                                    PicUrl: "http://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1805/af46a6bd-244b-4319-a586-8aaac2df2148.png",
                                    Url: "http://supplychain.bestsuretech.com/supplychain/"
                                }, {
                                    Title: "快捷贷",
                                    Description: "",
                                    PicUrl: "https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1805/1029b32e-888c-43e1-9933-1190d6e6af25.png",
                                    Url: "http://m.kuaijieloan.com/cash/"
                                }, {
                                    Title: "想念金服",
                                    Description: "",
                                    PicUrl: "https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1805/ff9328ee-6c2e-4f1b-a842-9b6e5218a731.png",
                                    Url: "https://m.bxjr.com/m/xiangnian/"
                                }
                                ];

                                //回复工作经历
                                resolve(msg.graphicMsg(fromUser, toUser, contentArr));
                                break;
                            case '5':
                                // 回复电话号码
                                resolve(msg.txtMsg(fromUser, toUser, 'Tel：13813467232'));
                                break;
                            // 发送什么回复什么
                            // case result.Content:
                            //     resolve(msg.txtMsg(fromUser, toUser, result.Content));
                            //     break;
                            default:
                                resolve(msg.txtMsg(fromUser, toUser, result.Content + '查询代码错误\n回复1（查看技能）\n回复2（查看个人信息）\n回复3（查看工作经历）\n回复4（查看最近一年的项目）\n回复5（获取联系方式）'));
                                break;
                        }
                    }
                } else {

                    //打印错误信息
                    // console.log(err);                    
                    reject(err)
                }
            })
        });
    })


}

//暴露可供外部访问的接口
module.exports = WeChat;