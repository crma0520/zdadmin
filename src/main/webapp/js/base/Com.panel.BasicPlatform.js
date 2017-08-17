/**
 * 基础平台
 * @class Dgs.panel.BasicPlatform
 * @extends Ext.Panel
 */
Com.panel.BasicPlatform = Ext.extend(Ext.Panel,{
	menuPanel : null,
	contentPanel : null,
	constructor : function(){
		var self = this;
		self.initMenuPanel();
		self.initHomePage();
		self.initContentPanel();
		Com.panel.BasicPlatform.superclass.constructor.call(this, {
			layout : 'border',
			border : false,
			items : [self.menuPanel, self.contentPanel]
		});
	},
	initMenuPanel : function(){
		var self = this;
		self.menuPanel = new Com.panel.Menu(COM_FUNCCODE_BASICPLATFORM);
	},
	initHomePage : function(){
		var self = this;
		self.homePage = new Com.panel.BaseWelcome();
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