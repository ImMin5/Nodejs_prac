var express = require('express')
var router = express.Router();

var mysql_odbc = require('../db/db_connect');
var conn = mysql_odbc.init;


/*
var mysql = require('mysql');
router.get('/',function(req,res,next){
	// 데이터 베이스 접속정보 입력
	var connection = mysql.createConnection({
		host : 'localhost',
		port : 3306,
		user : 'root',
		password : 'password1234',
		database : 'nodedb',
	});
	//데이터베이스 접속시도
	connection.connect(function(err) {
		//에러발생시
		if(err){
			res.render('mysql',{connect :'연결실패',err:err});
			console.error(err);
			throw err;
		}
		else {
			res.render('mysql',{connect:'연결성공',err:'없음'});
		}
	});
	connection.end();
});
*/
module.exports = router

