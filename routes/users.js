var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');



/* GET users listing. */

//  /login 页面 GET 请求

router.all('/login', function (req, res) {
	subflag=req.body['subflag'];
	if (subflag==undefined) 
	{
		res.render('login');
	}else{
		userModel.login(req,res);
	}
});

router.post('/zhuce', function (req, res) {
    nicheng= req.body['nicheng'];
    console.log("post:"+nicheng);
   	userModel.zhuce(req,res)
    //res.send('注册');
});



module.exports = router;
