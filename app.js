var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var usersApi = require('./routes/users_api');
var session = require('express-session');

var app = express();

app.set('views', 'views');  //模板所在的目录 views
app.engine('.html', ejs.__express);
app.set('view engine', 'html')  //模板引擎使用html

app.use(bodyParser.json());   //使用json解析器body  {"username":"admin"}
app.use(bodyParser.urlencoded({extended: false})); //使用urlencoded解析名称值对  username=admin
app.use(express.static('public'));  //静态资料所在目录 public
// 引入session中间件
app.use(session({ // 这里的name值得是cookie的name，默认cookie的name是：connect.sid
    name: 'web1803',
    secret: 'websecret',
    cookie: ({
        maxAge: 1000 * 60 * 60 * 24,
    }),
    // 重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: true,
    // 强制“未初始化”的会话保存到存储。
    saveUninitialized: true,

}));

// 解决跨域问题
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", " * ");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-MethodS", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,username");
    next();
});

app.use(usersApi);  //使用路由模块

module.exports = app;
