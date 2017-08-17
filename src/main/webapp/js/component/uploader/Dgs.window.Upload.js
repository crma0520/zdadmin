/**
 * 上传文档
 * @class Dm.window.Upload
 * @extends Ext.Window
 */
Dgs.window.Upload = Ext.extend(Ext.Window,{
	uploadPanel : null,
	constructor : function(url,post_params){
		var self = this;
		self.initUploadPanel(url,post_params);
		Dgs.window.Upload.superclass.constructor.call(this,{
			title : LANGUAGE_PACKAGE['DGS_TERMINAL_IMPORT'],//"上传文档",
			resizable : false,
			bodyStyle : 'padding:5px;',
			maximizable : false,
			modal : true,
			width : 700,
			height : 500,
			autoScroll : true,
			constrain : true,
			border : false,
			closeAction : 'destroy',
			closable : true,
			collapsible : false,
			plain : true,
			layout : 'fit',
			items : [self.uploadPanel],
//			bbar : [{
//				xtype : 'label',
//				html : '<img src="image/common/help.png" /><font color="blue">'
//						+ LANGUAGE_PACKAGE['DM_UPLOAD_TIPS']//'重名的文档会进行自动重名纠正，如"test"文档，上传后更正为"test(1)"'
//						+ '</font>'
//			}],
			listeners : {
				'beforedestroy' : function() {
					self.uploadPanel.swfupload.destroy();
				},
				'close' : function(){
					//grid.loadData(null, 0);
				}
			}
		});
	},
	initUploadPanel : function(url,post_params){
		var self = this;
		self.uploadPanel = Ext.create('Ext.ux.uploadPanel.CommUploadPanel',{
		   	addFileBtnText : LANGUAGE_PACKAGE['DM_UPLOAD_SELECT'],//'选择文件',
		   	uploadBtnText : LANGUAGE_PACKAGE['DM_UPLOAD_SELECT_DOC'],//'上传',
		   	removeBtnText : LANGUAGE_PACKAGE['DM_UPLOAD_REMOVE'],//'移除所有',
		   	cancelBtnText : LANGUAGE_PACKAGE['DM_UPLOAD_CANCEL'],//'取消上传',
		   	file_size_limit : 2 * 1024,//MB
		   	upload_url : url,
		   	post_params : post_params
		});
	}
});

//获得当前的sessionId
function getSessionId(){
   	var c_name = 'JSESSIONID';
   	if(document.cookie.length > 0){
      	var c_start = document.cookie.indexOf(c_name + "=");
      	if(c_start != -1){ 
        	c_start = c_start + c_name.length + 1;
        	var c_end = document.cookie.indexOf(";",c_start);
        	if(c_end == -1) {
        		c_end = document.cookie.length;
        	}
        	return unescape(document.cookie.substring(c_start,c_end));
      	}
   	}
}