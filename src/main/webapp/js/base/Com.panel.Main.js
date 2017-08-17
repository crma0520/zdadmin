/**
 * ZD后台登陆主页面
 * @class Com.panel.Main
 * @extends Ext.Panel
 */
Com.panel.Main = Ext.extend(Ext.Panel,{
	centerPanel : null,
	headerPanel : null,
	footerPanel : null,
	welcomePanel : null,//欢迎页面
	basicPanel : null,//基础平台
	constructor : function() {
		var self = this;
		self.init();
		//self.initCenterPanel();
		self.initFooterPanel();
		Com.panel.Main.superclass.constructor.call(this,{
	        layout : 'border',
	        border : false,
	        items: [self.headerPanel,self.centerPanel,self.footerPanel]
		});
	},
	init : function(){
		var self = this;
		var userName = USER.account;
		//触发请求，请求后台返回具有的权限的子系统
		Ext.Ajax.request({
			url : 'sys/module/getChildrenSystem',
			method : 'Post',
			async : false,
			success : function(resp) {
				var responseText = resp.responseText;
				var data = Ext.decode(responseText);
				if(data.success){
					var sysCode = data.sysCode;
					self.initHeaderPanel(sysCode);
					self.initCenterPanel(sysCode);
				}else{
					Com.util.commAlert({message : LANGUAGE_PACKAGE['COM_SYS_SYSTEM_ERROR']});
				}
			},
			failure : function(resp) {
				Com.util.commAlert({message : LANGUAGE_PACKAGE['COM_SYS_SYSTEM_ERROR']});
			}
		});
	},
	initHeaderPanel : function(code){
		var self = this;
		var userName = USER.fullName;
		self.headerPanel = new Ext.Panel({
			region : 'north',
			height : 70, 
			border : false,
			html : '<div class="head">' 
					//+ '<div class="System_Name yahei"></div>' 
					+ '<div class="headright"></div>' 
					+ '<div class="quick_nav">' 
					+ '<ul>'
					+ '<li id="basicPlatform" ' 
					+ (code.indexOf(DGS_FUNCCODE_BASICPLATFORM)<0 ? 'style="display:none;"' : '') 
					+ '><a id="basicPlatform_a" href="#">'+LANGUAGE_PACKAGE['COM_SYS_BASICPLAT']+'</a></li>' //基础平台
					+ '<li id="productManagement" ' 
					+ (code.indexOf(DGS_FUNCCODE_DOCMANAGE)<0 ? 'style="display:none;"' : '') //isDM必须是1，且有权限码才显示
					+ '><a id="productManagement_a" href="#">'+LANGUAGE_PACKAGE['COM_SYS_DOCMANAGE']+'</a></li>' //文档库管理
					+ '</ul></div>'
					+ '<div class="quick_right">' 
					+ '<ul>'
					+ '<li class="user_name">'+LANGUAGE_PACKAGE['COM_SYS_HELLO']+ userName +'</li>'//用户名
					+ '<li><a id="editPassward" href="#">'+LANGUAGE_PACKAGE['COM_SYS_EDIT_PASSWARD']+'</a></li>' //修改密码
					+ '<li><a id="quit" href="#">'+LANGUAGE_PACKAGE['COM_SYS_QUIT']+'</a></li>' //退出系统
					+ '</ul></div>'
					+ '</div>',
			listeners : {
		  		afterrender: function(){
	  				Ext.get('basicPlatform').on('click',function() {
  					    self.basicPlatform();
	  				},self);
	  				Ext.get('productManagement').on('click',function() {
  					    self.productManagement();
	  				},self);
	  				Ext.get('editPassward').on('click',function() {
  					    self.editPassward();
	  				},self);
	  				Ext.get('quit').on('click',function() {
  					    self.quit();
	  				},self);
		  		}
		  	}
		});
	},
	initFooterPanel : function() {
		var self = this;
		self.footerPanel = new Ext.Panel({
			region : 'south',
			height : 20,
			border : false,
			html : '<div class="footer">'
				   + LANGUAGE_PACKAGE['COM_SYS_COMPANY'] + ' ' + VERSION
				   +'</div>'
		});
	},
	initCenterPanel : function(code){
		var self = this;
		
		self.welcomePanel = new Ext.Panel({
			html : '<div class="welcome"></div>'
		});
		var item = [self.welcomePanel];
		if(code.indexOf(DGS_FUNCCODE_BASICPLATFORM) >= 0){
			self.basicPanel = new Com.panel.BasicPlatform();
			item.push(self.basicPanel);
		}
		//isDM必须是1，且有权限码，说明有文档库管理子系统
		if(code.indexOf(DGS_FUNCCODE_DOCMANAGE)>= 0){
			self.productManagePanel = new Com.panel.ProductManage();
			item.push(self.productManagePanel);
		}
		
		self.centerPanel = new Ext.Panel({
			region : 'center',
			layout : 'card',
			activeItem : 0,
			floatable:false,
			titleCollapse:true,
			border : false,
			items : item
		});
	},
	activeCard : function(currentPanel,id){
		var self = this;
		currentPanel.homePage.loadData();
		self.centerPanel.layout.setActiveItem(currentPanel.id);
		Ext.select('li').removeCls('btnselect');
		Ext.get(id).addCls('btnselect');
		//移除其他页面的tab
		self.centerPanel.items.each(function(panel) {
			if(panel.id != currentPanel.id) {
				var tabPanel = panel.contentPanel;
				if(tabPanel != null){
					tabPanel.items.each(function(item) {
						if(item.closable) {
							tabPanel.remove(item);
						}
					});
				}
			}
		});
	},
	basicPlatform : function(){
		var self = this;
		self.activeCard(self.basicPanel,'basicPlatform');
	},
	productManagement : function(){
		var self = this;
		self.activeCard(self.productManagePanel,'productManagement');
	},
	editPassward : function(){
		var self = this;
		var win = new Com.window.EditPassward();
		win.show();
	},
	quit : function(){
		Ext.Msg.confirm(LANGUAGE_PACKAGE['DGS_COMM_TIPS'],LANGUAGE_PACKAGE['COM_SYS_QUIT_SYSTEM'],function(btn) {
			if(btn == 'yes') {
				//请求后台，清空session中当前登录人的信息
				Ext.Ajax.request({
					url : 'sys/logout',
					success : function(resp) {
						var responseText = resp.responseText;
						var data = Ext.decode(responseText);
						if(data.success){
							//清除成功，返回登录页面
							window.location.href = CONTEXTPATH;
						}else{
							Com.util.commAlert({message : LANGUAGE_PACKAGE['COM_SYS_SYSTEM_ERROR']});
						}
					},
					failure : function(resp) {
						Com.util.commAlert({message : LANGUAGE_PACKAGE['COM_SYS_SYSTEM_ERROR']});
					}
				});
			}
		});
	}
});