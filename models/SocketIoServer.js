var app = require('express')();     //导入用http服务
var http = require('http').Server(app);
var io = require('socket.io')(http);    //绑定http,express
var  fs=  require('fs');


//--------httpServer设置
app.get('/', function(req, res){
    function recall(data){
        res.send(data.toString());
    }
    fs.readFile('./views/client.ejs', function(err,  data)  {
        if  (err)  {
            console.log("bbbbb:"+err);
            recall('client不存在');
        }else{
            //console.log(data.toString());
            recall(data);
        }
    });
});
app.get('/public/javascripts/socket.io.js',function(req,res){
    function recall(data){
        res.send(data.toString());
    }
    fs.readFile('./public/javascripts/socket.io.js', function(err,  data)  {
        if  (err)  {
            console.log("bbbbb:"+err);
            recall('socket.io文件不存在');
        }else{
            //console.log(data.toString());
            recall(data);
        }
    });
});

//--------webSocket设置
//在线用户
var onlineUsers = {};

//当前在线人数
var onlineCount = [];
io.on('connection', function(socket){

    console.log('连接成功');

    //监听新用户加入
    socket.on('join', function (socketName) {
        io.emit(socket.name+'加入房间');
        console.log(socket.name + '加入了');
    });



    //socket.on('login', function(obj){
    var nick = socket.handshake.headers.referer.split("=")[1];  //根据connectSid找session如果session对象不为空，把session对象添加到socket的headers里面.在服务端收到connection的事件的时候，socket会携带一个建立连接时浏览器端传过来的握手信息socket.handshake,我们把它打印出来大概会是下面这个样子：
    nick = decodeURI(nick);
    socket.name=nick;
    onlineUsers[socket.name]=socket;
    //})

    socket.send(socket.name+"加入了房间") ;

    ++onlineCount;
    socket.send('现在有'+onlineCount+'在线');
    //监听用户退出
    socket.on('disconnect', function(){
        console.log('有人退出');
        delete onlineUsers[socket.name];
        --onlineCount;
    });

    //监听用户发布聊天内容
    socket.on('message', function(msg){
        //向所有客户端广播发布的消息
        //console.log(socket.name+'说：'+msg);
        //socket.send(socket.name+'说：'+msg);

        sayall(msg,socket);
    });


});
// function countnumber(onlineUsers){
//     for(var key in onlineUsers){
//         onlineUsers[key].send('在线人数：'+onlineUsers.length);
//     }
// }
function sayall(msg,socket){
    for(var key in onlineUsers){
        onlineUsers[key].send(socket.name+'说:'+msg);
    }
}


http.listen(9000, function(){      //启动
    console.log('listening on *:9000');
});



