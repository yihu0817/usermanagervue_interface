var express = require('express');
var db = require('../config/db');
var querydb = require('../utils/querydb');
var upload = require('../utils/fileupload_util');

var router = express.Router(); //获取路由对象

//根据id查询用户接口:/api/find
router.get("/api/find", function (req, res, next) {
    var id = req.query.id; //接收表单参数
    console.log("id: " + id);

    var sql = "SELECT uid, username,password FROM user WHERE uid = ?";
    var parameters = [id];

    querydb(sql, parameters).then(function (data) {
        // res.send(JSON.stringify(data[0]));
        res.send({
            resultCode: 1,
            resultInfo: data[0],
        });
    }).catch(next);

});

//根据用户名密码查询用户接口:/api/login
router.post("/api/login", function (req, res) {
    var username = req.body.username; //接收表单参数
    var password = req.body.password;
    console.log("userName: " + username + ", passWord :" + password);
    var sql = "SELECT uid,username,password FROM user WHERE username = ? and password = ?";
    var parameters = [username, password];

    querydb(sql, parameters).then(function (data) {
        if (data != null && data.length > 0) {
            res.send({
                resultCode: 1,
                resultInfo: data[0],
            })
        } else {
            res.send({
                resultCode: -1,
                resultInfo: '用户名密码出错!',
            });
        }
    });
})


//用户列表接口: /api/list
router.get("/api/list", function (req, res) {
    var sql = "SELECT * FROM user";
    querydb(sql).then(function (data) {
        console.log(JSON.stringify(data));
        if (data != null && data.length > 0) {
            res.send({
                resultCode: 1,
                resultInfo: data,
            })
        } else {
            res.send({
                resultCode: -1,
                resultInfo: '没有数据',
            });
        }
    })

});
//删除用户接口:/api/delete
router.get("/api/delete", function (req, res) {
    var id = req.query.uid; //get请求 req.query.名称= 值   post请求 req.body.名称 = 值
    console.log("id :" + id);
    var sql = "DELETE FROM user WHERE uid = '" + id + "'";
    querydb(sql).then(function (data) {
        console.log("删除成功!  :" + JSON.stringify(data));

        res.send({
            resultCode: 1,
            resultInfo: 'ok',
        });
    });

});
//添加用户接口 post请求:/api/add
router.post("/api/add", upload.single('fileHeader'), function (req, res) {
    var userName = req.body.username; //接收表单用户名参数
    var passWord = req.body.psw; //接收表单密码参数
    console.log("userName: " + userName + ",  passWord :" + passWord);
    var sql = "INSERT INTO user (username,password,headerimg) VALUES (?,?,?)";
    var parameters = [userName, passWord, req.session.headerimg];

    querydb(sql, parameters).then(function (data) {
        console.log("插入数据成功!");
        res.send({
            resultCode: 1,
            resultInfo: 'ok',
        });
    }).catch(error => {
        res.send({
            resultCode: -1,
            resultInfo: 'no',
        });
    });

});
//修改用户接口 post请求:/api/update
router.post("/api/update", function (req, res) {
    var id = req.body.id;
    var userName = req.body.username; //接收表单用户名参数
    var passWord = req.body.psw; //接收表单密码参数
    console.log("userName: " + userName + ",  passWord :" + passWord);
    var sql = "UPDATE  user  SET username = ?,password = ? WHERE uid = ?";
    var parameters = [userName, passWord, id];
    querydb(sql, parameters).then(function (data) {
        console.log("修改数据成功!" + JSON.stringify(data)); //JSON.stringify()【将一个对象解析成字符串】
        res.send({
            resultCode: 1,
            resultInfo: 'ok',
        });
    });

});

//退出接口
router.get("/api/logout", function (req, res, next) {
    // 清除session
    res.send({
        resultCode: 1,
        resultInfo: 'ok',
    });
});

module.exports = router;