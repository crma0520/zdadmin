/**
 * 左侧功能树面板
 */
Ext.define('Com.panel.Menu', {
	alias: 'widget.Com.panel.Menu',
	extend: 'Ext.Panel',
	panels : [],
	constructor : function(systemCode){
		var self = this;
		self.panels = [];
		self.initPanel(systemCode);
		Com.panel.Menu.superclass.constructor.call(this, {
			region : 'west',
			width : 200,
			title : LANGUAGE_PACKAGE['COM_SYS_MENU'],//'功能菜单',
			border : false,
			collapsible : true,
			layout : 'accordion',
			items: self.panels,
			split : true
		})
	},
	initPanel : function(systemCode){
		var self = this;
		//触发请求，请求后台返回具有的权限
		Ext.Ajax.request({
			url : 'sys/module/getModuleTree',
			params : {
				sysCode : systemCode
			},
			method:'Post',
			async : false,
			success : function(resp) {
				var responseText = resp.responseText;
				var data = Ext.decode(responseText);
				if(data.success){
					var moduleTrees = data.moduleTree;
					for(var i=0; i<moduleTrees.length; i++){
						var moduleTree = moduleTrees[i];
						var panel = new Ext.tree.Panel({
							title : moduleTree.text,
							border : false,
							overflowX : 'hidden',
							overflowY : 'auto',
							rootVisible : false,
							store : new Ext.data.TreeStore({
								root : {
							        expanded: true,
							        children: moduleTree.children
							    }
							}),
							listeners : {
								rowclick : function( view, record, tr, rowIndex, e, eOpts) {
									self.addTab(record);
								}
							}
						});
						self.panels.push(panel);
					}
				}else{
					Com.util.commAlert({message : LANGUAGE_PACKAGE['COM_SYS_SYSTEM_ERROR']});
				}
			},
			failure : function(resp) {
				Com.util.commAlert({message : LANGUAGE_PACKAGE['COM_SYS_SYSTEM_ERROR']});
			}
		});
	},
	addTab : function(node){
		var self = this;
		var tab = self.ownerCt.contentPanel.getComponent('tab' + node.id);
		if (node.isLeaf() && !tab) {
			tab = self.ownerCt.contentPanel.add({
				id : 'tab' + node.id,
				title : node.data.text,
				closable : true,
				layout : 'fit',
				border : false,
				items : [ {
					'xtype' : node.data.url,
					'funcCodes' : node.data.funcCodes
				} ]
			});
		}
		if(tab) {
			self.ownerCt.contentPanel.setActiveTab(tab);
		}
	}
});