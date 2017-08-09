/**
 * 
 */
package com.zd.admin.core.listener;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author machengrong
 * @createtime 2017��8��7��
 */
public class AuthInterceptor implements HandlerInterceptor{
	
	 private List<String> excludeUrls;// ����Ҫ���ص���Դ
	    public List<String> getExcludeUrls() {
	        return excludeUrls;
	    }
	    public void setExcludeUrls(List<String> excludeUrls) {
	        this.excludeUrls = excludeUrls;
	    }

	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	public boolean preHandle(HttpServletRequest request, HttpServletResponse arg1, Object arg2) throws Exception {
		   HttpSession session = request.getSession();
	        String requestURI = request.getRequestURI();
	        String contextPath = request.getContextPath();
	        String url = requestURI.substring(contextPath.length() + 1);

	        // ���Ҫ���ʵ���Դ�ǲ���Ҫ��֤��
	        if (excludeUrls.contains(url)) {
	            return true;
	        }
	        
	        return false;

	    }
	

}
