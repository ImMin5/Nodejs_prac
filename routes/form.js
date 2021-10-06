var express = require('express') //express 인스턴스 사용
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('form',{
		name: 'Minho Kim',
		title:'Form 테스트'});
});

router.post('/',function(req,res,next){
	res.json(req.body);
});

module.exports = router
