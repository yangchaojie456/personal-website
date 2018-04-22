var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs');//加了文件操作的模块
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var plugin = require('./routes/plugin');
var blog = require('./routes/blog');
var CMS = require('./routes/CMS');

var app = express();

// view engine setup
// 修改app.js 将view engine修改为ejs。（并将模板的后缀修改为.html）
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html'); 
// Use the session middleware 
app.use(session({
  ////这里的name值得是cookie的name，默认cookie的name是：connect.sid
  name: 'YCJ_sid',
  secret: 'keyboard cat',
  cookie: ('name', 'value', { path: '/', httpOnly: true, secure: false, maxAge: 31536000 }),
  //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
  resave: true,
  //强制“未初始化”的会话保存到存储。 
  saveUninitialized: true,

}))

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flag: 'a' });//创建一个写文件流，并且保存在当前文件夹的access.log文件中
app.use(logger('combined', { stream: accessLogStream }));//设置开启文件流，并且指明文件流的对象

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/assets',express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'assets/game/')));
app.use(express.static(path.join(__dirname, 'assets/game-mobile/')));

app.get('/', function(req,res,next){
  console.log(req.session)  
  res.render('index')
});
app.get('/index', function (req, res, next) {
  res.render('home.html')
});
app.get('/about', function (req, res, next) {
  res.render('about.html')
});
app.use('/plugin', plugin);
app.use('/blog', blog);
app.use('/CMS', CMS);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('页面未找到');
});
module.exports = app;
