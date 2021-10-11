var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_connect');
var conn = mysql_odbc.init();


router.get('/',function(req,res,next) {
	res.render('login',{title:"로그인"});
});

module.exports = router;