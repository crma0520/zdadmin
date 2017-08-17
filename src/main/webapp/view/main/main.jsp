<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.File,java.util.List,java.util.ArrayList,com.zd.admin.core.common.Utils"%>
<%@ page import="net.sf.json.JSONObject"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>

<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>ZD后台管理系统</title>
<link rel="stylesheet" type="text/css" href="${contextPath}/js/extjs/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/main.css" />
	
<script type="text/javascript" src="${contextPath}/js/extjs/ext-all.js"></script>
<script type="text/javascript" src="${contextPath}/js/extjs/packages/ext-theme-crisp/build/ext-theme-crisp.js"></script>
<script type="text/javascript" src="${contextPath}/js/extjs/packages/ext-locale/build/ext-locale-zh_CN.js"></script>
<script type="text/javascript" src="${contextPath}/js/extjs/ux/ProgressBarPager.js"></script>
<script type="text/javascript" src="${contextPath}/js/extjs/ux/TreePicker.js"></script>
<script type="text/javascript" src="${contextPath}/js/extjs/ux/TabCloseMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/extjs/ux/MultiSelect.js"></script>
<script type="text/javascript">
	Ext.ns('Com.util');
	Ext.ns('Com.panel');
	Ext.ns('Com.window');
</script>
<script type="text/javascript">
	var userStr = '<%=JSONObject.fromObject(request.getSession().getAttribute("SESSION_USER")).toString()%>';
	var USER = userStr != 'null' ? eval('(' + userStr + ')') : {};
	Ext.onReady(function() {
		//确定系统使用的语言种类
		LANGUAGE_PACKAGE = Com.util.getSysLanguage();
		CONTAINER = new Ext.Viewport({
			layout : 'fit',
			items : [new Com.panel.Main()]
		});
		Ext.EventManager.onWindowResize(function(width, height) {
			CONTAINER.doLayout();
		});
	}); 
	
</script>
<%
	String path = request.getRealPath("/");
	File folder = new File(path + "/js/common");
	List<String> fileNames = new ArrayList<String>();
	Utils.listRelativePathOfAllFiles(folder,path,".js",fileNames);
	for(String fileName : fileNames) {
%>
	<script type="text/javascript" src="${contextPath}/<%=fileName%>"></script>
<%		
	}
	folder = new File(path + "/js/login");
	fileNames = new ArrayList<String>();
	Utils.listRelativePathOfAllFiles(folder,path,".js",fileNames);
	for(String fileName : fileNames) {
%>
	<script type="text/javascript" src="${contextPath}/<%=fileName%>"></script>
<%		
	}
	folder = new File(path + "/js/component");
	fileNames = new ArrayList<String>();
	Utils.listRelativePathOfAllFiles(folder,path,".js",fileNames);
	for(String fileName : fileNames) {
%>
	<script type="text/javascript" src="${contextPath}/<%=fileName%>"></script>
<%		
	}
	folder = new File(path + "/js/base");
	fileNames = new ArrayList<String>();
	Utils.listRelativePathOfAllFiles(folder,path,".js",fileNames);
	for(String fileName : fileNames) {
%>
	<script type="text/javascript" src="${contextPath}/<%=fileName%>"></script>
<%		
	}
%>
</head>
<body>
</body>
</html>
