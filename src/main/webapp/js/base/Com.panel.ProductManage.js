/**
 * 产品管理
 * @class Com.panel.ProductManage
 * @extends Ext.Panel
 */
Com.panel.ProductManage = Ext.extend(Ext.Panel,{
	menuPanel : null,
	contentPanel : null,
	constructor : function(){
		var self = this;
		self.initMenuPanel();
		self.initHomePage();
		self.initContentPanel();
		Com.panel.ProductManage.superclass.constructor.call(this, {
			layout : 'border',
			border : false,
			items : [self.menuPanel, self.contentPanel]
		});
	},
	initMenuPanel : function(){
		var self = this;
		self.menuPanel = new Com.panel.Menu(COM_FUNCCODE_DOCMANAGE);
	},
	initHomePage : function(){
		var self = this;
		self.homePage = new Com.panel.ProductManageWelcome();
	},
	initContentPanel : function(){
		var self = this;
		self.contentPanel = new Ext.tab.Panel({
			border : false,
			region : 'center',
			enableTabScroll : true,
			activeTab : 0,
			plugins : [new Ext.ux.TabCloseMenu()]
		});
		var tab = self.contentPanel.add(self.homePage);
		self.contentPanel.setActiveTab(tab);
	}
});