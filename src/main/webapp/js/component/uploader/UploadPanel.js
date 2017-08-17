/**
 * 多文件上传组件 
 */
Ext.define('Ext.ux.uploadPanel.UploadPanel', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.uploadpanel',
	/*width: 700,
	height: 300,*/
	columnLines : true, // 加上表格线
	plugins: [
		Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})
	],
	store: Ext.create('Ext.data.JsonStore', {
		autoLoad: false,
		fields: ['id', 'name', 'type', 'size', 'percent', 'status', 'fileName', 'securityClassification']
	}),
	addFileBtnText: 'Add File',
	uploadBtnText: 'Upload',
	removeBtnText: 'Remove All',
	cancelBtnText: 'Cancel',
	debug: false,
	file_size_limit: 100,//MB						//如果想在前台设置属性，可以将这些参数名称在前台写出并赋值。单位是兆。未验证KB，请自行修改
	file_types: '*.*',								//同样的道理，在前台js代码中，设置这个参数，否则默认'All Files',设置格式例如：	"*.pdf;*.doc;*.jpg" 格式间用分号隔开
	file_types_description: 'All Files',			//该参数未查明用途，当前仍然是源代码，设置文件格式，上边的参数即可
	file_upload_limit: 50,							//文件个数限制，也可以在Upload.js写明
	file_queue_limit: 0,
	post_params: { /*"UpLoad": "UpLoadGrid_RM"*/ },		//如果写了UpLoad作为Key，代码会给value后边强制加入   ,Submit Query  字符串，原因不明(详见后台程序)，默认没有参数的话，就写 {}
	upload_url: 'dm/document/upload',							//这个是默认的上传路径(后台相应的文件路径)，如果前台没有设置，就是这个了
	flash_url: "js/component/uploader/swfupload/swfupload.swf",			//根据实际情况，改变引用路径
	flash9_url: "js/component/uploader/swfupload/swfupload_fp9.swf",	//特注明：flash的兼容性并非100%，测试时候用的是16版本，已通过验证，未测试其他版本的兼容性
	initComponent: function () {
		this.securityClassificationStore = new Ext.data.Store({
			proxy: {
		        type: 'ajax',
				url: 'sys/datadictionary/getUserSecurity?securityClassification=' + (USER.securityClassification==null || USER.securityClassification == '' ? 0 : USER.securityClassification),
				reader: {
				    type: 'json',
				    rootProperty : 'list'
				}
		    },
		    autoLoad : true,
		    pageSize : 0,
		    fields:[]
		});
		this.columns = [
			{ xtype: 'rownumberer' },
			{ text: LANGUAGE_PACKAGE['DM_UPLOAD_DOC_NAME']/*'文件名'*/, width: 160, dataIndex: 'name' },
			//{ text: '自定义文件名', width: 130, dataIndex: 'fileName', editor: { xtype: 'textfield' } },
			{ text: LANGUAGE_PACKAGE['DM_UPLOAD_TYPE']/*'类型'*/, width: 70, dataIndex: 'type' },
			{ text: LANGUAGE_PACKAGE['DM_UPLOAD_SIZE']/*'大小'*/, width: 70, dataIndex: 'size', renderer: function (v) {
					return Ext.util.Format.fileSize(v);
				}
			},
			{ text: LANGUAGE_PACKAGE['DM_UPLOAD_SECURITY']/*'密级'*/, width: 70, dataIndex: 'securityClassification',
				editor: {
					xtype : 'combo',
					displayField : 'itemValue',
				    valueField : 'itemKey',
				    minChars : 10,
				    editable : false,
				    readOnly : !USER.degrade,
					store : this.securityClassificationStore
				},
				renderer: function(value,metadata,record){
		            var index = this.securityClassificationStore.find('itemKey',value);
		            var record = this.securityClassificationStore.getAt(index);
		            return record.data.itemValue;
				}
			},
			{ text: LANGUAGE_PACKAGE['DM_UPLOAD_PERCENT']/*'进度'*/, width: 130, dataIndex: 'percent', renderer: function (v) {
					var stml =
						'<div>' +
							'<div style="border:1px solid #008000;height:10px;width:115px;margin:2px 0px 1px 0px;float:left;">' +
								'<div style="float:left;background:#FFCC66;width:' + v + '%;height:8px;"><div></div></div>' +
							'</div>' +
						//'<div style="text-align:center;float:right;width:40px;margin:3px 0px 1px 0px;height:10px;font-size:12px;">{3}%</div>'+			
					'</div>';
					return stml;
				}
			},
			{ text: LANGUAGE_PACKAGE['DM_UPLOAD_STATUS']/*'状态'*/, width: 80, dataIndex: 'status', renderer: function (v) {
					var status;
					if (v == -1) {
						status = LANGUAGE_PACKAGE['DM_UPLOAD_STATUS_WAIT'];//"等待上传";
					} else if (v == -2) {
						status = LANGUAGE_PACKAGE['DM_UPLOAD_STATUS_UPLOADING'];//"上传中...";
					} else if (v == -3) {
						status = "<div style='color:red;'>" 
								+ LANGUAGE_PACKAGE['DM_UPLOAD_STATUS_FAILURE']/*上传失败*/ 
								+ "</div>";
					} else if (v == -4) {
						status = LANGUAGE_PACKAGE['DM_UPLOAD_STATUS_SUCCESS'];//"上传成功";
					} else if (v == -5) {
						status = LANGUAGE_PACKAGE['DM_UPLOAD_STATUS_STOP'];//"停止上传";
					}
					return status;
				}
			},
			{
				xtype: 'actioncolumn',
				width: 50,
				align : 'center',
				items: [{
					icon: 'js/component/uploader/image/delete.png',		//这个根据实际情况修改，否则将不会显示表格内的删除图标
					tooltip: LANGUAGE_PACKAGE['DM_UPLOAD_DELETE'],//'移除',
					handler: function (grid, rowIndex, colIndex) {
						grid.store.remove(grid.store.getAt(rowIndex));
					}
				}]
			}
		];
		this.dockedItems = [{
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					xtype: 'button',
					itemId: 'addFileBtn',
					//iconCls: 'add',
					id: '_btn_for_swf_',
					text: this.addFileBtnText
				}, {
					xtype: 'button',
					itemId: 'uploadBtn',
					//iconCls: 'up',
					text: this.uploadBtnText,
					scope: this,
					handler: this.onUpload
				}, {
					xtype: 'button',
					itemId: 'cancelBtn',
					//iconCls: 'cancel',
					disabled: true,
					text: this.cancelBtnText,
					scope: this,
					handler: this.onCancelUpload
				}, {
					xtype: 'button',
					itemId: 'removeBtn',
					//iconCls: 'trash',
					text: this.removeBtnText,
					scope: this,
					handler: this.onRemoveAll
				}
			]
		}];

		this.callParent();
		this.down('button[itemId=addFileBtn]').on({
			afterrender: function (btn) {
				var config = this.getSWFConfig(btn);
				this.swfupload = new SWFUpload(config);
				Ext.get(this.swfupload.movieName).setStyle({
					position: 'absolute',
					top: 0,
					left: -2
				});
			},
			scope: this,
			buffer: 300
		});
	},
	getSWFConfig: function (btn) {
		var me = this;
		var placeHolderId = Ext.id();
		var em = btn.getEl().child('em');
		if (em == null) {
			em = Ext.get(btn.getId() + '-btnWrap');
		}
		em.setStyle({
			position: 'relative',
			display: 'block'
		});
		em.createChild({
			tag: 'div',
			id: placeHolderId
		});
		return {
			debug: me.debug,
			flash_url: me.flash_url,
			flash9_url: me.flash9_url,
			upload_url: me.upload_url,
			post_params: me.post_params || { savePath: 'upload\\' },
			file_size_limit: (me.file_size_limit * 1024),
			file_types: me.file_types,
			file_types_description: me.file_types_description,
			file_upload_limit: me.file_upload_limit,
			file_queue_limit: me.file_queue_limit,
			button_width: em.getWidth(),
			button_height: em.getHeight(),
			button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor: SWFUpload.CURSOR.HAND,
			button_placeholder_id: placeHolderId,
			custom_settings: {
				scope_handler: me
			},
			swfupload_preload_handler: me.swfupload_preload_handler,
			file_queue_error_handler: me.file_queue_error_handler,
			swfupload_load_failed_handler: me.swfupload_load_failed_handler,
			upload_start_handler: me.upload_start_handler,// 开始上传文件前触发的事件处理函数
			upload_progress_handler: me.upload_progress_handler,// 上传文件过程中的事件处理函数（处理进度条）
			upload_error_handler: me.upload_error_handler,// 文件上传失败后触发的事件处理函数
			upload_success_handler: me.upload_success_handler,// 文件上传成功后触发的事件处理函数
			upload_complete_handler: me.upload_complete_handler,// 文件上传完成后触发的事件处理函数
			file_queued_handler: me.file_queued_handler/*,
			file_dialog_complete_handler : me.file_dialog_complete_handler// 当文件选取对话框关闭后触发的事件处理*/
		};
	},
	swfupload_preload_handler: function () {
		if (!this.support.loading) {
			Ext.Msg.show({
				title: LANGUAGE_PACKAGE['DGS_COMM_TIPS'],//'提示',
				msg: LANGUAGE_PACKAGE['DM_UPLOAD_VERSION_LOW'],//'浏览器Flash Player版本太低,不能使用该上传功能！',
				width: 250,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
			return false;
		}
	},
	file_queue_error_handler: function (file, errorCode, message) {
		switch (errorCode) {
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED: msg(LANGUAGE_PACKAGE['DM_UPLOAD_QUEUE_LIMIT_EXCEEDED']/*'上传文件列表数量超限,不能选择！'*/);
				break;
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT: msg(LANGUAGE_PACKAGE['DM_UPLOAD_FILE_EXCEEDS_SIZE_LIMIT']/*'文件大小超过限制, 不能选择！'*/);
				break;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE: msg(LANGUAGE_PACKAGE['DM_UPLOAD_ZERO_BYTE_FILE']/*'该文件大小为0,不能选择！'*/);
				break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE: msg(LANGUAGE_PACKAGE['DM_UPLOAD_INVALID_FILETYPE']/*'该文件类型不允许上传！'*/);
				break;
		}
		function msg(info) {
			Ext.Msg.show({
				title: LANGUAGE_PACKAGE['DGS_COMM_TIPS'],//'提示',
				msg: info,
				width: 250,
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
		}
	},
	swfupload_load_failed_handler: function () {
		Ext.Msg.show({
			title: LANGUAGE_PACKAGE['DGS_COMM_TIPS'],//'提示',
			msg: LANGUAGE_PACKAGE['DM_UPLOAD_SWF_FAILURE'],//'SWFUpload加载失败！',
			width: 180,
			icon: Ext.Msg.ERROR,
			buttons: Ext.Msg.OK
		});
	},
	// 开始上传文件前触发的事件处理函数
	upload_start_handler: function (file) {
		var me = this.settings.custom_settings.scope_handler;
		me.down('#cancelBtn').setDisabled(false);
		var rec = me.store.getById(file.id);
		if(rec != null){
			this.setFilePostName(encodeURIComponent(rec.get('fileName')+'_' + rec.get('securityClassification')));
		}
	},
	// 上传文件过程中的事件处理函数（处理进度条）
	upload_progress_handler: function (file, bytesLoaded, bytesTotal) {
		var me = this.settings.custom_settings.scope_handler;
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		percent = percent == 100 ? 99 : percent;
		var rec = me.store.getById(file.id);
		if(rec != null){
			rec.set('percent', percent);
			rec.set('status', file.filestatus);
			rec.commit();
		}
	},
	// 文件上传失败后触发的事件处理函数
	upload_error_handler: function (file, errorCode, message) {
		var me = this.settings.custom_settings.scope_handler;
		var rec = me.store.getById(file.id);
		if(rec != null){
			rec.set('percent', 0);
			rec.set('status', file.filestatus);
			rec.commit();
		}
		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload();
		} else {
			me.showBtn(me, true);
		}
	},
	// 文件上传成功后触发的事件处理函数
	upload_success_handler: function (file, serverData, responseReceived) {
		var me = this.settings.custom_settings.scope_handler;
		var rec = me.store.getById(file.id);
		if(rec != null){
			if (Ext.JSON.decode(serverData).success) {
				rec.set('percent', 100);
				rec.set('status', file.filestatus);
			} else {
				rec.set('percent', 0);
				rec.set('status', SWFUpload.FILE_STATUS.ERROR);
			}
			rec.commit();
		}
		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload();
		} else {
			me.showBtn(me, true);
		}
	},
	// 文件上传完成后触发的事件处理函数
	upload_complete_handler: function (file) {

	},
	file_queued_handler: function (file) {
		var me = this.settings.custom_settings.scope_handler;
		me.store.add({
			id: file.id,
			name: file.name,
			fileName: file.name,
			size: file.size,
			type: file.type,
			status: file.filestatus,
			securityClassification : USER.securityClassification==null || USER.securityClassification == '' ? 0 : USER.securityClassification,
			percent: 0
		});
	},
	onUpload: function () {
		if (this.swfupload && this.store.getCount() > 0) {
			if (this.swfupload.getStats().files_queued > 0) {
				this.showBtn(this, false);
				this.swfupload.uploadStopped = false;
				this.swfupload.startUpload();
			}
		}
	},
	showBtn: function (me, bl) {
		me.down('#addFileBtn').setDisabled(!bl);
		this.swfupload.setButtonDisabled(!bl);//同步上传控件的禁用状态
		me.down('#uploadBtn').setDisabled(!bl);
		me.down('#removeBtn').setDisabled(!bl);
		me.down('#cancelBtn').setDisabled(bl);
		if (bl) {
			me.down('actioncolumn').show();
		} else {
			me.down('actioncolumn').hide();
		}
	},
	beforeDestroy: function() {
        var me = this;
       	me.store.removeAll();
        Ext.destroy(
            me.placeholder,
            me.ghostPanel
        );
        me.callParent();
    },
	onRemoveAll: function () {
		var ds = this.store;
		for (var i = 0; i < ds.getCount() ; i++) {
			var record = ds.getAt(i);
			var file_id = record.get('id');
			this.swfupload.cancelUpload(file_id, false);
		}
		ds.removeAll();
		this.swfupload.uploadStopped = false;
	},
	onCancelUpload: function () {
		if (this.swfupload) {
			this.swfupload.uploadStopped = true;
			this.swfupload.stopUpload();
			this.showBtn(this, true);
		}
	}
});