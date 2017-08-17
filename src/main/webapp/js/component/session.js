/**
 * 所有ajax请求带入当前登陆人id
 */
Ext.Ajax.on('beforerequest',function(conn, options, eOpts){
	if(USER){
		conn.setExtraParams({userId : USER.id});
	}
}, this);

Ext.Ajax.on('requestcomplete',function(conn,response,options){
	//Ext重新封装了response对象
	if(response.responseText != undefined && response.responseText != ''){
		//responseText不为空，说明请求返回正常
		//response没有getResponseHeader方法，不处理session超时
	}else{
		var url = window.location.href;
	    url = url.substring(0,url.lastIndexOf('/'));
		if(response.responseText == undefined){   
			Ext.Msg.alert(LANGUAGE_PACKAGE['DGS_COMM_TIPS'], 
				LANGUAGE_PACKAGE['DGS_COMM_TIMEOUT']/*'会话超时，请重新登录!'*/, 
				function(){  
		            window.location.href = url + '?pageName=' + USER.pageName;    
		        }
	        );     
	        return;
		}
		if(response.getResponseHeader("sessionstatus") == 'timeout'){
			Ext.Msg.alert(LANGUAGE_PACKAGE['DGS_COMM_TIPS'], 
				LANGUAGE_PACKAGE['DGS_COMM_TIMEOUT']/*'会话超时，请重新登录!'*/, 
				function(){  
		            window.location.href = url + '?pageName=' + USER.pageName;    
		        }
	        );     
	        return;
		}
		if(response.getResponseHeader("hasSession") == 'yes'){
			Ext.Msg.alert(LANGUAGE_PACKAGE['DGS_COMM_TIPS'], 
				LANGUAGE_PACKAGE['DGS_COMM_HAS_SESSION']/*'已有其他用户登录，请重新登录!'*/, 
				function(){  
		            window.location.href = url + '?pageName=' + USER.pageName;    
		        }
	        );     
	        return;
		}
	}
}, this);


