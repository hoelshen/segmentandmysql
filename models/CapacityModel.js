var connPool = require("./ConnPool");
var async= require('async')
module.exports= {
    capaList:function(req,res,loginbean,item){//根据header里面的分类查询
        pool = connPool();
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log('select err:',err.message);
                res.send("获取连接错误,错误原因:" + err.message);
                console.log('ok');
                return;
            }
            page = 1;
            if (req.query['page'] != undefined) {
                page = parseInt(req.query['page']);
            }
            pageSize = 5;//*************
            pointStart = (page - 1) * pageSize;
            count = 0;
            countPage = 0;
            var pointStart = (page - 1) * pageSize;
           //countSql = "select count(typename) from question where typename='item'";
             //var countSql = "select typename,count(1) as count from question  where typename=item group by typename";
            //var countSql = "select typename,count(*) AS count from question group by typename";
            var countSql = "select count(*) as count,typename as item from question group by typename;";
            //var countSql = "SELECT COUNT(typename) AS count FROM question WHERE typename='item'";
            //console.log(countSql);
            var param = [item,pointStart, pageSize];
            //console.log(param);
            var  listSql = 'select * from question where typename = ? order by looknum desc limit ?,? ';
            async.series({
                one: function (callback) {
                    conn.query(countSql,[], function (err, rs) {
                        //console.log(JSON.stringify(rs));
                        count =rs[0]['count'];
                        console.log(count);
                        countPage = Math.ceil(count / pageSize);
                        if (page > countPage) {
                            page = countPage;
                            pointStart = (page - 1) * pageSize;
                            param = [pointStart, pageSize];
                        }
                        callback(null, rs);
                    });
                },
                two: function (callback) {
                    conn.query(listSql, param, function (err, rs) {
                         callback(null, rs);
                       //console.log(listSql);
                       //console.log(param);

                    })
                }
            }, function (err, results) {
                rs = results['two'];
                //console.log(results['one']);
                res.render('capacity', {loginbean: loginbean, page: page, rs: rs, count: count, countPage: countPage});
                //res.send('查完');
            });

            conn.release();
        })
    }

}