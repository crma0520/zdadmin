//产品管理首页
Ext.define('Com.panel.ProductManageWelcome', {
	alias: 'widget.Com.panel.ProductManageWelcome',
	extend: 'Ext.Panel',
	constructor : function(config) {
		var self = this;
		self.initContentPanel();
		Com.panel.ProductManageWelcome.superclass.constructor.call(this,{
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
	        	var chart = new Dgs.columnChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_FOLDER_TYPE'],//'文件夹类型的文件量',
	        		store : self.store1,
	        		xField : 'name',
	        		yField : 'value'
	        	});
	        	self.chart1.removeAll();
	        	self.chart1.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 7){
	        		myMask.hide();
	        	}
		    }
		});
		self.store2.load({
			callback: function(records, operation, success) {
	        	var chart = new Dgs.columnChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_DOC_TYPE'],//'文件类型的文件量',
	        		store : self.store2,
	        		xField : 'name',
	        		yField : 'value'
	        	});
	        	self.chart2.removeAll();
	        	self.chart2.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 7){
	        		myMask.hide();
	        	}
		    }
		});
		self.store3.load({
			callback: function(records, operation, success) {
	        	var chart = new Dgs.columnChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_USER_UPLOAD'],//'用户上传量',
	        		store : self.store3,
	        		xField : 'name',
	        		yField : 'value'
	        	});
	        	self.chart3.removeAll();
	        	self.chart3.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 7){
	        		myMask.hide();
	        	}
		    }
		});
		self.store4.load({
			callback: function(records, operation, success) {
	        	var chart = new Dgs.columnChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_DOC_DOWNLOAD'],//'文件下载量',
	        		store : self.store4,
	        		xField : 'name',
	        		yField : 'value'
	        	});
	        	self.chart4.removeAll();
	        	self.chart4.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 7){
	        		myMask.hide();
	        	}
		    }
		});
		self.store5.load({
			callback: function(records, operation, success) {
	        	var chart = new Dgs.columnChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_DOC_PREVIEW'],//'文件预览量',
	        		store : self.store5,
	        		xField : 'name',
	        		yField : 'value'
	        	});
	        	self.chart5.removeAll();
	        	self.chart5.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 7){
	        		myMask.hide();
	        	}
		    }
		});
		self.store6.load({
			callback: function(records, operation, success) {
	        	var chart = new Dgs.lineChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_CLASSIC_DOCUMENT'],//'文件库文件量',
	        		store : self.store6,
	        		xField : 'name',
	        		yField : ['value','size'],
	        		legend : [LANGUAGE_PACKAGE['COM_WELCOME_LEGEND_DOC_COUNT']/*'文件量(个)'*/,
	        					LANGUAGE_PACKAGE['COM_WELCOME_LEGEND_DOC_SIZE']/*'文件大小(M)'*/],
	        		position : ['left','right']
	        	});
	        	self.chart6.removeAll();
	        	self.chart6.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 7){
	        		myMask.hide();
	        	}
		    }
		});
		self.store7.load({
			callback: function(records, operation, success) {
	        	var chart = new Dgs.columnChart({
	        		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_SECURITY'],//'密级文件量',
	        		store : self.store7,
	        		xField : 'name',
	        		yField : 'value'
	        	});
	        	self.chart7.removeAll();
	        	self.chart7.add(chart);
	        	loadEnd++;
	        	if(loadEnd == 7){
	        		myMask.hide();
	        	}
		    }
		});
	},
	//文件夹类型的文件量
	initChart1 : function(){
		var self = this;
		self.store1 = new Ext.data.Store({
			 proxy: {
		        type: 'ajax',
		        url: 'dm/welcome/getFolderTypeCount',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
		});
		var chart = new Dgs.columnChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_FOLDER_TYPE'],//'文件夹类型的文件量',
    		store : self.store1,
    		xField : 'name',
    		yField : 'value'
    	});
		self.chart1 = new Ext.Panel({
			layout : 'fit',
			width : 460,
			height : 260
		});
    	self.chart1.add(chart);
	},
	//文件类型的文件量
	initChart2 : function(){
		var self = this;
		
		self.store2 = new Ext.data.Store({
			 proxy: {
		        type: 'ajax',
		        url: 'dm/welcome/getDocTypeCount',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
		});
		var chart = new Dgs.columnChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_DOC_TYPE'],//'文件类型的文件量',
    		store : self.store2,
    		xField : 'name',
    		yField : 'value'
    	});
		self.chart2 = new Ext.Panel({
			layout : 'fit',
			width : 460,
			height : 260
		});
    	self.chart2.add(chart);
	},
	//用户上传量
	initChart3 : function(){
		var self = this;
		
		self.store3 = new Ext.data.Store({
			 proxy: {
		        type: 'ajax',
		        url: 'dm/welcome/getUserUploadCount',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
		});
		var chart = new Dgs.columnChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_USER_UPLOAD'],//'用户上传量',
    		store : self.store3,
    		xField : 'name',
    		yField : 'value'
    	});
		self.chart3 = new Ext.Panel({
			layout : 'fit',
			width : 420,
			height : 260
		});
    	self.chart3.add(chart);
	},
	//文件下载量
	initChart4 : function(){
		var self = this;
		
		self.store4 = Ext.create('Ext.data.JsonStore', {
			 proxy: {
		        type: 'ajax',
		        url: 'dm/welcome/getdownloadCount',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
		});
		var chart = new Dgs.columnChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_DOC_DOWNLOAD'],//'文件下载量',
    		store : self.store4,
    		xField : 'name',
    		yField : 'value'
    	});
		self.chart4 = new Ext.Panel({
			layout : 'fit',
			width : 395,
			height : 260
		});
    	self.chart4.add(chart);
	},
	//文件预览量
	initChart5 : function(){
		var self = this;
		
		self.store5 = Ext.create('Ext.data.JsonStore', {
			 proxy: {
		        type: 'ajax',
		        url: 'dm/welcome/getPerviewCount',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
		});
		var chart = new Dgs.columnChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_DOC_PREVIEW'],//'文件预览量',
    		store : self.store5,
    		xField : 'name',
    		yField : 'value'
    	});
		self.chart5 = new Ext.Panel({
			layout : 'fit',
			width : 395,
			height : 260
		});
    	self.chart5.add(chart);
	},
	//文件库文件量
	initChart6 : function(){
		var self = this;
		
		self.store6 = Ext.create('Ext.data.JsonStore', {
			 proxy: {
		        type: 'ajax',
		        url: 'dm/welcome/getDocmentCount',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
		});
		var chart = new Dgs.lineChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_CLASSIC_DOCUMENT'],//'文件库文件量',
    		store : self.store6,
    		xField : 'name',
    		yField : ['value','size'],
    		legend : [LANGUAGE_PACKAGE['COM_WELCOME_LEGEND_DOC_COUNT']/*'文件量(个)'*/,
    					LANGUAGE_PACKAGE['COM_WELCOME_LEGEND_DOC_SIZE']/*'文件大小(M)'*/],
    		position : ['left','right']
    	});
		self.chart6 = new Ext.Panel({
			layout : 'fit',
			width : 1200,
			height : 260
		});
    	self.chart6.add(chart);
	},
	//密级文件量
	initChart7 : function(){
		var self = this;
		
		self.store7 = Ext.create('Ext.data.JsonStore', {
            proxy: {
		        type: 'ajax',
		        url: 'dm/welcome/getSecurityLevelCount',
				reader: {
				    type: 'json',
					rootProperty : 'list'
				}
		     },
		     fields: []
        });
		var chart = new Dgs.columnChart({
    		title : LANGUAGE_PACKAGE['COM_WELCOME_TITLE_SECURITY'],//'密级文件量',
    		store : self.store7,
    		xField : 'name',
    		yField : 'value'
    	});
		self.chart7 = new Ext.Panel({
			layout : 'fit',
			width : 270,
			height : 260
		});
    	self.chart7.add(chart);
	},
	initContentPanel : function(){
		var self = this;
		self.initChart1();
		self.initChart2();
		self.initChart3();
		self.initChart4();
		self.initChart5();
		self.initChart6();
		self.initChart7();
		self.contentPanel = Ext.create('Ext.panel.Panel',{
			width : 1200,
			items : [{
				xtype:'container',
				layout:'hbox',
				items:[self.chart1,self.chart2,self.chart7]
			},{
				xtype:'container',
				layout:'hbox',
				items:[self.chart3,self.chart4,self.chart5]
			},{
				xtype:'container',
				layout:'hbox',
				items:[self.chart6]
			}]
		});
	}
});
