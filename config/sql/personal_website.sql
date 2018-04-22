/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : personal_website

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-04-16 00:02:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_title` varchar(20) NOT NULL,
  `a_author` varchar(20) NOT NULL,
  `a_category` varchar(20) NOT NULL,
  `a_brief` text,
  `a_content` text NOT NULL,
  `a_banner` varchar(100) DEFAULT NULL,
  `a_read_count` int(11) NOT NULL DEFAULT '0',
  `a_keyword` varchar(20) DEFAULT NULL,
  `a_create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `a_update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', 'demo1', '杨朝杰', '随笔', 'demo演示', '唯本色英雄方能到此', null, '0', '钱,生不带来,死不带去,但生的时候要', '2018-03-28 13:11:52', '2018-04-02 22:33:13');
INSERT INTO `article` VALUES ('2', 'demo2', '杨朝杰', '随笔', 'demo演示', '<div class=\"title\" id=\"anchor_statement\">\r\n                        <a href=\"#anchor_statement\">声明</a>\r\n                    </div>\r\n                    <div class=\"description\">\r\n                        <p>市场上虽然有各种基于canvas的图表工具，比如echarts.js ,chart.js。他们功能都很强大，性能也比较优秀。但是饼形图或环形图中并没有以圆角为交界的图表。</p>\r\n                        <strong>本插件使用canvas可以帮助你快速创建一个以圆角交界的环形图</strong>\r\n                        <p class=\"github\">\r\n                            喜欢的点个Star 呗！\r\n                            <a href=\"https://github.com/yangchaojie456/donut-chart\" class=\"relatedLink\" target=\"_blank\">GitHub</a>\r\n                        </p>\r\n                    </div>\r\n                    <div class=\"title\" id=\"anchor_compatibility\">\r\n                        <a href=\"#anchor_compatibility\">兼容性</a>\r\n                    </div>\r\n                    <div>\r\n                        适用于所有主流浏览器及移动端的浏览器。IE8及以下不支持\r\n                    </div>\r\n                    <div class=\"title\" id=\"anchor_install\">\r\n                        <a href=\"#anchor_install\">安装</a>\r\n                    </div>\r\n                    <div>\r\n                         npm install donut-chart\r\n                    </div>\r\n                    <div class=\"title\" id=\"anchor_usage\">\r\n                        <a href=\"#anchor_usage\">用法</a>\r\n                    </div>\r\n                    <div>\r\n                            首先需要一个canvas做载体\r\n                    </div>\r\n                    <div class=\"code\">\r\n<pre>\r\n    <code>\r\n        &lt;canvas id=\"myCanvas\" width=\"750\" height=\"600\"&gt;\r\n            当前浏览器版本过低，请使用其他浏览器尝试\r\n        &lt;/canvas&gt;\r\n    </code>\r\n</pre>\r\n\r\n                    </div>', '', '0', '钱,生不带来,死不带去,但生的时候要', '2018-03-28 13:11:52', '2018-04-15 19:40:55');
INSERT INTO `article` VALUES ('8', '图片', '2', '3', '4', '4', 'https://assets.awwwards.com/awards/avatar/195221/5a784c7d4272a.jpg', '0', '5', '2018-04-15 22:53:36', '2018-04-15 22:53:36');
INSERT INTO `article` VALUES ('9', '测试', 'yangCJ', '测试', '没有', '<div class=\"title\" id=\"anchor_compatibility\">\n                        <a href=\"#anchor_compatibility\">兼容性</a>\n                    </div>', '', '0', '', '2018-04-15 23:10:03', '2018-04-15 23:10:03');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) DEFAULT NULL,
  `a_id` int(11) DEFAULT NULL,
  `c_content` text NOT NULL,
  `c_create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `c_update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`c_id`),
  KEY `FK_Reference_1` (`u_id`),
  KEY `FK_Reference_2` (`a_id`),
  CONSTRAINT `FK_Reference_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `FK_Reference_2` FOREIGN KEY (`a_id`) REFERENCES `article` (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '2', '1', 'nice, good article', '2018-03-28 13:12:52', '2018-03-28 13:14:10');
INSERT INTO `comment` VALUES ('2', '2', '1', '第二条评论', '2018-04-03 23:12:15', '2018-04-03 23:12:15');
INSERT INTO `comment` VALUES ('15', '58', '1', '787655', '2018-04-15 19:35:52', '2018-04-15 19:35:52');

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) DEFAULT NULL,
  `c_id` int(11) DEFAULT NULL,
  `r_to_user_id` int(11) NOT NULL,
  `r_content` text NOT NULL,
  `r_create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `r_update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`r_id`),
  KEY `FK_Reference_3` (`u_id`),
  KEY `FK_Reference_4` (`c_id`),
  CONSTRAINT `FK_Reference_3` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `FK_Reference_4` FOREIGN KEY (`c_id`) REFERENCES `comment` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES ('1', '1', '1', '2', 'thanks', '2018-03-28 13:14:47', '2018-03-28 13:14:47');
INSERT INTO `reply` VALUES ('2', '2', '1', '1', 'you are welcome', '2018-04-04 00:28:03', '2018-04-04 00:28:03');
INSERT INTO `reply` VALUES ('4', '57', '1', '2', '123', '2018-04-15 19:21:49', '2018-04-15 19:21:49');
INSERT INTO `reply` VALUES ('5', '58', '2', '2', '阿斯蒂芬', '2018-04-15 19:35:41', '2018-04-15 19:35:41');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(20) DEFAULT NULL,
  `u_password` varchar(20) NOT NULL DEFAULT '123456',
  `u_show_name` varchar(30) NOT NULL,
  `u_email` varchar(50) DEFAULT NULL,
  `u_role` varchar(20) NOT NULL DEFAULT 'guest',
  `u_head_img` varchar(100) DEFAULT NULL,
  `u_create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `u_update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'yangCJ', 'yangcan321', '杨朝杰', 'yangchaojie456@126.com', 'admin', 'boy', '2018-03-28 13:06:44', '2018-04-15 15:21:36');
INSERT INTO `user` VALUES ('2', 'guest', '123456', '游客机器人', null, 'guest', 'girl', '2018-03-28 13:13:54', '2018-04-15 15:21:30');
INSERT INTO `user` VALUES ('50', null, '123456', '', '', 'guest', '', '2018-04-15 19:15:54', '2018-04-15 19:15:54');
INSERT INTO `user` VALUES ('51', null, '123456', '', '', 'guest', 'boy', '2018-04-15 19:18:19', '2018-04-15 19:18:19');
INSERT INTO `user` VALUES ('52', null, '123456', '', '', 'guest', 'boy', '2018-04-15 19:19:54', '2018-04-15 19:19:54');
INSERT INTO `user` VALUES ('53', null, '123456', '123', '', 'guest', 'boy', '2018-04-15 19:20:00', '2018-04-15 19:20:00');
INSERT INTO `user` VALUES ('54', null, '123456', '', '', 'guest', 'boy', '2018-04-15 19:21:36', '2018-04-15 19:21:36');
INSERT INTO `user` VALUES ('55', null, '123456', '', '', 'guest', 'boy', '2018-04-15 19:21:41', '2018-04-15 19:21:41');
INSERT INTO `user` VALUES ('56', null, '123456', '2', '', 'guest', 'boy', '2018-04-15 19:21:44', '2018-04-15 19:21:44');
INSERT INTO `user` VALUES ('57', null, '123456', '2', '33', 'guest', 'boy', '2018-04-15 19:21:49', '2018-04-15 19:21:49');
INSERT INTO `user` VALUES ('58', null, '123456', '大师傅', '32432', 'guest', 'boy', '2018-04-15 19:35:41', '2018-04-15 19:35:41');
