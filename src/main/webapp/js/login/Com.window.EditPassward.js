Com.window.EditPassward = Ext.extend(Ext.Window,{
	formPanel : null,
	constructor : function() {
		var self = this;
		self.initFormPanel();
		Com.window.EditPassward.superclass.constructor.call(this,{
			title : LANGUAGE_PACKAGE['DGS_SYS_EDIT_PASSWARD'],//'修改密码',
			width : 350,
			height : 200,
			modal : true,
			layout : 'fit',
			border : false,
			items : self.formPanel,
			buttonAlign : 'center',
			buttons : [{
				text : LANGUAGE_PACKAGE['DGS_BUTTON_ENSURE'],//'确定',
				handler : self.savePassward,
				//iconCls : 'btn_ok',
				scope : self
			},{
				text : LANGUAGE_PACKAGE['DGS_BUTTON_CANCEL'],//'取消',
				handler : self.close,
				//iconCls : 'btn_cancel',
				scope : self
			}]
		});
	},
	initFormPanel : function() {
		var self = this;
		self.formPanel = new Ext.form.Panel({
			bodyStyle : 'padding:20px 15px;',
			defaults : {
				labelAlign : 'right',
				xtype : 'textfield',
				allowBlank: false
			},
			items : [{
				name : 'oldPassword',
				fieldLabel : LANGUAGE_PACKAGE['DGS_SYS_OLD_PASSWARD'],
				inputType : 'password',
				listeners : {
					specialkey : function(value, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							self.savePassward();
						}
					}
				}
			},{
				name : 'password',
				fieldLabel : LANGUAGE_PACKAGE['DGS_SYS_NEW_PASSWARD'],
				inputType : 'password',
				listeners : {
					specialkey : function(value, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							self.savePassward();
						}
					}
				}
			},{
				name : 'rePassword',
				fieldLabel : LANGUAGE_PACKAGE['DGS_SYS_RE_PASSWARD'],
				inputType : 'password',
				listeners : {
					specialkey : function(value, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							self.savePassward();
						}
					}
				}
			}]
		});
	},
	savePassward : function() {
		var self = this;
		if(self.formPanel.form.isValid()) {
			var oldPassword = self.formPanel.form.findField('oldPassword').getValue();
			var password = self.formPanel.form.findField('password').getValue();
			var rePassword = self.formPanel.form.findField('rePassword').getValue();
			//比较旧密码是否与新密码一致
	  		if(password == oldPassword){
	  			Com.util.commAlert({message : LANGUAGE_PACKAGE['DGS_SYS_SAME_PASS']});
	           	self.formPanel.form.findField('password').focus();
	           	return false ;
	  		}
			//验证密码复杂度
			if(!Com.util.checkPass(password)){
				Com.util.commAlert({message : LANGUAGE_PACKAGE['DGS_SYS_SIMPLE_PASS']});
	           	self.formPanel.form.findField('password').focus();
	           	return false ;
	  		}
			//比较确认密码是否与新密码一致
	  		if(password != rePassword){
	  			Com.util.commAlert({message : LANGUAGE_PACKAGE['DGS_SYS_DIFFERENT_PASS']});
	           	self.formPanel.form.findField('rePassword').focus();
	           	return false ;
	  		}
	  		
			var params = {
				oldPassword : faultylabs.MD5(oldPassword),
				password : faultylabs.MD5(password)
			};
			//对于传参需要进行加密传输
			var passwordInfo = rc4(Str2Utf8(Ext.encode(params)), DGS_CONSTANTS_ENCRYPTEDKEY);
			Ext.Ajax.request({
				url : 'sys/changPassword',
				params : {
					passwordInfo : new Base64().encode(passwordInfo)
				},
				success : function(resp) {
					var responseText = resp.responseText;
					var data = Ext.decode(responseText);
					if(data.success){
						//修改成功
						Com.util.commAlert();
						self.close();
					}else{
						if(data.retcode == CONSTANTS_STATE_LOGIN_PWD_ERROR){//密码错误
							Com.util.commAlert({message : LANGUAGE_PACKAGE['DGS_SYS_LOGIN_STATE_PWD_ERROR']});
						}else{
							Com.util.commAlert({message : LANGUAGE_PACKAGE['DGS_SYS_SYSTEM_ERROR']});
						}
					}
				},
				failure : function(resp) {
					Com.util.commAlert({message : LANGUAGE_PACKAGE['DGS_SYS_SYSTEM_ERROR']});
				}
			});
		}
	}
});