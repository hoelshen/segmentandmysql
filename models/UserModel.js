var connPool = require('./ConnPool')
var LoginBean = require("../jsbean/LoginBean");  


module.exports={
		 zhuce:function(req,res)
		{
		 	pool = connPool();
		 	//从pool中获取连接(异步,取到后回调) 
        	pool.getConnection(function(err,conn){ 
        	if(err)
        	{ 
              //console.log('insert err:',err.message); 
              res.send("获取连接错误,错误原因:"+err.message); 
              return; 
             }
             var userAddSql = 'insert into user (email,pwd,nicheng,createtime) values(?,?,?,current_timestamp)'; 
             var param = [req.body['email'],req.body['pwd'],req.body['nicheng']];
             conn.query(userAddSql,param,function(err,rs){ 
                if(err){ 
                    //console.log('insert err:',err.message); 
                    //res.send("注册错误,错误原因:"+err.message);
                    errStr = err.message;
                    sendStr = "<script> "; 
                    if (errStr.indexOf('emailuniq')>-1) 
                    {
                    	 sendStr += "alert('email重复');"; 
                    }else if (errStr.indexOf('nichenguniq')>-1) 
                    {
                    	 sendStr += "alert('呢称重复');"; 
                    }else 
                    {
                    	 sendStr += "alert('数据库异常');"; 
                    }
                    sendStr += " history.back();</script>" 
                    res.send(sendStr);
                    return; 
                } 
                res.redirect(307,'./login');   //跳转到index页面'; 
            });  
            conn.release();  
		 });
	},
	login:function(req,res){
		pool = connPool();   
        //从pool中获取连接(异步,取到后回调)   
        pool.getConnection(function(err,conn)
        { 
            if(err)
            { 
                  //console.log('insert err:',err.message); 
                 res.send("获取连接错误,错误原因:"+err.message); 
                  return; 
            } 
            var userSql = 'select uid,nicheng from user where email=? and pwd=?';   
            var param = [req.body['email'],req.body['pwd']];   
            conn.query(userSql,param,function(err,rs){   
                if(err){   
                    //console.log('insert err:',err.message);   
                    res.send("数据库错误,错误原因:"+err.message);   
                    return;   
                }   
                console.log(rs);   
                //console.log(rs.length);   
                if(rs.length>0){ 
                	loginbean = new LoginBean();    
    				loginbean.id=rs[0].uid;    
    				loginbean.nicheng = rs[0].nicheng;
    				req.session.loginbean = loginbean;   
                        targeturl = req.body['targeturl'];
                    res.redirect(targeturl);  //跳转到index页面
                }else{   
                    res.send("email/密码错误");   
                }   
            });
          conn.release();
		});
	}
}

