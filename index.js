var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs');//加了文件操作的模块
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var plugin = require('./routes/plugin');
var wechat = require('./routes/wechat');
var app = express();

// view engine setup
// 修改app.js 将view engine修改为ejs。（并将模板的后缀修改为.html）
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

//创建一个写文件流，并且保存在当前文件夹的access.log文件中
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flag: 'a' });
//设置开启文件流，并且指明文件流的对象
app.use(logger('combined', { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'assets/game/')));
app.use(express.static(path.join(__dirname, 'assets/game-mobile/')));

app.get('/', function (req, res, next) {
  res.render('index')
});
app.get('/home', function (req, res, next) {
  res.render('home.html')
});
app.get('/about', function (req, res, next) {
  res.render('about.html')
});
app.use('/plugin', plugin);
app.use('/wechat', wechat);
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('页面未找到');
});
module.exports = app;
