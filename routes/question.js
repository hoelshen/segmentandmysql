var express = require('express');  
var router = express.Router();  
var checkSession = require('../jsbean/CheckSession');
var questionModel = require('../models/QuestionModel');



    router.all('/ask', function(req, res)
    {
        loginbean = checkSession.check(req,res);
        if (!loginbean)
        { return;}
        subflag = req.body['subflag'];
        //console.log('ok');
        if(subflag==undefined){
            res.render('ask', {loginbean: loginbean});
            }else{
            //发提问
           // console.log('ok');
            questionModel.ask(req,res);
        }
    }),
    router.get('/detail', function(req, res)
    {
        //loginbean = req.session.loginbean;
        questionModel.queDetail(req,res);
        //res.render('queDetail',{loginbean:loginbean,rs:rs});
    }),
    router.post('/reply', function(req, res)
    {
        loginbean = checkSession.check(req,res);
        if (!loginbean)
        { return;};
        subflag = req.body['subflag'];
        if(subflag!=undefined){
           questionModel.reply(req,res)
        }else{
            res.send('请用表单提交');
        }
    }),

module.exports = router;
