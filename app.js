var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicons = require('connect-favicons');



//权限验证/**passport*
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// // passport.use(new LocalStrategy(callback_function));
//
//
//


// var admins = {
//     admin1:{
//         email:'aa',
//         pwd:'aa',
//     },
//     admin2:{
//         email:'sjh',
//         pwd:'sjh',
//     },
// }

//
// var localStrategy = new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'pwd',
//     },
//     function(username, password, done) {
//         admin = admin[ email ];
//
//         if ( admin == null ) {
//             return done( null, false, { message: 'Invalid user' } );
//         };
//
//         if ( admin.password !== password ) {
//             return done( null, false, { message: 'Invalid password' } );
//         };
//
//         done( null, admin );
//     }
// )
//
// passport.use( 'local', localStrategy );

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });
//
//
// passport.deserializeUser(function (id, done) {
//     done(null, id);
// });


// passport.use(new LocalStrategy({
//         email: 'aa',
//         pwd: 'aa',
//     },
//     function(username, password, cb) {
//         //验证不通过
//         if(username != account.username) {
//             return cb(null, false, {message: '用户名错误'});
//         }
//         if(password != account.password) {
//             return cb(null, false, {message: '密码错误'});
//         }
//         //验证通过，返回用户信息
//         return cb(null, account);
//     }
// ));
//


/**passport*/


var index = require('./routes/index');
var users = require('./routes/users');
var question = require('./routes/question');
var title = require('./routes/title');


var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**passport***/


/**passport***/


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser({uploadDir:'./uploadtemp'}));//设置上传临时文件夹 
app.use(cookieParser());

app.use(session({secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
cookie: { maxAge: 20 * 60 * 1000 }, //cookie生存周期20*60秒    
resave: true,  //cookie之间的请求规则,假设每次登陆，就算会话存在也重新保存一次    
saveUninitialized: true //强制保存未初始化的会话到存储器    
}));  //这些是写在app.js里面的  


app.use(express.static(path.join(__dirname, 'public')));
app.disable('view cache');
app.use(favicons(__dirname + '/public/images'));



app.use('/', index);

app.use('/title', title);

app.use('/users',users);

app.use('/question', question);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 定制 500 页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
