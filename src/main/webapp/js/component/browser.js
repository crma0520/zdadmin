/**
 * 处理浏览器兼容问题
 */
/**
 * 处理ie8数组没有indexOf方法
 */
if (!Array.prototype.indexOf){
  	Array.prototype.indexOf = function(elt /*, from*/)
  	{
    	var len = this.length >>> 0;
	    var from = Number(arguments[1]) || 0;
	    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
	    if (from < 0)
	      	from += len;

	    for (; from < len; from++)
	    {
	      	if (from in this && this[from] === elt)
	        	return from;
	    }
    	return -1;
  	};
}
/**
 * 处理ie8数组没有forEach方法
 */
if (!Array.prototype.forEach) {  
    Array.prototype.forEach = function(fun /*, thisp*/) {  
        var len = this.length;  
        if (typeof fun != "function")  
            throw new TypeError();  
  
        var thisp = arguments[1];  
        for (var i = 0; i < len; i++) {  
            if (i in this)  
                fun.call(thisp, this[i], i, this);  
        }  
    };  
}  

/**
 * 处理ie8 String没有trim方法
 */
if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

/**
 * 字符串以**结尾
 * @param {} endStr
 * @return {}
 */
String.prototype.endWith=function(endStr){
  	var d = this.length-endStr.length;
  	return (d>=0&&this.lastIndexOf(endStr)==d);
}
/**
 * 字符串以**开始
 * @param {} endStr
 * @return {}
 */
String.prototype.startWith = function(compareStr){
	return this.indexOf(compareStr) == 0;
}