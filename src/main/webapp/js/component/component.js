/**
 * 对所有控件的统一处理
 */
/**
 * 必填项标签加上*号
 */
Ext.override(Ext.Component, {
	initComponent : function() {
		if (this.allowBlank === false && this.fieldLabel) {
			this.fieldLabel = '<font color=red>*</font>' + this.fieldLabel;
		}
		if(!this.validator){
			this.validator = function(value){
				if(this.allowBlank === false){//必填项，不可以输入空字符串
					if(value.length > 0 && value.trim() == ''){
						return LANGUAGE_PACKAGE['DGS_COMM_NOT_NULL'];
					}
				}
				/*if(value.trim().length > 0){
					var RegExp = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[a-zA-Z0-9]|[-`=\\{}\[\]:\"<>?|+_~!@#$%^&*()./,'; ])+$/;
					if(!RegExp.test(value)){
						return LANGUAGE_PACKAGE['DGS_COMM_NO_SPECIAL_CHARACTER'];
					}
				}*/
				return true;
			};
		}
	}
});

/**
 * 提示信息显示
 */
Ext.tip.QuickTipManager.init();

/**
 * 所有PagingToolbar去掉提示信息（避免下拉框分页点击消失问题）
 */
Ext.override(Ext.PagingToolbar, {
	firstText : '',
	prevText : '',
	nextText : '',
	lastText : '',
	refreshText : ''
});
