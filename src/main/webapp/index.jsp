<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.File,java.util.List,java.util.ArrayList,com.zd.admin.core.common.Utils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>

<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>敏捷数据安全卫士系统</title>
<link rel="stylesheet" type="text/css" href="${contextPath}/js/extjs/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/main.css" />	
<script type="text/javascript" src="${contextPath}/js/extjs/ext-all.js"></script>
<script type="text/javascript">
	Ext.ns('Com.panel');
	Ext.ns('Com.util');
</script>
<script type="text/javascript">   
	Ext.onReady(function() {
		LANGUAGE_PACKAGE = Com.util.getSysLanguage();
		VERSION = '';
		LOGGING = new Ext.Viewport({
			layout : 'fit',
			items : [new Com.panel.Login("")]
		});
		Ext.EventManager.onWindowResize(function(width, height) {
			LOGGING.doLayout();
		});
	}); 
	
</script>
<script type="text/javascript" src="${contextPath}/js/login/Com.panel.Login.js"></script>
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
%>
</head>
<body>
</body>
</html>

