Com.panel.Login=Ext.extend(Ext.Panel,{
	pageName : null,//登录成功后跳转的页面
	constructor : function(){
		var self = this;
		Com.panel.Login.superclass.constructor.call(this,{
			border : false,
			html :'<div class="l-box-container">' +
				  	'<div class="l-box-middleBg">'+
		  		  		'<div class="middle-layout l-box-Systemname"></div>' +
		  		   		'<div class="middle-layout l-box-middle">' +
		  		  			 '<div class="l-box-login">' +
		           				'<div class="l-box-login-title yahei">'+LANGUAGE_PACKAGE['COM_SYS_LOGIN']+'</div>' +
		           				'<div class="l-box-login-inputbox"><input id="dlm" type="text" class="input_text" /></div>' +
		           				'<div class="l-box-login-inputbox"><input id="mm" type="password" class="input_text"/></div>' +
		           				'<div class="l-box-login-inputbox"><input id="validateId" type="text" class="input_validateCode_text"/><a href="#" id="aa"><img id="validateCodeImg" title="点击更换" alt="点击更换" src="authCode" /></a></div>' +
		           				'<div class="l-box-login-btnbox">' +
		          					 '<b class="btn_blue" id="btnLogin"><span class="span-login">'+LANGUAGE_PACKAGE['COM_SYS_LOGIN_BUTTON']+'</span></b>' +
		          				 '</div>' +
		           				//'<div class="l-box-login-version"><span class="buletext">DGS V1.0</span></div>' +
		           				'<div><b><span id="info"></span></b></div>' +
		  		   			 '</div>' +
		  		   		'</div>'+
		  		   		'<div class="clientBar">'+
		  		   			/*'<a href=""><img src="image/system/windows.png" width="60"></a>'+
		  		   			'<span style="margin: 0 30px;"></span>' +*/
		  		   			'<a target="_blank">' +
			  		   			'<img src="image/system/IOS.png" >' +
			  		   			'<div class="chatTips">' +
									'<img src="image/system/iosCode.png" style="width:120px;height:120px;">'+
								'</div>'+
		  		   			'</a>'+
		  		   			'<span style="margin: 0 30px;"></span>' +
		  		   			'<a target="_blank">' +
		  		   				'<img src="image/system/Android.png" >' +
		  		   				'<div class="chatTips">' +
									'<img src="image/system/androidCode.png" style="width:120px;height:120px;">'+
								'</div>'+
		  		   			'</a>'+
		  		   			/*'<span style="margin: 0 30px;"></span>' +
		  		   			'<a href=""><img src="image/system/Linux.png" width="60"></a>'+
		  		   			'<span style="margin: 0 30px;"></span>' +
		  		   			'<a href=""><img src="image/system/mac.png" width="60"></a>'+*/
		  		   		'</div><br/>'+
		  		   		'<div class="middle-layout l-box-bottom yahei">'+LANGUAGE_PACKAGE['COM_SYS_COMPANY'] + ' ' + VERSION+'</div>' +
		  		   	'</div>' +
		  		  '</div>',
		  	listeners : {
		  		afterlayout : {
		  			single : true,
		  			fn : function() {
		  				Ext.get('btnLogin').on('click',function() {
	  					    self.login();
		  				},self);
		  				Ext.get('dlm').focus();
		  				Ext.get('dlm').on('keypress',function(e) {
		  					var ev = document.all ? window.event : e;
	  					    if(ev.keyCode == 13) {               
	  					    	self.login();
	  					    }
		  				},self);
		  				Ext.get('mm').on('keypress',function(e) {
		  					var ev = document.all ? window.event : e;
	  					    if(ev.keyCode == 13) {               
	  					    	self.login();
	  					    }
		  				},self);
		  				Ext.get('validateId').on('keypress',function(e) {
		  					var ev = document.all ? window.event : e;
	  					    if(ev.keyCode == 13) {               
	  					    	self.login();
	  					    }
		  				},self);
		  				Ext.get('aa').on('click',function(e) {
		  					self.refreshCode();
		  				},self);
		  			}
		  		}
		  	}
		})
	},
	refreshCode : function(){
		document.getElementById("validateCodeImg").src = "authCode?"+Math.random();
	},
	login:function(){
		var self = this;
		Ext.get("info").dom.innerHTML = '';
		var account = Ext.get('dlm').getValue();
		var password = Ext.get('mm').getValue();
		var authCode = Ext.get('validateId').getValue();
		if(account == '' || account == null) {
			Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_TIPS_USERNAME'];
			return;
		}
		if(password == '' || password == null) {
			Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_TIPS_PASSWORD'];
			return;
		}
		if(authCode == '' || authCode == null) {
			Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_TIPS_VALIDATE'];
			return;
		}
		var params = {
			account : account,
			password : faultylabs.MD5(password),   // md5加密
			validateCode : authCode
		};
		//对于传参需要进行加密传输
		var userInfo = rc4(Str2Utf8(Ext.encode(params)), COM_CONSTANTS_ENCRYPTEDKEY);
		var myMask  = new Ext.LoadMask({
			msg : LANGUAGE_PACKAGE['COM_SYS_QUERY_DATA'],//'正在请求数据，请稍候...',
    		target : self
		});
		myMask.show();
		Ext.Ajax.request({
			url : 'sys/login',
			method : 'POST',
			sync : true,
			params : Ext.util.JSON.encode({login : new Base64().encode(userInfo)}),
			headers : {'Content-Type':'application/json;charset=utf-8'},
			success : function(resp){
				var responseText = resp.responseText;
				var data = Ext.decode(responseText);
				if(data.success){
					window.location.href = CONTEXTPATH + "/main";
				}else{
					myMask.hide();
					if(data.retcode == CONSTANTS_STATE_LOGIN_LOCK){//账号锁定
						Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_LOGIN_STATE_LOCK'];
					}else if(data.retcode == CONSTANTS_STATE_LOGIN_LOGOUT){//账号注销
						Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_LOGIN_STATE_LOGOUT'];
					}else if(data.retcode == CONSTANTS_STATE_LOGIN_OVERDUE){//账号过期
						Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_LOGIN_STATE_OVERDUE'];
					}else if(data.retcode == CONSTANTS_STATE_LOGIN_PWD_ERROR){//密码错误
						Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_LOGIN_STATE_PWD_ERROR'];
					}else if(data.retcode == CONSTANTS_STATE_LOGIN_NO_ANTHORITY){//没有权限登录
						Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_LOGIN_NO_ANTHORITY'];
					}else if(data.retcode == CONSTANTS_STATE_LOGIN_NOT_EXIST){//用户名或者密码不存在
						Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_LOGIN_STATE_NOT_EXIT'];
					}else if(data.retcode == CONSTANTS_STATE_LOGIN_VALIDATE_ERROR){//验证码错误
						Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_LOGIN_STATE_VALIDATE_ERROR'];
					}else if(data.retcode == CONSTANTS_STATE_LOGIN_PASSWORD_COUNT_ERROR){//密码输错超过5次
						Ext.get("info").dom.innerHTML = LANGUAGE_PACKAGE['COM_SYS_LOGIN_STATE_PASSWORD_COUNT_ERROR'];
					}else{//系统错误
						Com.util.commAlert({message : LANGUAGE_PACKAGE['COM_SYS_SYSTEM_ERROR']});
					}
				}
			},
			failure : function(resp) {
				myMask.hide();
				Com.util.commAlert({message : LANGUAGE_PACKAGE['COM_SYS_SYSTEM_ERROR']});
			}
			
		})
	}
})