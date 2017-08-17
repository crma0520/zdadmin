//基础平台首页
Ext.define('Com.panel.BaseWelcome', {
	alias: 'widget.Com.panel.BaseWelcome',
	extend: 'Ext.Panel',
	constructor : function(config) {
		var self = this;
		self.initContentPanel();
		Com.panel.BaseWelcome.superclass.constructor.call(this,{
			title : LANGUAGE_PACKAGE['COM_WELCOME_FIRST_PAGE'],//'首页',
	        border : false,
	        autoScroll : true,
	        items: [self.contentPanel],
	        tbar : new Ext.toolbar.Toolbar({
				items : [{
					text : LANGUAGE_PACKAGE['COM_WELCOME_BUTTON_REFRESH'],//'刷新数据',
					handler : self.loadData,
					scope : self
				}]
			})
		});
	},
	loadData : function(){
		var self = this;
		//加载遮罩等待效果
		var myMask = new Ext.LoadMask({
		    msg : LANGUAGE_PACKAGE['COM_SYS_LOAD_DATA'],//'正在加载，请稍候...',
		    target : CONTAINER
		});
		myMask.show();
		setTimeout(function() {
			myMask.hide();
		}, 30 * 1000);
		var loadEnd = 0;
		self.store1.load({
			callback: function(records, operation, success) {
	        	var chart = new Dgs.pieChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_ONLINE_TERMINAL'],//'终端在线率',
	        		store : self.store1,
	        		xField : 'name',
	        		yField : 'value'
	        	});
	        	self.chart1.removeAll();
	        	self.chart1.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 2){
	        		myMask.hide();
	        	}
		    }
		});
		self.store2.load({
			callback: function(records, operation, success) {
	        	var chart = new Dgs.columnChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_TERMINAL_INFO'],//'终端版本信息',
	        		store : self.store2,
	        		xField : 'name',
	        		yField : 'value'
	        	});
	        	self.chart2.removeAll();
	        	self.chart2.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 2){
	        		myMask.hide();
	        	}
		    }
		});
	},
	initChart1 : function(){
		var self = this;
		
		self.store1 = new Ext.data.Store({
			 proxy: {
		        type: 'ajax',
		        url: 'sys/baseWelcom/getOnlineTerminal',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
		});

		var chart = new Dgs.pieChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_ONLINE_TERMINAL'],//'终端在线率',
    		store : self.store1,
    		xField : 'name',
    		yField : 'value'
    	});
		self.chart1 = new Ext.Panel({
			layout : 'fit',
			width : 400,
			height : 260
		});
    	self.chart1.add(chart);
	},
	initChart2 : function(){
		var self = this;
		
		self.store2 = new Ext.data.Store({
			 proxy: {
		        type: 'ajax',
		        url: 'sys/baseWelcom/getVersionCount',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
		});
		var chart = new Dgs.columnChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_TERMINAL_INFO'],//'终端版本信息',
    		store : self.store2,
    		xField : 'name',
    		yField : 'value'
    	});
		self.chart2 = new Ext.Panel({
			layout : 'fit',
			width : 600,
			height : 260
		});
	    self.chart2.add(chart);
	},
	initContentPanel : function(){
		var self = this;
		self.initChart1();
		self.initChart2();
		self.contentPanel = Ext.create('Ext.panel.Panel',{
			width : 1000,
			items : [{
				xtype:'container',
				layout:'hbox',
				items:[self.chart1,self.chart2]
			}]
		});
	}
});
