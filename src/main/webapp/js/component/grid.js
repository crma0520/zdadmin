/**
 * 对grid的统一处理
 */
//每一个列都会出现鼠标悬浮上去显示内容
/** 
 * @class Ext.grid.GridView 
 * @override Ext.grid.GridView 
 * GridPanel单元格不能选中复制问题 
 * 单元格数据显示不完整 ,增加title 浮动提示信息 
 */
Ext.override(Ext.grid.Panel, {
    afterRender : Ext.Function.createSequence(Ext.grid.Panel.prototype.afterRender, function() {
        var view = this.getView();
        this.tip = new Ext.ToolTip({
            target: view.el,
            delegate : '.x-grid-cell-inner',
            trackMouse: true, 
            renderTo: Ext.getBody(),  
            listeners: {  
                beforeshow: function updateTipBody(tip) {
                    //取cell的值
                    //fireFox  tip.triggerElement.textContent
                    //IE  tip.triggerElement.innerText 
                    var tipText = (tip.triggerElement.innerText || tip.triggerElement.textContent);
                    if (Ext.isEmpty(tipText) || Ext.isEmpty(tipText.trim()) ) {
                        return false;
                    }
                    tip.update('<div style="overflow:auto;word-break: break-all; word-wrap:break-word;">' + Ext.util.Format.htmlEncode(tipText) + '</div>');
                }
            }
        });
    })
});
/**
 * tree值显示，特殊字符，HTML编码，将& <  >  “替换为&amp;&lt;&gt;&quot;
 */
Ext.override(Ext.tree.Column, {
	renderer : function(value) {
    	return Ext.util.Format.htmlEncode(value);
	}
});

/**
 * grid自定义列，重写排序功能
 */
/*Ext.override(Ext.grid.column.Column, {
	config : {
        ascSorter  : null,
        descSorter : null,
        menuDisabled : true//禁用header的下拉
    },
    destroy : function() {
        delete this.ascSorter;
        delete this.descSorter;
        this.callParent();
    },
    //@param {String} state The direction of the sort, `ASC` or `DESC`
    sort : function(state) {
        var me = this,
            grid = me.up('tablepanel'),
            store = grid.store,
            sorter = this[state === 'ASC' ? 'getAscSorter' : 'getDescSorter']();
        Ext.suspendLayouts();
        this.sorting = true;
        //store.sort(me.getSortParam(), state, grid.multiColumnSort ? 'multi' : 'replace');
        store.sort(sorter, state, grid.multiColumnSort ? 'multi' : 'replace');
        me.setSortState(sorter);//增加排序样式
        delete this.sorting;
        Ext.resumeLayouts(true);
    },
    getAscSorter : function() {
        var sorter = this.ascSorter;
        if (!sorter) {
            sorter = new Ext.util.Sorter({
                sorterFn  : this.createSorter('ASC'),
                direction : 'ASC'
            });
            this.setAscSorter(sorter);
        }
        return sorter;
    },
    getDescSorter : function() {
        var sorter = this.ascSorter;
        if (!sorter) {
            sorter = new Ext.util.Sorter({
                sorterFn  : this.createSorter('DESC'),
                direction : 'DESC'
            });
            this.setAscSorter(sorter);
        }
        return sorter;
    },
    createSorter : function(state) {
        var dataIndex = this.dataIndex;
        return function(rec1, rec2) {
            var v1 = rec1.get(dataIndex),
                v2 = rec2.get(dataIndex),
                ret;
			if(typeof(v1)=="string"){//若为字符串
				ret = v1.localeCompare(v2);//则localeCompare比较汉字字符串，Firefox与IE均支持
			}else{
				ret = v1>v2 ? 1 : (v1<v2 ? -1 : 0);
			}
            if (state === 'DESC') {
                ret = ret * -1;
            }
            return ret;
        };
    }
});*/

