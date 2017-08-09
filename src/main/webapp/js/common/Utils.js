/**
 * 公用方法
 */
/**
 * 根据语种获取语言包
 * @param {} key
 * @return {}
 */
Com.util.getSysLanguage = function() {
	var object = '';
	if(DGS_CONSTANTS_LANGUAGE == 1){
		//中文
		object = LANGUAGE_CN;
	}else if(DGS_CONSTANTS_LANGUAGE == 2){
		//英文
		object = LANGUAGE_US;
	}
	return object;
};
/**
 * 验证密码复杂度，检查是否合法，至少包含数字、大小字母、小写字母中的两个；必须以字母开头；不少于6位；不能包含特殊字符及空格
 * @param {} pass
 * @return {Boolean}
 */
Com.util.checkPass = function(pass){
	//必须以字母开头；不少于6位；不能包含特殊字符及空格
	var RegExp1 = /^[a-zA-Z]{1}([a-zA-Z0-9]|[-`=\\{}:\"<>?|+_~!@#$%^&*()./,';]){5,}$/;
	//大写字母、小写字母至少各一个
	var RegExp2 = /^(?=.*[A-Z].*)(?=.*[a-z].*).{5,}$/;
	//数字、字母至少各一个
	var RegExp3 = /^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{5,}$/;
  	if(RegExp1.test(pass) && (RegExp2.test(pass) || RegExp3.test(pass))){
		return true;
  	}
    return false;
}

/**
 * 操作成功提示信息
 * @param {}
 *            args
 */
Com.util.commAlert = function(args) {

	var config = {
		title : LANGUAGE_PACKAGE['DGS_COMM_TIPS'],
		message : LANGUAGE_PACKAGE['DGS_COMM_DEFAULT_SUCCESS_MSG'],
		icon : Ext.Msg.INFO,
		closable : false
	};
	Ext.apply(config, args);
	var alert = Ext.Msg.show(config);

	if(!config.closable){
		setTimeout(function() {// 此处设置自动隐藏保存提示窗体
			alert.hide();
		}, 2000);
	}
};

/**
 * 分页工具
 * @class Dgs.util.PagingToolbar
 * @extends Ext.PagingToolbar
 */
Com.util.PagingToolbar = Ext.extend(Ext.PagingToolbar, {
	constructor : function( store, combo, displayInfo) {
		Com.util.PagingToolbar.superclass.constructor.call(this, {
			store : store,
			autoWidth : true,
			autoShow : true,
			items : ['-', '&nbsp;', combo],
			displayInfo : displayInfo == null ? true : displayInfo,
			displayMsg : LANGUAGE_PACKAGE['DGS_COMM_DISPLAY_MSG'],//'显示第 {0} 条到 {1} 条记录,一共 {2} 条',
			emptyMsg : LANGUAGE_PACKAGE['DGS_COMM_EMPTY_MSG'],//'没有符合条件的记录',
			plugins : new Ext.ux.ProgressBarPager()
		})
	}
});
/**
 * 分页选择
 * @class Dgs.util.pagesize_combo
 * @extends Ext.form.ComboBox
 */
Com.util.pagesize_combo = Ext.extend(Ext.form.ComboBox, {
	constructor : function() {
		Com.util.pagesize_combo.superclass.constructor.call(this, {
			name : 'pagesize',
			minChars : 10,
			store : new Ext.data.ArrayStore({
				fields : ['value', 'text'],
				data : [[10, LANGUAGE_PACKAGE['DGS_COMM_PAGE10']],
						[20, LANGUAGE_PACKAGE['DGS_COMM_PAGE20']], 
						[50, LANGUAGE_PACKAGE['DGS_COMM_PAGE50']],
						[100, LANGUAGE_PACKAGE['DGS_COMM_PAGE100']]]
			}),
			valueField : 'value',
			displayField : 'text',
			value : 20,
			editable : false,
			width : 85
		});
	}
});

/**
 * 下拉框显示实际值
 * @param {} field
 * @param {} key
 * @param {} value
 */
Com.util.setComboValue = function(field,key,item){
	var store = field.store;
	store.add(item);
	field.setValue(key);
}


//创建32位guid，不包含-
Com.util.createGuid = function(){
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}