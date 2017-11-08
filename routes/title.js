var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var util = require('util');
var server = require('http').createServer(router);
var io = require('socket.io')(server);
var socket = require('../models/SocketIoServer');
var checkSession = require('../jsbean/CheckSession');
var questionModel = require('../models/QuestionModel');
var multer = require("multer");

var connPool = require("../models/ConnPool");
var async = require('async');


multiparty = require('multiparty'),
    util = require('util'),
    fs = require('fs');

const UPLOADPATH = "./freedom/upload/";




    router.post('/seek',function(req,res){
        loginbean = checkSession.check(req,res);
        if (!loginbean)
        { return;};
            keyword = req.query['keyword'];
        // console.log('ok');
            questionModel.seekList(req,res);

    }),

    router.get('/article.html',function(req,res,next){
        res.render('localhost:8421');
    });


    router.get('/classroom',function(req,res,next){
        res.render('classroom');
    });


    router.get('/chat',function(req,res,next){
        res.render('chat');
    });
    //
    // router.post('"http://localhost:3000/?nick"+nick',function(req,res,next){
    //     res.render('client');
    // })


module.exports = router;
