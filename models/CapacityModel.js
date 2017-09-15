var connPool = require("./ConnPool");
var async= require('async')
module.exports= {
    capaList:function(req,res,loginbean,item){//根据header里面的分类查询
        pool = connPool();
        pool.getConnection(function (err, conn) {
            page = 1;
            if (req.query['page'] != undefined) {
                page = parseInt(req.query['page']);
            }
            pageSize = 5;//*************
            pointStart = (page - 1) * pageSize;
            count = 0;
            countPage = 0;
            var pointStart = (page - 1) * pageSize;
            var countSql = 'select count(*) AS count from question';
            listSql = 'select qid,title,looknum,renum,finished,updtime,createtime from question where typename=? order by looknum desc limit ?,? ';
            var param = [item,pointStart, pageSize];

            async.series({
                one: function (callback) {
                    conn.query(countSql, function (err, rs) {
                        count = rs[0]['count'];
                        countPage = Math.ceil(count / pageSize);
                        if (page > countPage) {
                            page = countPage;
                            pointStart = (page - 1) * pageSize;
                            param = [pointStart, pageSize];
                        }
                        callback(null, rs);
                    })
                },
                two: function (callback) {
                    conn.query(listSql, param, function (err, rs) {
                        callback(null, rs);
                    })
                }
            }, function (err, results) {
                rs = results['two'];
                res.render('capacity', {loginbean: loginbean, page: page, rs: rs, count: count, countPage: countPage});
                //res.send('查完');
            });

            conn.release();
        })
    },
    serList:function(req,res,loginbean,it){//根据header里面的分类查询
        pool = connPool();
        pool.getConnection(function (err, conn) {
            var countSql = 'select count(*) AS count from question';
            listSql = 'select qid,title,looknum,renum,finished,updtime,createtime from question where title order by qid desc limit ?,? ';
            var param = [it,pointStart, pageSize];

            async.series({
                one: function (callback) {
                    conn.query(countSql, function (err, rs) {
                        count = rs[0]['count'];
                        countPage = Math.ceil(count / pageSize);
                        if (page > countPage) {
                            page = countPage;
                            pointStart = (page - 1) * pageSize;
                            param = [pointStart, pageSize];
                        }
                        callback(null, rs);
                    })
                },
                two: function (callback) {
                    conn.query(listSql, param, function (err, rs) {
                        callback(null, rs);
                    })
                }
            }, function (err, results) {
                rs = results['two'];
                res.render('serach', {loginbean: loginbean, page: page, rs: rs, count: count, countPage: countPage});
                //res.send('查完');
            });

            conn.release();
        })
    },
}