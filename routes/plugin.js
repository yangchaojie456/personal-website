var express = require('express');
var router = express.Router();


// 定义插件列表的路由
router.get('/', function (req, res) {
    res.render('plugin')
});
// 定义插件路由
router.get('/:plugin_name', function (req, res) {
    res.render('plugin/'+req.params.plugin_name);
});

module.exports = router;