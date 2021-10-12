var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_connect');
var conn = mysql_odbc.init();
var passport = require('passport'); //passport 추가 
var NaverStrategy = require('passport-naver').Strategy;
var config_naver = require('../config/secret').naver;

router.get('/',function(req,res,next) {
	res.render('login',{title:"로그인"});
});


router.get('/naver',passport.authenticate('naver',null),function(req,res){
	console.log("/login/naver");
});

//처리 후 callback 처리 부분 성공/실패 시 리다이렉트 설정 
router.get('/naver/callback', passport.authenticate('naver', { 
	successRedirect: '/board/list', 
	failureRedirect: '/login'
	 }) 
);

passport.use(new NaverStrategy({
    clientID: config_naver.client_id,
    clientSecret: config_naver.client_secret,
    callbackURL: config_naver.callback_url
}, 
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

        var user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'naver',
            naver: profile._json
        };
        console.log("user=");
        console.log(user);
    	
        return done(null, profile);
    	});
	}
));

//failed to serialize user into session 에러 발생 시 아래의 내용을 추가 한다.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

module.exports = router;