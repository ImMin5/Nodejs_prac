var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_connect');
var conn = mysql_odbc.init();

router.get('/list/:page', function(req,res,next){
	var page = req.params.page;
	var sql = "select idx,name,title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate,"+
	" date_format(regdate,'%Y-%m-%d %H:%i:%s')regdate from board";

	conn.query(sql, function(err, rows){
		if(err) console.error("err"+err);
		res.render('list',{title:'게시판 리스트', rows:rows});
	});
});

router.get('/list',function(req,res,next) {
	res.redirect('/board/list/1');
});

//글쓰기 페이지
router.get('/write',function(req,res,next) {
	res.render('write',{title : "게시판 글쓰기"});
})

//글쓰기 버튼 클릭시
router.post('/write',function(req,res,next){
	var name = req.body.name;
	var title = req.body.title;
	var content = req.body.content;
	var datas = [name,title,content];

	var sql = "insert into board(name,title,content,regdate,modidate,hit) values(?,?,?,now(),now(),0)";
	conn.query(sql,datas,function(err,row){
		if(err)console.err("err :" +err);
		res.redirect('/board/list');
	});
});
 
//글읽기 
router.get('/read/:idx',function(req,res,next){
	var idx = req.params.idx;
	var sql = "select idx,name,title,content, hit,date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate,"+
	" date_format(regdate,'%Y-%m-%d %H:%i:%s')regdate from board where idx=?";
	conn.query(sql,[idx],function(err,row){
		if(err)console.err(err);
		res.render('read',{title : "글 상세",row:row[0]});
	});
});

module.exports = router;